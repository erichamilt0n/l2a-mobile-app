import "@testing-library/jest-dom";
import { expect } from "vitest";
import {
  toBeInTheDocument,
  toHaveClass,
} from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with specific matchers
expect.extend({ toBeInTheDocument, toHaveClass });
