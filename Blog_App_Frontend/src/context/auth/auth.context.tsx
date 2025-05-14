// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  authToken?: string; // <-- Add token here
}

interface AuthContextType {
  authState: AuthState;
  login: (token: string) => void;
  logout: () => void;
}

// Actual context creation
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const stored = localStorage.getItem("auth");
      return stored ? JSON.parse(stored) : { isAuthenticated: false };
    } catch {
      return { isAuthenticated: false };
    }
  });

  const login = (token: string) => {
    const newState: AuthState = {
      isAuthenticated: true,
      authToken: token
    };
    setAuthState(newState);
    localStorage.setItem("auth", JSON.stringify(newState)); // Store full state
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
