import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // Parameters are prefixed with underscore to indicate they are intentionally unused
      // Remove the underscore prefix if you need to use these parameters later
    },
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "http://localhost:5173", // Add your development server URL here
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Disable video recording by default
  },
});
