// import "./test/setup";
/// <reference types="vitest" />
/// <reference lib="dom" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Import DOM types
type DOMElement = typeof globalThis.Element;
type DOMDocument = typeof globalThis.Document;
type DOMIntersectionObserver = typeof globalThis.IntersectionObserver;
type DOMIntersectionObserverEntry = typeof globalThis.IntersectionObserverEntry;

type IntersectionObserverCallback = (
  entries: DOMIntersectionObserverEntry[],
  observer: DOMIntersectionObserver,
) => void;

type IntersectionObserverInit = {
  root?: DOMElement | DOMDocument | null;
  rootMargin?: string;
  threshold?: number | number[];
};

declare global {
  interface Window {
    IntersectionObserver: {
      new (
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
      ): DOMIntersectionObserver;
      prototype: DOMIntersectionObserver;
    };
  }
}

// Define the type for our mock IntersectionObserver
type MockIntersectionObserver = {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  takeRecords: ReturnType<typeof vi.fn>;
  root: null;
  rootMargin: string;
  thresholds: number[];
};

// Extend expect with testing-library matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock matchMedia
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

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn().mockImplementation(
  (_callback: IntersectionObserverCallback) =>
    ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: vi.fn(),
      root: null,
      rootMargin: "",
      thresholds: [],
    }) as MockIntersectionObserver,
);

// Remove existing IntersectionObserver if it exists
if ("IntersectionObserver" in window) {
  delete (window as any).IntersectionObserver;
}

// Add our mock implementation
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Import our IntersectionObserver mock
