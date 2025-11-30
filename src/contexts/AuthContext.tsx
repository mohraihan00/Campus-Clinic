import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'patient' | 'staff' | 'doctor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  nim?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  nim?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'patient@test.com', role: 'patient', nim: '12345678', phone: '081234567890' },
  { id: '2', name: 'Dr. Jane Smith', email: 'doctor@test.com', role: 'doctor', phone: '081234567891' },
  { id: '3', name: 'Admin User', email: 'admin@test.com', role: 'admin', phone: '081234567892' },
  { id: '4', name: 'Staff Member', email: 'staff@test.com', role: 'staff', phone: '081234567893' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: data.name,
      email: data.email,
      role: 'patient',
      nim: data.nim,
      phone: data.phone,
    };
    mockUsers.push(newUser);
    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
