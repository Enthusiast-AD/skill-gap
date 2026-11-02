import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface UploadResponse {
  session_id: string;
  resume_text_preview: string;
  jd_text_preview: string;
  status: string;
}

export interface ResumeSkill {
  skill: string;
  level: string;
  years?: number;
}

export interface RequiredSkill {
  skill: string;
  required_level: string;
  mandatory: boolean;
}

export interface SkillGap {
  skill: string;
  gap_type: 'missing' | 'needs_improvement';
  priority: 'high' | 'medium' | 'low';
  current?: string;
  target?: string;
}

export interface AnalyzeResponse {
  session_id: string;
  resume_skills: ResumeSkill[];
  required_skills: RequiredSkill[];
  skill_gaps: SkillGap[];
  reasoning_trace: string;
}

export interface Module {
  order: number;
  title: string;
  skill: string;
  type: string;
  duration_hours: number;
  difficulty: string;
  prerequisite: number | null;
  rationale: string;
  description: string;
  resource_url?: string;
}

export interface PathwayResponse {
  session_id: string;
  pathway_id: number;
  total_modules: number;
  estimated_hours: number;
  modules: Module[];
  reasoning_trace: string;
}

export const uploadFiles = async (
  resumeFile: File,
  jobDescription: string | File,
  jobTitle: string
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  
  if (typeof jobDescription === 'string') {
    formData.append('jd_text', jobDescription);
  } else {
    formData.append('job_description', jobDescription);
  }
  
  formData.append('job_title', jobTitle);

  const response = await apiClient.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const analyzeSkills = async (sessionId: string): Promise<AnalyzeResponse> => {
  const response = await apiClient.post<AnalyzeResponse>('/analyze', {
    session_id: sessionId,
  });
  return response.data;
};

export const generatePathway = async (sessionId: string): Promise<PathwayResponse> => {
  const response = await apiClient.post<PathwayResponse>('/pathway', {
    session_id: sessionId,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/signup', { email, password });
  return response.data;
};

export const getMyRoadmaps = async () => {
  const response = await apiClient.get('/auth/my-roadmaps');
  return response.data;
};

export interface FullSessionResponse {
  session_id: string;
  job_title: string;
  created_at: string;
  resume_skills: ResumeSkill[];
  required_skills: RequiredSkill[];
  skill_gaps: SkillGap[];
  reasoning_trace: string;
  pathway?: PathwayResponse | null;
}

export const getSessionData = async (sessionId: string): Promise<FullSessionResponse> => {
  const response = await apiClient.get<FullSessionResponse>(`/session/${sessionId}`);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export interface SampleProfile {
  id: string;
  title: string;
  jobTitle: string;
  description: string;
  resumeText: string;
  jdText: string;
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: "fullstack-to-ai",
    title: "Full Stack Dev → Senior AI & Cloud Engineer",
    jobTitle: "Senior AI & Cloud Platform Engineer",
    description: "React, Node.js & PostgreSQL developer seeking to transition to Cloud-native AI infrastructure.",
    resumeText: `ALEX RIVERA
Full Stack Software Engineer | 4+ Years Experience
Email: alex.rivera@example.com | Portfolio: https://github.com/alexrivera

SUMMARY:
Results-driven Full Stack Engineer with 4 years of hands-on experience building scalable web applications. Proficient in TypeScript, React, Next.js, Node.js, and relational databases. Eager to leverage strong foundation in software design to scale enterprise AI and cloud-native distributed platforms.

TECHNICAL SKILLS:
- Languages: JavaScript, TypeScript, Python (intermediate), SQL, HTML5/CSS3
- Frontend: React 18, Next.js, Redux Toolkit, Tailwind CSS, Responsive Web Design
- Backend: Node.js, Express, REST APIs, FastAPI (basic), PostgreSQL, Redis
- Tools & DevOps: Git, Docker (basic), GitHub Actions CI/CD, Vite, Jest
- Methodologies: Agile/Scrum, Test-Driven Development, System Design

EXPERIENCE:
Senior Frontend / Full Stack Engineer | NovaTech Labs (2022 - Present)
- Architected and shipped 4 high-traffic SaaS customer portals using React, TypeScript, and TailwindCSS.
- Developed backend microservices with Node.js and PostgreSQL processing 50k+ daily events.
- Containerized development workflows using Docker Compose, reducing team setup time by 40%.

Software Engineer | Pulse Media (2020 - 2022)
- Built modern client dashboard interfaces with React and RESTful APIs.
- Optimized database queries in PostgreSQL, improving dashboard load times by 35%.
- Implemented automated end-to-end testing with Jest and Playwright.

EDUCATION:
B.S. in Computer Science, State University (2016 - 2020)`,
    jdText: `Role: Senior AI & Cloud Platform Engineer
Location: Remote / Hybrid | Department: Platform & AI Infrastructure

Overview:
We are seeking a talented Senior AI & Cloud Platform Engineer to lead the design and deployment of our next-generation machine learning training and inference infrastructure. You will bridge modern software engineering, Kubernetes cloud infrastructure, and large language model integration.

Required Competencies & Skills:
- Mandatory: Strong proficiency in Python for scalable backend and data engineering services.
- Mandatory: Production experience with Kubernetes, Helm, and cloud orchestration (AWS or GCP).
- Mandatory: Proven experience deploying LLMs or AI workloads (LangChain, vLLM, or Gemini / OpenAI APIs).
- Mandatory: Strong background in relational & vector databases (PostgreSQL, pgvector, Pinecone).
- Mandatory: Deep understanding of CI/CD pipelines, Docker containerization, and microservices architecture.
- Preferred: Experience with Terraform or Infrastructure as Code (IaC).
- Preferred: Familiarity with distributed caching, message queues (Kafka, Redis), and system observability (Prometheus/Grafana).

Responsibilities:
- Build and maintain high-throughput AI inference pipelines handling millions of tokens daily.
- Design scalable Kubernetes clusters on AWS/GCP with automated autoscaling.
- Implement vector search architectures and retrieval-augmented generation (RAG) pipelines.
- Collaborate with frontend and ML research teams to integrate production APIs.`,
  },
  {
    id: "data-to-ml",
    title: "Data Analyst → Machine Learning Engineer",
    jobTitle: "Machine Learning Engineer",
    description: "SQL, Tableau & Python analyst stepping up to production ML pipelines & MLOps.",
    resumeText: `PRIYA SHARMA
Data Analyst & BI Specialist | 3 Years Experience
Email: priya.sharma@example.com | LinkedIn: linkedin.com/in/priyasharma

PROFESSIONAL SUMMARY:
Analytical Data Specialist with 3 years of experience transforming complex business datasets into predictive insights. Experienced in SQL, Python data manipulation (Pandas, NumPy), statistical modeling, and dashboard creation. Looking to transition into full-lifecycle Machine Learning Engineering.

CORE COMPETENCIES:
- Data & Stats: SQL, Python (Pandas, NumPy, Scipy), Exploratory Data Analysis, A/B Testing
- Machine Learning (Basic): Scikit-Learn, Linear Regression, Random Forests, K-Means Clustering
- BI & Viz: Tableau, PowerBI, Matplotlib, Seaborn
- Engineering: Git, Jupyter Notebooks, Basic Docker, Linux CLI

WORK HISTORY:
Data Analyst | Metrix Global Solutions (2021 - Present)
- Authored complex SQL queries across 10M+ transaction records in Snowflake.
- Built customer churn prediction models using Scikit-Learn achieving 82% precision.
- Automated daily KPI reporting using Python scripts and Tableau Server.

Junior Analyst | FinEdge Analytics (2020 - 2021)
- Cleaned and prepared tabular financial datasets for quarterly forecast analysis.
- Designed executive dashboards tracking user engagement and retention.

EDUCATION:
B.S. in Statistics & Information Systems (2016 - 2020)`,
    jdText: `Role: Machine Learning Engineer
Department: Applied AI & Predictive Products

About the Role:
We are looking for an ML Engineer to take exploratory prototypes into scalable production systems. You will deploy models into production, build automated training pipelines, and monitor model performance in real time.

Requirements:
- Mandatory: Advanced Python programming including object-oriented and asynchronous patterns.
- Mandatory: Deep hands-on experience with PyTorch or TensorFlow for deep learning.
- Mandatory: Production MLOps experience: MLflow, Kubeflow, or Weights & Biases for experiment tracking.
- Mandatory: Experience deploying ML models as REST/gRPC endpoints using FastAPI or Triton.
- Mandatory: Strong foundational knowledge of feature stores, data pipelines, and Docker.
- Preferred: Experience with cloud data warehouses (Snowflake, BigQuery) and Apache Spark.
- Preferred: Vector embeddings and transformer architecture familiarity.`,
  }
];

export default apiClient;