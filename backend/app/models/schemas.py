from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class UploadResponse(BaseModel):
    session_id: UUID
    resume_text_preview: str
    jd_text_preview: str
    status: str

class ResumeSkillCreate(BaseModel):
    skill: str
    level: str
    years: float

class JDSkillCreate(BaseModel):
    skill: str
    required_level: str
    mandatory: bool

class SkillGap(BaseModel):
    skill: str
    gap_type: str  # missing / needs_improvement
    current: Optional[str] = None
    target: Optional[str] = None
    priority: str  # high / medium / low

class AnalyzeRequest(BaseModel):
    session_id: UUID

class AnalyzeResponse(BaseModel):
    session_id: UUID
    resume_skills: List[ResumeSkillCreate]
    required_skills: List[JDSkillCreate]
    skill_gaps: List[SkillGap]
    reasoning_trace: str

class PathwayRequest(BaseModel):
    session_id: UUID

class ModuleCreate(BaseModel):
    order: int
    title: str
    skill: str
    type: str # module_type
    duration_hours: float
    difficulty: str
    prerequisite: Optional[int] = None
    rationale: str
    description: Optional[str] = None
    resource_url: Optional[str] = None

class PathwayResponse(BaseModel):
    session_id: UUID
    pathway_id: int
    total_modules: int
    estimated_hours: float
    modules: List[ModuleCreate]
    reasoning_trace: str
