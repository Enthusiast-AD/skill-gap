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

    # Check if we already generated a valid pathway for this session
    existing_pathway = db.query(Pathway).filter(Pathway.session_id == session.id).first()
    if existing_pathway:
        existing_modules = db.query(Module).filter(Module.pathway_id == existing_pathway.id).order_by(Module.order_index).all()
        if existing_modules:
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
                total_modules=existing_pathway.total_modules or len(modules_data),
                estimated_hours=existing_pathway.estimated_hours or 0.0,
                modules=modules_data,
                reasoning_trace="Loaded from previous generation"
            )
        else:
            # Clean up broken orphan pathway record
            try:
                db.delete(existing_pathway)
                db.commit()
            except Exception:
                db.rollback()

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

    # 2. Re-Analyze Gaps if not already cached
    analysis_result = None
    if session.analysis_result:
        try:
            analysis_result = json.loads(session.analysis_result)
        except Exception:
            analysis_result = None

    if not analysis_result:
        analysis_result = await gemini_service.analyze_gaps(resume_skills_list, jd_skills_list, session.job_title or "Target Role")
        session.analysis_result = json.dumps(analysis_result)
        db.add(session)
        db.commit()
        
    skill_gaps = analysis_result.get("skill_gaps", [])

    # 3. Generate Pathway
    pathway_result = await gemini_service.generate_pathway(session.job_title or "Target Role", skill_gaps)
    
    modules_data = pathway_result.get("modules", [])
    total_hours = float(pathway_result.get("total_hours", 0.0))
    reasoning_trace = pathway_result.get("reasoning_trace", "")

    # 4. Save to DB atomically
    try:
        new_pathway = Pathway(
            session_id=session.id,
            total_modules=len(modules_data),
            estimated_hours=total_hours
        )
        db.add(new_pathway)
        db.flush()

        saved_modules = []
        for mod in modules_data:
            db_module = Module(
                pathway_id=new_pathway.id,
                order_index=int(mod.get("order", 1)),
                title=str(mod.get("title", "Untitled Module")),
                description=str(mod.get("description", "")) if mod.get("description") else None,
                skill_addressed=str(mod.get("skill", "")),
                duration_hours=float(mod.get("duration_hours", 1.0)),
                difficulty=str(mod.get("difficulty", "intermediate")),
                module_type=str(mod.get("type", "video")),
                resource_url=str(mod.get("resource_url", "")) if mod.get("resource_url") else None,
                rationale=str(mod.get("rationale", "")) if mod.get("rationale") else None,
            )
            db.add(db_module)
            saved_modules.append((mod, db_module))

        db.flush()

        # Connect Prerequisites
        order_to_id_map = {db_m.order_index: db_m.id for _, db_m in saved_modules}
        for mod_dict, db_module in saved_modules:
            prereq_order = mod_dict.get("prerequisite")
            if prereq_order and prereq_order in order_to_id_map:
                db_module.prerequisite_module_id = order_to_id_map[prereq_order]

        db.commit()
        db.refresh(new_pathway)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database transaction error: {str(e)}")

    # 5. Build Response
    response_modules = []
    for mod_dict, m in saved_modules:
        response_modules.append(ModuleCreate(
            order=m.order_index,
            title=m.title,
            skill=m.skill_addressed,
            type=m.module_type,
            duration_hours=m.duration_hours,
            difficulty=m.difficulty,
            prerequisite=mod_dict.get("prerequisite"),
            rationale=m.rationale or "",
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
