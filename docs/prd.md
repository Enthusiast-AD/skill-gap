# PRD — AI-Adaptive Onboarding Engine
**Version:** 1.0 | **Timeline:** 48-Hour Hackathon Sprint | **Status:** Active

---

## 1. Product Overview

### 1.1 Problem Statement
Corporate onboarding is broken. Experienced hires sit through beginner modules they already know. New grads get overwhelmed by advanced content. The result: wasted time, disengaged employees, and delayed productivity.

### 1.2 Solution
An AI-driven onboarding engine that:
1. Parses a candidate's **Resume** and the target **Job Description**
2. Identifies the exact **skill gap** between the two
3. Generates a **personalized, ordered training pathway** to close that gap
4. Visualizes the roadmap in a clean, interactive **web UI**

### 1.3 Value Proposition
> "Stop training what people already know. Start teaching only what they need."

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React (Vite) + TailwindCSS | UI, file upload, roadmap visualization |
| **Backend** | Python + FastAPI | API, business logic, AI orchestration |
| **Database** | NeonDB (PostgreSQL via Neon serverless) | Store sessions, parsed skills, pathways |
| **AI Engine** | Google Gemini API (gemini-1.5-flash) | Resume/JD parsing, gap analysis, pathway generation |
| **Visualization** | React Flow (or Mermaid.js) | Interactive learning path graph/flowchart |
| **File Parsing** | PyMuPDF (fitz) + python-docx | Extract text from PDF/DOCX resumes and JDs |
| **Auth/Session** | UUID-based session tokens | Stateless session tracking |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Upload Page  │  │ Gap Analysis │  │  Roadmap View │  │
│  │ (Resume + JD) │  │   Results   │  │ (React Flow)  │  │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘  │
└─────────┼─────────────────┼──────────────────┼──────────┘
          │                 │                  │
          ▼                 ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (FastAPI)                     │
│                                                         │
│  POST /api/upload     → Parse Resume + JD text          │
│  POST /api/analyze    → Call Gemini → Extract Skills    │
│  POST /api/pathway    → Call Gemini → Generate Roadmap  │
│  GET  /api/session    → Retrieve saved session data     │
│  GET  /api/health     → Health check                    │
└────────────────────────────┬────────────────────────────┘
                             │
              ┌──────────────┴─────────────┐
              ▼                            ▼
   ┌──────────────────┐        ┌──────────────────────┐
   │  Gemini API      │        │  NeonDB (PostgreSQL)  │
   │  (AI Engine)     │        │  - sessions table     │
   │  - Skill Extract │        │  - skills table       │
   │  - Gap Analysis  │        │  - pathways table     │
   │  - Path Generate │        │  - modules table      │
   └──────────────────┘        └──────────────────────┘
```

---

## 4. Database Schema

### 4.1 Tables

```sql
-- Sessions: one per user upload
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  resume_text TEXT,
  jd_text TEXT,
  job_title VARCHAR(255)
);

-- Extracted Skills from Resume
CREATE TABLE resume_skills (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  skill_name VARCHAR(255),
  proficiency_level VARCHAR(50),  -- beginner / intermediate / expert
  years_experience FLOAT
);

-- Required Skills from Job Description
CREATE TABLE jd_skills (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  skill_name VARCHAR(255),
  required_level VARCHAR(50),
  is_mandatory BOOLEAN DEFAULT TRUE
);

-- Generated Learning Pathway
CREATE TABLE pathways (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  created_at TIMESTAMP DEFAULT NOW(),
  total_modules INT,
  estimated_hours FLOAT
);

