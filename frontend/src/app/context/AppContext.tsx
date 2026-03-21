import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { AnalyzeResponse, PathwayResponse } from '../services/api';

interface AppContextType {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
  analysisData: AnalyzeResponse | null;
  setAnalysisData: (data: AnalyzeResponse | null) => void;
  pathwayData: PathwayResponse | null;
  setPathwayData: (data: PathwayResponse | null) => void;
  jobTitle: string;
  setJobTitle: (title: string) => void;
  clearSession: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalyzeResponse | null>(null);
  const [pathwayData, setPathwayData] = useState<PathwayResponse | null>(null);
  const [jobTitle, setJobTitle] = useState<string>('');

  const clearSession = () => {
    setSessionId(null);
    setAnalysisData(null);
    setPathwayData(null);
    setJobTitle('');
  };

  return (
    <AppContext.Provider
      value={{
        sessionId,
        setSessionId,
        analysisData,
        setAnalysisData,
        pathwayData,
        setPathwayData,
        jobTitle,
        setJobTitle,
        clearSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}