import React from 'react';
import { render } from '@testing-library/react';

// Create wrapper with theme provider
export function renderWithProviders(ui, options = {}) {
  // Create a custom wrapper that would typically include your providers
  // For example: ThemeProvider, SessionProvider, etc.
  return {
    ...render(ui, {
      // Wrap component with needed providers
      wrapper: ({ children }) => children,
      ...options,
    }),
  };
}

// Helper method to wait for a condition to be true
export const waitFor = (condition, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval);
        resolve();
      } else if (Date.now() - startTime > timeout) {
        clearInterval(interval);
        reject(new Error(`Timed out waiting for condition after ${timeout}ms`));
      }
    }, 100);
  });
};
