/// <reference types="vitest" />
import '@testing-library/jest-dom';
import { expect, afterEach, vi, describe, it, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend expect with testing-library matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Make Vitest functions available globally
Object.assign(global, {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi
}); 