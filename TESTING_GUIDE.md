# Next.js Testing Guide for Country Explorer

This guide explains how to write and run tests for the Country Explorer application using Next.js testing best practices.

## Testing Setup

We use the following testing tools:

- **Jest**: The testing framework
- **React Testing Library**: For testing React components
- **next/jest**: Next.js' testing configuration
- **SWC**: For fast compilation instead of Babel
- **@testing-library/dom**: Required for DOM testing utilities

## Project Structure

Tests are located in the `__tests__` directory and follow the naming convention `[component-name].test.jsx` or `[utility].test.js`.

## Running Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode (automatically re-runs tests when files change):

```bash
npm run test:watch
```

To run a specific test file:

```bash
npm test -- search-bar.test.jsx
```

## Writing Component Tests

### Basic Component Test

```jsx
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/my-component';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '@/components/counter';

describe('Counter', () => {
  it('increments when the button is clicked', () => {
    render(<Counter />);
    
    const button = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(button);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

### Testing with Next.js Components

When testing components that use Next.js features like `next/image`, `next/link`, or navigation hooks, you need to mock these dependencies:

```jsx
import { render, screen } from '@testing-library/react';
import MyNextComponent from '@/components/my-next-component';

// Mock Next.js components and hooks
jest.mock('next/image', () => ({ 
  __esModule: true, 
  default: (props) => <img {...props} />
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ 
    push: jest.fn(),
    pathname: '/' 
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

describe('MyNextComponent', () => {
  it('renders correctly', () => {
    render(<MyNextComponent />);
    // assertions here
  });
});
```

### Mocking Browser APIs

Some components use browser APIs that aren't available in the Jest environment. You'll need to mock these APIs in the `jest.setup.js` file. For example, to mock `window.matchMedia` (which is used by the theme provider):

```js
// Mock window.matchMedia for theme-related tests
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
```

## Testing Utility Functions

```js
import { myUtil } from '@/lib/utils';

describe('myUtil', () => {
  it('processes data correctly', () => {
    const input = { name: 'test' };
    const result = myUtil(input);
    expect(result).toEqual({ processedName: 'TEST' });
  });
});
```

## Testing Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it.

2. **Use Screen Queries**: Prefer using `screen` queries over destructured render queries.
   ```jsx
   // Good
   render(<MyComponent />);
   screen.getByText('Hello');
   
   // Avoid
   const { getByText } = render(<MyComponent />);
   getByText('Hello');
   ```

3. **Priority of Queries**: Follow this order for better accessibility testing:
   - getByRole
   - getByLabelText
   - getByPlaceholderText
   - getByText
   - getByDisplayValue
   - getByAltText
   - getByTitle
   - getByTestId (last resort)

4. **Use Data-testid Sparingly**: Only use `data-testid` when no other query works.

5. **Test in Isolation**: Each test should be independent and not rely on other tests.

6. **Mock External Dependencies**: Use Jest's mocking capabilities for external API calls and third-party libraries.

7. **Test Edge Cases**: Include tests for loading states, error states, and empty states.

## Coverage Configuration

The project has configured Jest to collect coverage information when tests are run. Coverage thresholds are defined in `jest.config.js`:

```js
coverageThreshold: {
  global: {
    branches: 1,
    functions: 5,
    lines: 4,
    statements: 4
  }
}
```

To see the coverage report, run:

```bash
npm test
```

This will generate an HTML coverage report in the `coverage/lcov-report` directory that you can open in your browser.

## Debugging Tests

If a test fails, you can use the debug function to see what's in the DOM:

```jsx
const { debug } = render(<MyComponent />);
debug(); // Outputs the DOM to console
```

Or with screen:

```jsx
render(<MyComponent />);
screen.debug(); // Outputs the DOM to console
```
