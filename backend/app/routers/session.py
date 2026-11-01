from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.connection import get_db
from app.db.models import Session as DBSession, Pathway, Module, ResumeSkill, JDSkill
import json

router = APIRouter()

@router.get("/session/{session_id}")
async def get_session(session_id: str, db: Session = Depends(get_db)):
    session = db.query(DBSession).filter(DBSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    resume_skills = db.query(ResumeSkill).filter(ResumeSkill.session_id == session.id).all()
    jd_skills = db.query(JDSkill).filter(JDSkill.session_id == session.id).all()

    skill_gaps = []
    reasoning_trace = ""
    if session.analysis_result:
        try:
            analysis_data = json.loads(session.analysis_result)
            skill_gaps = analysis_data.get("skill_gaps", [])
            reasoning_trace = analysis_data.get("reasoning_trace", "")
        except Exception:
            pass

    pathway_data = None
    pathway = db.query(Pathway).filter(Pathway.session_id == session.id).first()
    if pathway:
        modules = db.query(Module).filter(Module.pathway_id == pathway.id).order_by(Module.order_index).all()
        id_to_order = {mod.id: mod.order_index for mod in modules}

        modules_list = []
        for mod in modules:
            prereq_order = id_to_order.get(mod.prerequisite_module_id) if mod.prerequisite_module_id else None
            modules_list.append({
                "order": mod.order_index,
                "title": mod.title,
                "skill": mod.skill_addressed,
                "type": mod.module_type,
                "duration_hours": mod.duration_hours,
                "difficulty": mod.difficulty,
                "prerequisite": prereq_order,
                "rationale": mod.rationale,
                "description": mod.description,
                "resource_url": mod.resource_url,
            })

        pathway_data = {
            "session_id": str(session.id),
            "pathway_id": pathway.id,
            "total_modules": pathway.total_modules or len(modules_list),
            "estimated_hours": pathway.estimated_hours or 0.0,
            "modules": modules_list,
            "reasoning_trace": reasoning_trace or "Personalized learning pathway",
        }

    return {
        "session_id": str(session.id),
        "job_title": session.job_title or "Target Role",
        "created_at": session.created_at.isoformat() if session.created_at else None,
        "resume_skills": [
            {"skill": s.skill_name, "level": s.proficiency_level, "years": s.years_experience}
            for s in resume_skills
        ],
        "required_skills": [
            {"skill": s.skill_name, "required_level": s.required_level, "mandatory": s.is_mandatory}
            for s in jd_skills
        ],
        "skill_gaps": skill_gaps,
        "reasoning_trace": reasoning_trace,
        "pathway": pathway_data,
    }

@router.delete("/session/{session_id}")
async def delete_session(session_id: str, db: Session = Depends(get_db)):
    session = db.query(DBSession).filter(DBSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Cascade delete pathway and modules cleanly
    pathway = db.query(Pathway).filter(Pathway.session_id == session.id).first()
    if pathway:
        db.query(Module).filter(Module.pathway_id == pathway.id).update({Module.prerequisite_module_id: None})
        db.query(Module).filter(Module.pathway_id == pathway.id).delete()
        db.delete(pathway)

    db.query(ResumeSkill).filter(ResumeSkill.session_id == session.id).delete()
    db.query(JDSkill).filter(JDSkill.session_id == session.id).delete()
    db.delete(session)
    db.commit()

    return {"message": "Session deleted successfully"}
