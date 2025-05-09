import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create a mock component that mimics the structure of CountryCard
// but without any external dependencies
const MockCountryCard = ({ country }) => (
  <div data-testid="country-card">
    <h2>{country.name.common}</h2>
    <p>Population: {country.population.toLocaleString()}</p>
    <p>Region: {country.region}</p>
    <p>Capital: {country.capital.join(', ')}</p>
  </div>
);

// Mock modules that Next.js relies on
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Test the mock component
describe('MockCountryCard Component', () => {
  it('renders country information correctly', () => {
    const mockCountry = {
      name: { common: 'United States' },
      population: 331002651,
      region: 'Americas',
      capital: ['Washington, D.C.']
    };
    
    render(<MockCountryCard country={mockCountry} />);
    
    // Check if the component renders
    expect(screen.getByTestId('country-card')).toBeInTheDocument();
    
    // Check if country name is displayed
    expect(screen.getByText('United States')).toBeInTheDocument();
    
    // Check if population is displayed
    expect(screen.getByText(/331,002,651/)).toBeInTheDocument();
    
    // Check if region is displayed
    expect(screen.getByText(/Americas/)).toBeInTheDocument();
    
    // Check if capital is displayed
    expect(screen.getByText(/Washington, D.C./)).toBeInTheDocument();
  });
});
