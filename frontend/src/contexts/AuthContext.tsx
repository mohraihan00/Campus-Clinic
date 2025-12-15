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
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
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
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await import('@/lib/api').then(m => m.default.get('/user'));
          setUser({ ...data, id: String(data.id) });
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { default: api } = await import('@/lib/api');
      const { data } = await api.post('/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser({ ...data.user, id: String(data.user.id) });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    import('@/lib/api').then(m => m.default.post('/logout')).finally(() => {
      localStorage.removeItem('token');
      setUser(null);
    });
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    try {
      const { default: api } = await import('@/lib/api');
      const { data: responseData } = await api.post('/register', data);
      localStorage.setItem('token', responseData.token);
      setUser({ ...responseData.user, id: String(responseData.user.id) });
      return { success: true };
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error);
      const message = error.response?.data?.message || 'Terjadi kesalahan saat registrasi';
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {!loading && children}
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
