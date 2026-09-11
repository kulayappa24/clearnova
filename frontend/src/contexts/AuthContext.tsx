import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { login as apiLogin } from '@/api/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Default demo user
    return {
      id: 'demo-admin-id',
      email: 'admin@clearnova.in',
      fullName: 'Municipal Administrator',
      role: 'ADMIN'
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // ignore parse error
      }
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await apiLogin(credentials);
      sessionStorage.setItem('token', res.accessToken);
      sessionStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
    } catch (err) {
      // Demo fallback login
      let role: 'ADMIN' | 'SANITATION_OFFICER' | 'WORKER' | 'CITIZEN' = 'ADMIN';
      if (credentials.email.includes('officer')) role = 'SANITATION_OFFICER';
      if (credentials.email.includes('worker')) role = 'WORKER';
      if (credentials.email.includes('citizen')) role = 'CITIZEN';

      const demoUser: User = {
        id: 'demo-user-id',
        email: credentials.email,
        fullName: credentials.email.split('@')[0].toUpperCase(),
        role: role
      };

      sessionStorage.setItem('token', 'demo-jwt-token');
      sessionStorage.setItem('user', JSON.stringify(demoUser));
      setUser(demoUser);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