-- Individual Learning Modules in a Pathway
CREATE TABLE modules (
  id SERIAL PRIMARY KEY,
  pathway_id INT REFERENCES pathways(id),
  order_index INT,
  title VARCHAR(255),
  description TEXT,
  skill_addressed VARCHAR(255),
  duration_hours FLOAT,
  difficulty VARCHAR(50),      -- beginner / intermediate / advanced
  module_type VARCHAR(100),    -- video / quiz / hands-on / reading
  resource_url TEXT,
  prerequisite_module_id INT   -- self-referencing for dependency graph
);
```

---

## 5. API Specification

### 5.1 Endpoints

#### `POST /api/upload`
Upload and parse Resume + Job Description files.

**Request:** `multipart/form-data`
```
resume: File (PDF or DOCX)
job_description: File (PDF, DOCX, or TXT)
job_title: string
```

**Response:**
```json
{
  "session_id": "uuid-string",
  "resume_text_preview": "string (first 200 chars)",
  "jd_text_preview": "string (first 200 chars)",
  "status": "parsed"
}
```

---

#### `POST /api/analyze`
Run skill extraction + gap analysis via Gemini.

**Request:**
```json
{ "session_id": "uuid-string" }
```

**Response:**
```json
{
  "session_id": "uuid-string",
  "resume_skills": [
    { "skill": "Python", "level": "expert", "years": 4 },
    { "skill": "SQL", "level": "beginner", "years": 0.5 }
  ],
  "required_skills": [
    { "skill": "Python", "required_level": "expert", "mandatory": true },
    { "skill": "Kubernetes", "required_level": "intermediate", "mandatory": true },
    { "skill": "SQL", "required_level": "intermediate", "mandatory": true }
  ],
  "skill_gaps": [
    { "skill": "Kubernetes", "gap_type": "missing", "priority": "high" },
    { "skill": "SQL", "gap_type": "needs_improvement", "current": "beginner", "target": "intermediate", "priority": "medium" }
  ],
  "reasoning_trace": "string (AI explanation of gap analysis)"
}
```

---

#### `POST /api/pathway`
Generate personalized learning pathway.

**Request:**
```json
{ "session_id": "uuid-string" }
```

**Response:**
```json
{
  "session_id": "uuid-string",
  "pathway_id": 1,
  "total_modules": 7,
  "estimated_hours": 18.5,
  "modules": [
    {
      "order": 1,
      "title": "SQL Foundations Refresher",
      "skill": "SQL",
      "type": "video + quiz",
      "duration_hours": 2,
      "difficulty": "beginner",
      "prerequisite": null,
      "rationale": "string"
    },
    {
      "order": 2,
      "title": "Intermediate SQL: Joins & Indexes",
      "skill": "SQL",
      "type": "hands-on lab",
      "duration_hours": 3,
      "difficulty": "intermediate",
      "prerequisite": 1,
      "rationale": "string"
    }
  ],
  "reasoning_trace": "string (AI explanation of path ordering logic)"
}
```

---

#### `GET /api/session/{session_id}`
Retrieve full saved session (for sharing / reload).

---

## 6. Gemini AI Prompt Design

### 6.1 Skill Extraction Prompt (Resume)
```
You are a precise HR analyst. Extract all technical and soft skills from the resume below.
For each skill, identify:
- skill_name (normalized, lowercase)
- proficiency_level: one of [beginner, intermediate, expert]
- years_experience: numeric estimate

Return ONLY valid JSON array. No explanation. No markdown.

RESUME TEXT:
{resume_text}
```

### 6.2 Skill Extraction Prompt (Job Description)
```
You are a precise job requirements analyst. Extract all required skills from this job description.
For each skill, identify:
- skill_name (normalized, lowercase)
- required_level: one of [beginner, intermediate, expert]
- is_mandatory: true/false

Return ONLY valid JSON array. No explanation. No markdown.

JOB DESCRIPTION:
{jd_text}
```

### 6.3 Gap Analysis Prompt
```
You are an adaptive learning expert. Given:
- Candidate skills: {resume_skills_json}
- Required skills for role "{job_title}": {jd_skills_json}

Identify the skill gaps. For each gap:
- skill: skill name
- gap_type: "missing" | "needs_improvement"
- current_level (if needs_improvement)
- target_level
- priority: "high" | "medium" | "low"

Also provide a brief reasoning_trace explaining your analysis.

Return JSON: { "skill_gaps": [...], "reasoning_trace": "..." }
```

### 6.4 Pathway Generation Prompt
```
You are a corporate L&D specialist. Create a personalized training pathway for:
- Role: {job_title}
- Skill gaps to address: {skill_gaps_json}

For each module:
- order_index (start from 1)
- title: descriptive module name
- skill_addressed
- description: 1-2 sentence description
- duration_hours: realistic estimate
- difficulty: beginner / intermediate / advanced
- module_type: video / reading / quiz / hands-on / project
- prerequisite_order: null or order index of prerequisite module
- rationale: why this module at this position

Rules:
1. Order modules from foundational to advanced
2. Group related skills together
3. Never recommend modules for skills the candidate already has at required level
4. Keep total pathway under 40 hours

