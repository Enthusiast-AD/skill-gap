from google import genai
import os
import json
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

# Create Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def clean_json_response(text: str) -> str:
    """Cleans the response from Gemini to ensure valid JSON."""
    text = text.strip()
    if text.startswith("```json"):
        text = text[7:]
    if text.endswith("```"):
        text = text[:-3]
    return text.strip()

async def extract_resume_skills(resume_text: str) -> List[Dict[str, Any]]:
    prompt = f"""
    You are a precise HR analyst. Extract all technical and soft skills from the resume below.
    For each skill, identify:
    - skill_name (normalized, lowercase)
    - proficiency_level: one of [beginner, intermediate, expert]
    - years_experience: numeric estimate (e.g. 2.5, 0.5)

    Return ONLY a valid JSON array of objects. No explanation. No markdown.

    RESUME TEXT:
    {resume_text}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        cleaned_text = clean_json_response(response.text)
        return json.loads(cleaned_text)
    except Exception as e:
        print(f"Error extracting resume skills: {e}")
        return []

async def extract_jd_skills(jd_text: str) -> List[Dict[str, Any]]:
    prompt = f"""
    You are a precise job requirements analyst. Extract all required skills from this job description.
    For each skill, identify:
    - skill_name (normalized, lowercase)
    - required_level: one of [beginner, intermediate, expert]
    - is_mandatory: true/false

    Return ONLY a valid JSON array of objects. No explanation. No markdown.

    JOB DESCRIPTION:
    {jd_text}
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        cleaned_text = clean_json_response(response.text)
        return json.loads(cleaned_text)
    except Exception as e:
        print(f"Error extracting JD skills: {e}")
        return []

async def analyze_gaps(resume_skills: List[Dict], jd_skills: List[Dict], job_title: str) -> Dict[str, Any]:
    prompt = f"""
    You are an adaptive learning expert. Given:
    - Candidate skills: {json.dumps(resume_skills)}
    - Required skills for role "{job_title}": {json.dumps(jd_skills)}

    Identify the skill gaps. For each gap:
    - skill: skill name
    - gap_type: "missing" | "needs_improvement"
    - current: current proficiency level (if needs_improvement, e.g. "beginner")
    - target: target proficiency level (e.g. "intermediate")
    - priority: "high" | "medium" | "low"

    Also provide a brief reasoning_trace explaining your analysis.

    Return a valid JSON object with keys: "skill_gaps" (list) and "reasoning_trace" (string).
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        cleaned_text = clean_json_response(response.text)
        return json.loads(cleaned_text)
    except Exception as e:
        print(f"Error analyzing gaps: {e}")
        return {"skill_gaps": [], "reasoning_trace": "Error during analysis."}

async def generate_pathway(job_title: str, skill_gaps: List[Dict]) -> Dict[str, Any]:
    prompt = f"""
    You are a corporate L&D specialist. Create a personalized training pathway for:
    - Role: {job_title}
    - Skill gaps to address: {json.dumps(skill_gaps)}

    For each module:
    - order: integer (start from 1)
    - title: descriptive module name
    - skill: which skill from the gaps does this address?
    - description: 1-2 sentence description
    - duration_hours: realistic estimate (float)
    - difficulty: beginner / intermediate / advanced
    - type: video / reading / quiz / hands-on / project
    - resource_url: a REAL, valid URL to a high-quality learning resource (e.g., a specific YouTube video, Coursera course, official documentation, or tutorial). DO NOT use example.com or placeholder URLs.
    - prerequisite: null or order index of prerequisite module (use null if none)
    - rationale: why this module is at this position?

    Rules:
    1. Order modules from foundational to advanced.
    2. Group related skills together.
    3. Never recommend modules for skills the candidate already has at the required level (unless as a quick refresher).
    4. Keep total pathway under 40 hours.

    Return a valid JSON object with keys: "modules" (list), "reasoning_trace" (string), "total_hours" (float).
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        cleaned_text = clean_json_response(response.text)
        return json.loads(cleaned_text)
    except Exception as e:
        print(f"Error generating pathway: {e}")
        return {"modules": [], "reasoning_trace": "Error during pathway generation.", "total_hours": 0}
