import { useState, type ReactNode } from "react";
import { ThemeContext } from "./themeContext";
import type { Theme } from "@/types/theme";

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component for managing application theme
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light");

  /**
   * Toggles between light and dark themes
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
