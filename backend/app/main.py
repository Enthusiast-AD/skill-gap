from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.routers import upload, analyze, pathway, auth, session
from app.db.connection import engine, Base
import os
from pathlib import Path
from dotenv import load_dotenv

# Ensure .env is loaded
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv()

# Create tables and safely migrate existing column types
def init_db():
    try:
        Base.metadata.create_all(bind=engine)
        # Migrate existing column types to text if running on PostgreSQL to avoid truncation errors
        with engine.connect() as conn:
            migration_statements = [
                "ALTER TABLE modules ALTER COLUMN skill_addressed TYPE TEXT;",
                "ALTER TABLE modules ALTER COLUMN title TYPE TEXT;",
                "ALTER TABLE modules ALTER COLUMN module_type TYPE TEXT;",
                "ALTER TABLE modules ALTER COLUMN difficulty TYPE TEXT;",
                "ALTER TABLE jd_skills ALTER COLUMN skill_name TYPE TEXT;",
                "ALTER TABLE resume_skills ALTER COLUMN skill_name TYPE TEXT;",
                "ALTER TABLE sessions ALTER COLUMN job_title TYPE TEXT;",
            ]
            for stmt in migration_statements:
                try:
                    conn.execute(text(stmt))
                    conn.commit()
                except Exception:
                    pass
    except Exception as e:
        print(f"Warning: Could not connect to database on startup: {e}")

init_db()

app = FastAPI(title="Skill Gap Analysis API")

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(analyze.router, prefix="/api", tags=["Analyze"])
app.include_router(pathway.router, prefix="/api", tags=["Pathway"])
app.include_router(session.router, prefix="/api", tags=["Session"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
