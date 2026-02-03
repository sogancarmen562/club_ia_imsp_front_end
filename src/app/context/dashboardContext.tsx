import { createContext, useContext, useState, ReactNode } from "react";

type DashboardContextType = {
  articles: any[];
  setArticlesData: (articles: any[]) => void;
  projects: any[];
  setProjectsData: (projects: any[]) => void;
  user: any;
  setUser: (user: any) => void;
  data: any;
  setData: (id: any) => void;
  filesUrls: string[];
  setFilesUrls: (filesUrls: string[]) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticlesData] = useState<any[]>([]);
  const [projects, setProjectsData] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
  const [data, setData] = useState<any>();
  const [filesUrls, setFilesUrls] = useState<string[]>([]);

  return (
    <DashboardContext.Provider value={{ articles, setArticlesData, projects, setProjectsData, user, setUser, data, setData, filesUrls, setFilesUrls }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
