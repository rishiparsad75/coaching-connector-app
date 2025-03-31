
import React, { createContext, useState, useContext, useEffect } from 'react';

type UserRole = 'admin' | 'student' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  class?: string;
  rollNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    name: 'John Student',
    email: 'student@example.com',
    password: 'student123',
    role: 'student' as UserRole,
    class: 'Class 10',
    rollNumber: 'R001',
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          u => u.email === email && u.password === password && u.role === role
        );
        
        if (foundUser) {
          // Remove password before storing user
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
