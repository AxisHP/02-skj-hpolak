import { createContext, useContext, ReactNode } from 'react';

interface NavigationContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const NavigationProvider = ({ children, currentPage, setCurrentPage }: NavigationProviderProps) => {
  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  );
};
