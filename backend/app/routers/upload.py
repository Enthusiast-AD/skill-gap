from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.db.connection import get_db
from app.db.models import Session as DBSession
from app.services import parser_service
from app.models.schemas import UploadResponse
import uuid

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_files(
    resume: UploadFile = File(...),
    job_title: str = Form(...),
    job_description: Optional[UploadFile] = File(None),
    jd_text: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    # Read file content
    resume_content = await resume.read()

    # Parse text
    resume_parsed_text = parser_service.extract_text(resume_content, resume.filename)

    if not resume_parsed_text:
        raise HTTPException(status_code=400, detail="Could not extract text from Resume.")

    jd_parsed_text = ""
    if job_description and job_description.filename:
        jd_content = await job_description.read()
        jd_parsed_text = parser_service.extract_text(jd_content, job_description.filename)
    elif jd_text:
        jd_parsed_text = jd_text

    if not jd_parsed_text:
        raise HTTPException(status_code=400, detail="Could not extract text from Job Description. Please provide a file or text.")

    # Create session
    new_session = DBSession(
        resume_text=resume_parsed_text,
        jd_text=jd_parsed_text,
        job_title=job_title
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    return UploadResponse(
        session_id=new_session.id,
        resume_text_preview=resume_parsed_text[:200],
        jd_text_preview=jd_parsed_text[:200],
        status="parsed"
    )
