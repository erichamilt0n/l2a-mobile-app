import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../contexts/AuthContext";

/**
 * Hook for accessing auth context
 * @returns Auth context value
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
