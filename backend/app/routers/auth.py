from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session as dbSession
from app.db.connection import get_db
from app.db.models import User
from app.core.security import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.dependencies import get_current_user
from datetime import timedelta
import os

router = APIRouter()

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: UserCreate, db: dbSession = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User created successfully", "user_id": new_user.id, "email": new_user.email}

@router.post("/login")
def login(user: UserLogin, db: dbSession = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email, "id": db_user.id}, expires_delta=access_token_expires
    )
        
    return {"message": "Login successful", "user_id": db_user.id, "email": db_user.email, "token": access_token}

@router.get("/me")
def get_profile(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "email": current_user.email, "created_at": current_user.created_at}

@router.get("/my-roadmaps")
def get_user_roadmaps(current_user: User = Depends(get_current_user), db: dbSession = Depends(get_db)):
    from app.db.models import Session as AppSession
    
    user_sessions = db.query(AppSession).filter(AppSession.user_id == current_user.id).order_by(AppSession.created_at.desc()).all()
    
    result = []
    for s in user_sessions:
        result.append({
            "session_id": str(s.id),
            "job_title": s.job_title,
            "created_at": s.created_at
        })
    return result
