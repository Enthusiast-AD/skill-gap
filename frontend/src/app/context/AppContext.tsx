import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { AnalyzeResponse, PathwayResponse } from '../services/api';

const STORAGE_KEY = 'prepgrap_session_state';
const THEME_KEY = 'prepgrap_theme';
const COMPLETED_MODULES_KEY = 'prepgrap_completed_modules';

interface StoredState {
  sessionId: string | null;
  analysisData: AnalyzeResponse | null;
  pathwayData: PathwayResponse | null;
  jobTitle: string;
}

interface AppContextType {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
  analysisData: AnalyzeResponse | null;
  setAnalysisData: (data: AnalyzeResponse | null) => void;
  pathwayData: PathwayResponse | null;
  setPathwayData: (data: PathwayResponse | null) => void;
  jobTitle: string;
  setJobTitle: (title: string) => void;
  completedModules: number[];
  toggleModuleCompletion: (order: number) => boolean;
  isModuleCompleted: (order: number) => boolean;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  clearSession: () => void;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sessionId, setSessionIdState] = useState<string | null>(null);
  const [analysisData, setAnalysisDataState] = useState<AnalyzeResponse | null>(null);
  const [pathwayData, setPathwayDataState] = useState<PathwayResponse | null>(null);
  const [jobTitle, setJobTitleState] = useState<string>('');
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  // Enforce light theme permanently
  useEffect(() => {
    setThemeState('light');
    localStorage.setItem(THEME_KEY, 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');

    // Session restore
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredState = JSON.parse(stored);
        if (parsed.sessionId) setSessionIdState(parsed.sessionId);
        if (parsed.analysisData) setAnalysisDataState(parsed.analysisData);
        if (parsed.pathwayData) setPathwayDataState(parsed.pathwayData);
        if (parsed.jobTitle) setJobTitleState(parsed.jobTitle);
      }
    } catch (e) {
      console.warn('Could not restore session state:', e);
    }

    // Completed modules restore
    try {
      const savedModules = localStorage.getItem(COMPLETED_MODULES_KEY);
      if (savedModules) {
        setCompletedModules(JSON.parse(savedModules));
      }
    } catch (e) {
      console.warn('Could not restore completed modules:', e);
    }

    setIsLoaded(true);
  }, []);

  // Sync session state to sessionStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const stateToSave: StoredState = {
        sessionId,
        analysisData,
        pathwayData,
        jobTitle,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save session state:', e);
    }
  }, [sessionId, analysisData, pathwayData, jobTitle, isLoaded]);

  // Sync completed modules to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(COMPLETED_MODULES_KEY, JSON.stringify(completedModules));
    } catch (e) {
      console.warn('Could not save completed modules:', e);
    }
  }, [completedModules, isLoaded]);

  const setTheme = useCallback((_newTheme: 'light' | 'dark') => {
    setThemeState('light');
    localStorage.setItem(THEME_KEY, 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme('light');
  }, [setTheme]);

  const setSessionId = (id: string | null) => {
    setSessionIdState(id);
  };

  const setAnalysisData = (data: AnalyzeResponse | null) => {
    setAnalysisDataState(data);
  };

  const setPathwayData = (data: PathwayResponse | null) => {
    setPathwayDataState(data);
  };

  const setJobTitle = (title: string) => {
    setJobTitleState(title);
  };

  const toggleModuleCompletion = useCallback((order: number): boolean => {
    let nowCompleted = false;
    setCompletedModules((prev) => {
      if (prev.includes(order)) {
        nowCompleted = false;
        return prev.filter((o) => o !== order);
      } else {
        nowCompleted = true;
        return [...prev, order];
      }
    });
    return nowCompleted;
  }, []);

  const isModuleCompleted = useCallback((order: number): boolean => {
    return completedModules.includes(order);
  }, [completedModules]);

  const clearSession = useCallback(() => {
    setSessionIdState(null);
    setAnalysisDataState(null);
    setPathwayDataState(null);
    setJobTitleState('');
    setCompletedModules([]);
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(COMPLETED_MODULES_KEY);
  }, []);

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
        completedModules,
        toggleModuleCompletion,
        isModuleCompleted,
        theme,
        setTheme,
        toggleTheme,
        clearSession,
        isLoaded,
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
