# Testing Setup for Country Explorer

This document explains how testing has been set up for the Country Explorer application.

## Testing Framework
- Jest - a JavaScript Testing Framework with a focus on simplicity
- React Testing Library - provides utilities for testing React components

## Test Files
- `__tests__/utils.test.js` - Tests for the utility function `cn()` which handles Tailwind CSS class merging
- `__tests__/country-card.test.jsx` - Tests for a mock version of the CountryCard component

## How to Run Tests
Run all tests:
```bash
npm test
```

Run a specific test file:
```bash
npx jest utils.test.js
```

## Configuration Files
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Imports testing libraries and sets up the testing environment
- `babel.config.js` - Babel configuration for Jest

## Adding More Tests
To add more tests:
1. Create a file with the `.test.js` or `.test.jsx` extension in the `__tests__` directory
2. Write your tests using Jest's expect syntax
3. Run the tests using the commands above

## Testing Components
When testing React components:
1. Use `render` from `@testing-library/react`
2. Query elements using methods like `getByText`, `getByRole`, etc.
3. Assert conditions using Jest's `expect`

Example:
```jsx
import { render } from '@testing-library/react';

test('renders a button', () => {
  const { getByRole } = render(<button>Click me</button>);
  const button = getByRole('button');
  expect(button).toHaveTextContent('Click me');
});
```

## Mocking Dependencies
For components with external dependencies (like Next.js components or context providers), consider:
1. Creating simplified mock versions of the components
2. Using Jest's mock functionality: `jest.mock()`
3. Testing the underlying logic separately from external dependencies

## Best Practices
- Test behavior, not implementation
- Write small, focused tests
- Follow the AAA pattern: Arrange, Act, Assert
- Keep tests independent of each other
