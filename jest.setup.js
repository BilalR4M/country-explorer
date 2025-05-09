import '@testing-library/jest-dom';
// This will be used in your tests to interact with the DOM
import { cleanup } from '@testing-library/react';

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Reset any runtime request handlers we may add during the tests
afterEach(() => {
  cleanup();
});
