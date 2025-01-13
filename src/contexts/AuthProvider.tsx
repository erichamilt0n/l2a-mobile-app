import { useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import type { User } from "@/types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Simulates an API call for authentication
 */
const mockAuthCall = async (
  email: string,
  _password: string,
): Promise<User> => {
  await new Promise((resolve) => window.setTimeout(resolve, 1000));
  return {
    id: "1",
    email,
    name: "Test User",
  };
};

/**
 * Auth provider component for managing user authentication
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Handles user login
   * @param email - User's email
   * @param password - User's password
   */
  const login = async (email: string, password: string): Promise<void> => {
    const userData = await mockAuthCall(email, password);
    setUser(userData);
  };

  /**
   * Handles user logout
   */
  const logout = async (): Promise<void> => {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
