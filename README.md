# Skill Gap Analysis & Learning Pathway Generator

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109%2B-green)

A powerful AI-driven onboarding engine designed to bridge the gap between a candidate's current skills and their target role. This application parses resumes and job descriptions, identifies skill gaps using Google Gemini AI, and generates a personalized, interactive learning roadmap.

> "Stop training what people already know. Start teaching only what they need."

## 🚀 Key Features

- **Smart Parsing**: Automatically extracts text and skills from PDF/DOCX resumes and Job Descriptions.
- **AI Gap Analysis**: Uses Google Gemini Pro/Flash to intelligently analyze the difference between existing skills and required competencies.
- **Personalized Roadmaps**: Generates a step-by-step learning pathway tailored to close specific skill gaps.
- **Interactive UI**: Visualizes the learning journey with a clean, modern React interface.
- **Secure Authentication**: User authentication and session management.

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **AI Engine**: Google Gemini API (`google-generativeai`)
- **Database**: PostgreSQL (via SQLAlchemy)
- **File Processing**: PyMuPDF, python-docx
- **Authentication**: JWT (PyJWT), Passlib

### Frontend
- **Framework**: React (Vite)
- **Styling**: TailwindCSS, Shadcn/UI (Radix Primitives)
- **Visualization**: Dagre (Graph layout), Custom Nodes
- **State Management**: React Context API
- **HTTP Client**: Axios

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL Database (Local or Cloud like NeonDB)
- Google Gemini API Key

## ⚡ Getting Started

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/skillgap_db
GOOGLE_API_KEY=your_gemini_api_key
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALLOWED_ORIGINS=http://localhost:5173
```

Run the server:
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── core/           # Config, security, dependencies
│   │   ├── db/             # Database connection & models
│   │   ├── models/         # Pydantic schemas
│   │   ├── routers/        # API endpoints (auth, analyze, upload)
│   │   └── services/       # AI & parsing logic
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # UI Components (Roadmap, Navbar, etc.)
│   │   │   ├── context/    # Global state
│   │   │   ├── pages/      # Route pages (Upload, Results, etc.)
│   │   │   └── services/   # API calls
│   └── vite.config.ts
└── docs/                   # Documentation resources
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
