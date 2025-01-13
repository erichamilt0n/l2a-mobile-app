import "@testing-library/jest-dom";
import { vi } from "vitest";

/**
 * Mock IntersectionObserver for tests
 */
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockImplementation(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
}));

window.IntersectionObserver = mockIntersectionObserver;
