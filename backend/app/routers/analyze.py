from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.connection import get_db
from app.db.models import Session as DBSession, ResumeSkill, JDSkill
from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.services import gemini_service
import json

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_skills(request: AnalyzeRequest, db: Session = Depends(get_db)):
    session = db.query(DBSession).filter(DBSession.id == request.session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # 1. Extract Skills
    # Check if we already have skills to avoid re-running expensive AI calls (caching)
    # For now, we'll assume we re-run or check if DB is empty
    
    existing_resume_skills = db.query(ResumeSkill).filter(ResumeSkill.session_id == session.id).all()
    if not existing_resume_skills:
        extracted_resume = await gemini_service.extract_resume_skills(session.resume_text)
        for skill in extracted_resume:
            db_skill = ResumeSkill(
                session_id=session.id,
                skill_name=skill.get("skill_name", "unknown"),
                proficiency_level=skill.get("proficiency_level", "beginner"),
                years_experience=float(skill.get("years_experience", 0))
            )
            db.add(db_skill)
        db.commit() # Commit intermediate valid state
        existing_resume_skills = db.query(ResumeSkill).filter(ResumeSkill.session_id == session.id).all()

    existing_jd_skills = db.query(JDSkill).filter(JDSkill.session_id == session.id).all()
    if not existing_jd_skills:
        extracted_jd = await gemini_service.extract_jd_skills(session.jd_text)
        for skill in extracted_jd:
            db_skill = JDSkill(
                session_id=session.id,
                skill_name=skill.get("skill_name", "unknown"),
                required_level=skill.get("required_level", "beginner"),
                is_mandatory=bool(skill.get("is_mandatory", True))
            )
            db.add(db_skill)
        db.commit()
        existing_jd_skills = db.query(JDSkill).filter(JDSkill.session_id == session.id).all()

    # Format for Analysis
    resume_skills_list = [
        {"skill_name": s.skill_name, "proficiency_level": s.proficiency_level, "years_experience": s.years_experience}
        for s in existing_resume_skills
    ]
    jd_skills_list = [
        {"skill_name": s.skill_name, "required_level": s.required_level, "is_mandatory": s.is_mandatory}
        for s in existing_jd_skills
    ]

    # 2. Analyze Gaps
    # We'll use the gemini_service.analyze_gaps
    
    analysis_result = await gemini_service.analyze_gaps(resume_skills_list, jd_skills_list, session.job_title)

    return AnalyzeResponse(
        session_id=session.id,
        resume_skills=[
            {"skill": s.skill_name, "level": s.proficiency_level, "years": s.years_experience} 
            for s in existing_resume_skills
        ],
        required_skills=[
            {"skill": s.skill_name, "required_level": s.required_level, "mandatory": s.is_mandatory} 
            for s in existing_jd_skills
        ],
        skill_gaps=analysis_result.get("skill_gaps", []),
        reasoning_trace=analysis_result.get("reasoning_trace", "")
    )
