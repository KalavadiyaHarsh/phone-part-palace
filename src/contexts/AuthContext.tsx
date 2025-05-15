
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

// Define user type
type User = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name?: string;
};

// Define context type
interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => void;
  isLoading: boolean;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials for demo (in a real app, you'd verify against a backend)
const ADMIN_USERS = [
  { id: 'admin1', email: 'admin@mpartsstore.com', password: 'admin123', role: 'admin' as const },
];

// Sample users for demo
const SAMPLE_USERS: Array<User & { password: string }> = [
  { id: 'user1', email: 'user@example.com', password: 'password123', role: 'user' as const, name: 'Demo User' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mparts_user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('mparts_user');
      }
    }
    
    setIsLoading(false);
  }, []);
  
  // Sign in function
  const signIn = async (email: string, password: string): Promise<boolean> => {
    // First check admin users
    const adminUser = ADMIN_USERS.find(
      (admin) => admin.email === email && admin.password === password
    );
    
    if (adminUser) {
      const { password: _, ...userWithoutPassword } = adminUser;
      setUser(userWithoutPassword);
      localStorage.setItem('mparts_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    // Then check regular users
    const regularUser = SAMPLE_USERS.find(
      (user) => user.email === email && user.password === password
    );
    
    if (regularUser) {
      const { password: _, ...userWithoutPassword } = regularUser;
      setUser(userWithoutPassword);
      localStorage.setItem('mparts_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };
  
  // Sign up function
  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    // Check if user already exists
    if (ADMIN_USERS.some(admin => admin.email === email) || 
        SAMPLE_USERS.some(user => user.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `user${Date.now()}`,
      email,
      password,
      role: 'user' as const,
      name,
    };
    
    // In a real app, you'd send this to a backend
    SAMPLE_USERS.push(newUser);
    
    // Sign user in after signup
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('mparts_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };
  
  // Sign out function
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('mparts_user');
    toast.info("You have been signed out");
  };
  
  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
