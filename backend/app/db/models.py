from sqlalchemy import Column, Integer, String, Boolean, Float, Text, ForeignKey, TIMESTAMP, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from .connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    sessions = relationship("Session", back_populates="user")


class Session(Base):
    __tablename__ = "sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    resume_text = Column(Text, nullable=True)
    jd_text = Column(Text, nullable=True)
    job_title = Column(String(255), nullable=True)
    analysis_result = Column(Text, nullable=True)

    user = relationship("User", back_populates="sessions")
    resume_skills = relationship("ResumeSkill", back_populates="session")
    jd_skills = relationship("JDSkill", back_populates="session")
    pathways = relationship("Pathway", back_populates="session")


class ResumeSkill(Base):
    __tablename__ = "resume_skills"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id"))
    skill_name = Column(String(255))
    proficiency_level = Column(String(50))  # beginner / intermediate / expert
    years_experience = Column(Float)

    session = relationship("Session", back_populates="resume_skills")


class JDSkill(Base):
    __tablename__ = "jd_skills"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id"))
    skill_name = Column(String(255))
    required_level = Column(String(50))
    is_mandatory = Column(Boolean, default=True)

    session = relationship("Session", back_populates="jd_skills")


class Pathway(Base):
    __tablename__ = "pathways"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id"))
    created_at = Column(TIMESTAMP, server_default=func.now())
    total_modules = Column(Integer)
    estimated_hours = Column(Float)

    session = relationship("Session", back_populates="pathways")
    modules = relationship("Module", back_populates="pathway")


class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    pathway_id = Column(Integer, ForeignKey("pathways.id"))
    order_index = Column(Integer)
    title = Column(String(255))
    description = Column(Text)
    skill_addressed = Column(String(255))
    duration_hours = Column(Float)
    difficulty = Column(String(50))      # beginner / intermediate / advanced
    module_type = Column(String(100))    # video / quiz / hands-on / reading
    resource_url = Column(Text, nullable=True)
    prerequisite_module_id = Column(Integer, nullable=True)   # self-referencing for dependency graph
    rationale = Column(Text, nullable=True)

    pathway = relationship("Pathway", back_populates="modules")
