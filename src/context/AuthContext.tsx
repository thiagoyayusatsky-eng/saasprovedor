import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { authService } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((authUser) => {
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          full_name: authUser.user_metadata?.full_name || '',
          avatar_url: authUser.user_metadata?.avatar_url,
          created_at: authUser.created_at || '',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe?.data?.subscription?.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.login(email, password);
    } finally {
      setLoading(false);
    }
  };

 const register = async (
  email: string,
  password: string,
  fullName: string,
  phone: string,
  role: string
) => {
    setLoading(true);
    try {
      await authService.register(email, password, fullName);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
