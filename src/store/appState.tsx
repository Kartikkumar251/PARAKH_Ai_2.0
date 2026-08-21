import React, { createContext, useContext, useState, ReactNode } from 'react';
import { casesData, CaseData } from '../data/mockData';

export type PageView = 'auth' | 'home' | 'analysis' | 'verdict';
export type InputMode = 'link' | 'image' | 'video';

interface AppState {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  currentCaseKey: string;
  setCurrentCaseKey: (key: string) => void;
  currentCase: CaseData;
  activeInputMode: InputMode;
  setActiveInputMode: (mode: InputMode) => void;
  elaOpacity: number;
  setElaOpacity: (opacity: number) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('auth');
  const [currentCaseKey, setCurrentCaseKey] = useState<string>('deepfake_speech');
  const [activeInputMode, setActiveInputMode] = useState<InputMode>('link');
  const [elaOpacity, setElaOpacity] = useState<number>(0.65);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const value = {
    currentPage,
    setCurrentPage,
    currentCaseKey,
    setCurrentCaseKey,
    currentCase: casesData[currentCaseKey],
    activeInputMode,
    setActiveInputMode,
    elaOpacity,
    setElaOpacity,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
