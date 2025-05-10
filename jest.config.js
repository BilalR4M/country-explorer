const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/$1',
  },
  // This ensures tests are transformed by SWC
  transform: {},  // Configure test coverage reporting
  // Only collect coverage when explicitly requested via --coverage flag
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  // Coverage thresholds only applied when coverage is collected with --coverage flag
  coverageThreshold: {
    // You can set per-file thresholds instead of global ones
    "./lib/utils.js": {
      branches: 80,
      functions: 80, 
      lines: 80,
      statements: 80
    }
    // Remove global thresholds until more test coverage is added
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
