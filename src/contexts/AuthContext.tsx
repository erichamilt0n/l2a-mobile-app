import { createContext, useState, type ReactNode } from "react";

// Move types inline since @/types/auth can't be found
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
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

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

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

// Export context and types for use in hook file
export { AuthContext };
export type { User, AuthContextType };
