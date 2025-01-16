import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";

interface TestWrapperProps {
  children: ReactNode;
}

/**
 * Test wrapper component that provides necessary context providers
 */
export const TestWrapper = ({ children }: TestWrapperProps) => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
