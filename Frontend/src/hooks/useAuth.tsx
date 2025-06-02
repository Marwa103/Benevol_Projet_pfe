
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '@/utils/types';
import authService, { AssociationRegisterRequest } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  registerAssociation: (data: AssociationRegisterRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si un utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('beneviolUser');
    
    if (storedUser && authService.isAuthenticated()) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      // Stocker l'utilisateur en local pour persistance
      localStorage.setItem('beneviolUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('beneviolUser');
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const userData = await authService.register(name, email, password);
      setUser(userData);
      localStorage.setItem('beneviolUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerAssociation = async (data: AssociationRegisterRequest) => {
    setIsLoading(true);
    try {
      const userData = await authService.registerAssociation(data);
      setUser(userData);
      localStorage.setItem('beneviolUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Association registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user && authService.isAuthenticated(), 
        isLoading, 
        login, 
        logout,
        register,
        registerAssociation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
