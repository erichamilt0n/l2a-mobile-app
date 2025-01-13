/* eslint-env browser */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { tryLoadAndStartRecorder } from "@alwaysmeticulous/recorder-loader";
import "./index.css";
import App from "./App.tsx";

/**
 * Initializes and renders the React application
 * @returns void
 */
const startApp = () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Failed to find the root element");
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

// Initialize Meticulous before starting the app
tryLoadAndStartRecorder({
  projectId: "your-project-id",
  recordingToken: import.meta.env.VITE_METICULOUS_RECORDING_TOKEN || "",
  isProduction: import.meta.env.PROD,
})
  .then(startApp)
  .catch((error: Error) => {
    window.console.error("Failed to initialize Meticulous:", error);
    // Start the app anyway if Meticulous fails
    startApp();
  });
