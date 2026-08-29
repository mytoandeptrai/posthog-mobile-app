import { createContext, useContext, useState, type ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  loginDemo: (name: string, email: string) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function loginDemo(name: string, email: string) {
    setIsLoggingIn(true);
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        const demoUser: User = { id: `user_${Date.now()}`, name, email };
        setUser(demoUser);
        setIsLoggingIn(false);
        resolve(demoUser);
      }, 600);
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoggingIn, loginDemo, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
