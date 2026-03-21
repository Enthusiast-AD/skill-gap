from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.connection import get_db
from app.db.models import Session as DBSession
from app.services import parser_service
from app.models.schemas import UploadResponse
import uuid

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_files(
    resume: UploadFile = File(...),
    job_description: UploadFile = File(...),
    job_title: str = Form(...),
    db: Session = Depends(get_db)
):
    # Read file content
    resume_content = await resume.read()
    jd_content = await job_description.read()

    # Parse text
    resume_text = parser_service.extract_text(resume_content, resume.filename)
    jd_text = parser_service.extract_text(jd_content, job_description.filename)

    if not resume_text:
        raise HTTPException(status_code=400, detail="Could not extract text from Resume.")
    if not jd_text:
        raise HTTPException(status_code=400, detail="Could not extract text from Job Description.")

    # Create session
    new_session = DBSession(
        resume_text=resume_text,
        jd_text=jd_text,
        job_title=job_title
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    return UploadResponse(
        session_id=new_session.id,
        resume_text_preview=resume_text[:200],
        jd_text_preview=jd_text[:200],
        status="parsed"
    )
