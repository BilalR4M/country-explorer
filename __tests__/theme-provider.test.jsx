import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { ThemeProvider } from '@/components/theme-provider'; 
import '@testing-library/jest-dom';

// Mock the next-themes module
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => children,
  useTheme: jest.fn(),
}));

// Create a test component that uses the theme
const TestComponent = () => {
  const { theme } = useTheme();
  return <div data-testid="theme-test">{theme || 'No theme'}</div>;
};

describe('Theme Provider', () => {
  beforeEach(() => {
    // Reset the mock implementation
    useTheme.mockImplementation(() => ({
      theme: 'light',
      setTheme: jest.fn(),
    }));
  });

  it('renders children and provides theme context', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TestComponent />
      </ThemeProvider>
    );

    // Check if the test component renders with theme from context
    const themeTest = screen.getByTestId('theme-test');
    expect(themeTest).toHaveTextContent('light');
  });
});
