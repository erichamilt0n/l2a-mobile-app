/// <reference types="vitest" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import {
  toBeInTheDocument,
  toHaveAttribute,
  toHaveClass,
  toHaveStyle,
  toBeVisible,
  toHaveTextContent,
} from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  interface AsymmetricMatchersContaining {
    toBeInTheDocument(): boolean;
    toHaveAttribute(attr: string, value?: string): boolean;
    toHaveClass(className: string): boolean;
    toHaveStyle(style: Record<string, unknown>): boolean;
    toBeVisible(): boolean;
    toHaveTextContent(text: string): boolean;
  }
}

// Extend expect with testing-library matchers
expect.extend({
  toBeInTheDocument,
  toHaveAttribute,
  toHaveClass,
  toHaveStyle,
  toBeVisible,
  toHaveTextContent,
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia,
});

// Import our IntersectionObserver mock
import "./test/setup";
