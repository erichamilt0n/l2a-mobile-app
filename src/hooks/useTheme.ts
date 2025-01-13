import { useContext } from "react";
import { ThemeContext } from "@/contexts/themeContext";

/**
 * Hook for accessing theme context
 * @returns Theme context value
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
