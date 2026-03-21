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

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export default apiClient;