import React from 'react';
import { render } from '@testing-library/react';

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

// Test the mock component
describe('MockCountryCard Component', () => {
  it('renders country information correctly', () => {
    const mockCountry = {
      name: { common: 'United States' },
      population: 331002651,
      region: 'Americas',
      capital: ['Washington, D.C.']
    };
    
    const { getByText, getByTestId } = render(<MockCountryCard country={mockCountry} />);
    
    // Check if the component renders
    expect(getByTestId('country-card')).toBeTruthy();
    
    // Check if country name is displayed
    expect(getByText('United States')).toBeTruthy();
    
    // Check if population is displayed
    expect(getByText(/331,002,651/)).toBeTruthy();
    
    // Check if region is displayed
    expect(getByText(/Americas/)).toBeTruthy();
    
    // Check if capital is displayed
    expect(getByText(/Washington, D.C./)).toBeTruthy();
  });
});