Return JSON: { "modules": [...], "reasoning_trace": "...", "total_hours": X }
```

---

## 7. Frontend Pages & Components

### 7.1 Page Structure
```
/                    → Landing page (hero + CTA)
/upload              → Upload Resume + JD form
/analyzing           → Loading state while AI processes
/results             → Skill gap analysis display
/roadmap             → Interactive learning pathway visualization
/roadmap/share       → Public shareable roadmap view
```

### 7.2 Key Components

| Component | Description |
|---|---|
| `FileUpload` | Drag & drop for Resume + JD (PDF/DOCX/TXT) |
| `SkillGapChart` | Side-by-side bar chart: candidate vs required |
| `SkillBadge` | Color-coded pill: green=have it, red=missing, yellow=partial |
| `LearningRoadmap` | React Flow graph showing module sequence with dependencies |
| `ModuleCard` | Expandable card: title, type, duration, rationale |
| `ReasoningTrace` | Collapsible accordion showing AI's reasoning |
| `ProgressSummary` | Stats banner: X gaps found, Y hours of training, Z modules |

### 7.3 Roadmap Visualization Logic
- Each **module = a node** in the graph
- **Edges = prerequisites** (directional arrows)
- Node color = difficulty (green=beginner, yellow=intermediate, red=advanced)
- Node shape = module type (rectangle=video, diamond=quiz, hexagon=hands-on)
- Clicking a node shows the full ModuleCard

---

## 8. Adaptive Pathing Algorithm

### 8.1 Logic (Original Implementation)
The adaptive ordering uses a **weighted topological sort** with 4 priority signals:

```
Priority Score = (Gap_Severity × 0.4) + (Foundational_Score × 0.3) + (Dependency_Depth × 0.2) + (Estimated_Hours_Inverse × 0.1)
```

**Gap Severity:**
- Missing skill → 1.0
- Needs improvement (2+ levels) → 0.8
- Needs improvement (1 level) → 0.5

**Foundational Score:**
- Skills that are prerequisites for other gap skills → boosted score
- Leaf skills (no dependents) → lower score

**Dependency Depth:**
- Skills with no prerequisites → scheduled first
- Topological ordering ensures you never hit a module before its prerequisite

### 8.2 Flow
```
1. Extract skills from Resume → Normalize
2. Extract skills from JD → Normalize  
3. Fuzzy match skills (handle "React" vs "ReactJS" vs "React.js")
4. Score each gap with Priority Score formula
5. Build dependency graph (Gemini infers prerequisites)
6. Topological sort → ordered module list
7. Store in DB → return to frontend
```

---

## 9. Reasoning Trace Feature

Every API response that involves AI decision-making includes a `reasoning_trace` field. On the frontend:

- A **"Why this path?" button** appears on the Roadmap page
- Opens a **side drawer** showing:
  - How skills were extracted and matched
  - Which gaps were found and why they were prioritized
  - Why each module is ordered where it is
- This is surfaced per-module too (rationale field on each ModuleCard)

---

## 10. Folder Structure

```
adaptive-onboarding/
│
├── frontend/                        # React (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Analyzing.jsx
│   │   │   ├── Results.jsx
│   │   │   └── Roadmap.jsx
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── SkillBadge.jsx
│   │   │   ├── SkillGapChart.jsx
│   │   │   ├── LearningRoadmap.jsx
│   │   │   ├── ModuleCard.jsx
│   │   │   └── ReasoningTrace.jsx
│   │   ├── api/
│   │   │   └── client.js            # Axios API calls
│   │   └── App.jsx
│   ├── package.json
│   └── .env                         # VITE_API_URL
│
├── backend/                         # FastAPI
│   ├── app/
│   │   ├── main.py                  # FastAPI app entry
│   │   ├── routers/
│   │   │   ├── upload.py
│   │   │   ├── analyze.py
│   │   │   └── pathway.py
│   │   ├── services/
│   │   │   ├── gemini_service.py    # All Gemini API calls
│   │   │   ├── parser_service.py    # PDF/DOCX text extraction
│   │   │   └── adaptive_engine.py  # Gap scoring + path ordering
│   │   ├── models/
│   │   │   └── schemas.py           # Pydantic models
│   │   └── db/
│   │       ├── connection.py        # NeonDB connection
│   │       └── migrations.sql       # Table creation SQL
│   ├── requirements.txt
│   └── .env                         # GEMINI_API_KEY, DATABASE_URL
│
├── Dockerfile                       # Optional Docker setup
├── docker-compose.yml
└── README.md
```

---

## 11. Environment Variables

### Backend `.env`
```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:8000
```

---

## 12. Key Dependencies

### Backend (`requirements.txt`)
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
python-multipart==0.0.9
google-generativeai==0.5.4
psycopg2-binary==2.9.9
sqlalchemy==2.0.30
PyMuPDF==1.24.3
python-docx==1.1.2
python-dotenv==1.0.1
pydantic==2.7.1
```

### Frontend (`package.json` key deps)
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-router-dom": "^6.23.0",
    "axios": "^1.7.0",
    "reactflow": "^11.11.3",
    "recharts": "^2.12.0",
    "@heroicons/react": "^2.1.3"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "vite": "^5.2.0"
  }
}
```

---

## 13. Evaluation Criteria Mapping

| Criterion | Weight | How We Address It |
|---|---|---|
| Technical Sophistication | 20% | Gemini for extraction + weighted topological sort adaptive algorithm |
| Grounding & Reliability | 15% | All modules grounded in extracted JD skills; no hallucinated skills |
| Reasoning Trace | 10% | Every AI call returns `reasoning_trace`; surfaced in UI |
| Product Impact | 10% | Skips skills already at required level; quantifies time saved |
| User Experience | 15% | React Flow visual roadmap + drag-drop upload + clean UI |
| Cross-Domain Scalability | 10% | Prompt is role-agnostic; tested on tech and ops roles |
| Communication & Docs | 20% | README + video + 5-slide deck + this PRD |

---

## 14. Out of Scope (48-hr limit)

- User authentication / login system
- Email notifications
- LMS integration (Coursera, Udemy API)
- Multi-language support
- Real-time collaborative sessions
- Mobile app

---

*PRD prepared for 48-hour hackathon sprint. All features scoped to be deliverable within the time constraint.*