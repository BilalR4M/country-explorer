import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '@/components/search-bar';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Mock the Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('SearchBar Component', () => {
  beforeEach(() => {
    // Setup default mock implementations
    useSearchParams.mockImplementation(() => ({
      get: jest.fn().mockReturnValue(''),
      toString: jest.fn().mockReturnValue(''),
    }));
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));
    usePathname.mockImplementation(() => '/');
  });

  it('renders the search input', () => {
    render(<SearchBar defaultValue="" />);
    
    // Check if the search input is rendered
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });
  
  it('displays the default value when provided', () => {
    render(<SearchBar defaultValue="test" />);
    
    // Check if the input has the default value
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toHaveValue('test');
  });

  // Add more tests as needed
});
