from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.connection import get_db
from app.db.models import Session as DBSession, Pathway, Module, ResumeSkill, JDSkill
from app.models.schemas import PathwayRequest, PathwayResponse, ModuleCreate
from app.services import gemini_service
import json

router = APIRouter()

@router.post("/pathway", response_model=PathwayResponse)
async def generate_learning_pathway(request: PathwayRequest, db: Session = Depends(get_db)):
    session = db.query(DBSession).filter(DBSession.id == request.session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Check if we already generated a pathway for this session
    existing_pathway = db.query(Pathway).filter(Pathway.session_id == session.id).first()
    if existing_pathway:
        existing_modules = db.query(Module).filter(Module.pathway_id == existing_pathway.id).order_by(Module.order_index).all()
        # Reconstruct pathway output
        
        # Build id -> order_index map to restore 'prerequisite'
        id_to_order = {mod.id: mod.order_index for mod in existing_modules}
        
        modules_data = []
        for mod in existing_modules:
            prereq_order = id_to_order.get(mod.prerequisite_module_id) if mod.prerequisite_module_id else None
            
            modules_data.append({
                "order": mod.order_index,
                "title": mod.title,
                "skill": mod.skill_addressed,
                "type": mod.module_type,
                "duration_hours": mod.duration_hours,
                "difficulty": mod.difficulty,
                "prerequisite": prereq_order,
                "rationale": mod.rationale,
                "description": mod.description,
                "resource_url": mod.resource_url
            })
        return PathwayResponse(
            session_id=str(session.id),
            pathway_id=existing_pathway.id,
            total_modules=existing_pathway.total_modules,
            estimated_hours=existing_pathway.estimated_hours,
            modules=modules_data,
            reasoning_trace="Loaded from previous generation"
        )

    # 1. Retrieve Skills
    resume_skills = db.query(ResumeSkill).filter(ResumeSkill.session_id == session.id).all()
    jd_skills = db.query(JDSkill).filter(JDSkill.session_id == session.id).all()

    if not resume_skills or not jd_skills:
        raise HTTPException(status_code=400, detail="Skills not found. Please run analysis first.")

    resume_skills_list = [
        {"skill_name": s.skill_name, "proficiency_level": s.proficiency_level, "years_experience": s.years_experience}
        for s in resume_skills
    ]
    jd_skills_list = [
        {"skill_name": s.skill_name, "required_level": s.required_level, "is_mandatory": s.is_mandatory}
        for s in jd_skills
    ]

    # 2. Re-Analyze Gaps (since we don't store them persistently yet)
    # Actually, we now store them in session.analysis_result
    
    if session.analysis_result:
        analysis_result = json.loads(session.analysis_result)
    else:
        # Fallback just in case
        analysis_result = await gemini_service.analyze_gaps(resume_skills_list, jd_skills_list, session.job_title)
        session.analysis_result = json.dumps(analysis_result)
        db.add(session)
        db.commit()
        
    skill_gaps = analysis_result.get("skill_gaps", [])

    if not skill_gaps:
        # Fallback if no gaps or error
        # Assuming no gaps means nothing to learn?
        pass

    # 3. Generate Pathway
    pathway_result = await gemini_service.generate_pathway(session.job_title, skill_gaps)
    
    modules_data = pathway_result.get("modules", [])
    total_hours = pathway_result.get("total_hours", 0.0)
    reasoning_trace = pathway_result.get("reasoning_trace", "")

    # 4. Save to DB
    new_pathway = Pathway(
        session_id=session.id,
        total_modules=len(modules_data),
        estimated_hours=total_hours
    )
    db.add(new_pathway)
    db.commit()
    db.refresh(new_pathway)

    saved_modules = []
    # Note: 'prerequisite' comes as an order index from Gemini, but we need module_id for DB foreign key
    # We will save prerequisite_module_id as the order index temporarily or resolve it?
    # Actually DB schema says 'prerequisite_module_id INT -- self-referencing'.
    # If we insert in order, we can map order_index to module_id.
    
    order_to_id_map = {}

    for mod in modules_data:
        # Pydantic ModuleCreate schema: order, title, skill, type, duration_hours, difficulty, prerequisite, rationale, description
        # attributes from gemini: order, title, skill, type, duration_hours, difficulty, prerequisite, rationale
        
        # We need to map 'type' from Gemini to 'module_type' in DB if different.
        # DB: module_type
        # Gemini: type
        
        db_module = Module(
            pathway_id=new_pathway.id,
            order_index=mod.get("order"),
            title=mod.get("title"),
            description=mod.get("description"),
            skill_addressed=mod.get("skill"),
            duration_hours=mod.get("duration_hours"),
            difficulty=mod.get("difficulty"),
            module_type=mod.get("type"),
            resource_url=mod.get("resource_url"),
            rationale=mod.get("rationale"),
            # We'll set prerequisite_module_id later or now if we can resolve it
        )
        db.add(db_module)
        db.commit()
        db.refresh(db_module)
        order_to_id_map[mod.get("order")] = db_module.id
        saved_modules.append(db_module)

    # 5. Connect Prerequisites
    for mod, db_module in zip(modules_data, saved_modules):
        prereq_order = mod.get("prerequisite")
        if prereq_order and prereq_order in order_to_id_map:
             db_module.prerequisite_module_id = order_to_id_map[prereq_order]
             db.add(db_module)
    db.commit()

    # 6. Build Response
    response_modules = []
    for m in saved_modules:
        # Resolve prerequisite back to order index for frontend if needed, or keep as is.
        # The Schema expects 'prerequisite' as int. Is it order or ID?
        # Schema ModuleCreate: prerequisite: Optional[int]
        # In PRD response example: "prerequisite": 1 (which refers to order 1)
        # So we should return the order index of the prerequisite.
        
        prereq_order = None
        if m.prerequisite_module_id:
            # Find the order of the module with this ID
            # In our map, we have order -> id. We can reverse look up or check 'modules_data' again.
            # But we already have the original 'mod' data in 'modules_data'.
            # However, for the response object specifically:
            pass 
        
        # Actually we can just use the data we got from Gemini which has 'prerequisite' as order index.
        # But we should return what matches the DB.
        # Let's trust Gemini's order index from `modules_data` which corresponds to `saved_modules` by index.
        
        original_data = next((item for item in modules_data if item["order"] == m.order_index), None)
        
        response_modules.append(ModuleCreate(
            order=m.order_index,
            title=m.title,
            skill=m.skill_addressed,
            type=m.module_type,
            duration_hours=m.duration_hours,
            difficulty=m.difficulty,
            prerequisite=original_data.get("prerequisite") if original_data else None,
            rationale=m.rationale,
            description=m.description,
            resource_url=m.resource_url
        ))

    return PathwayResponse(
        session_id=str(session.id),
        pathway_id=new_pathway.id,
        total_modules=new_pathway.total_modules,
        estimated_hours=new_pathway.estimated_hours,
        modules=response_modules,
        reasoning_trace=reasoning_trace
    )
