/** @type {import('jest').Config} */
const config = {
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/config/jest/__mocks__/fileMock.js",
    "\\.scss$": "<rootDir>/config/jest/__mocks__/styleMock.js",
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest-setup.js'],
  testPathIgnorePatterns: [
    "<rootDir>/(?!src)",
  ],
  testMatch: [
    "<rootDir>/**/?(*.)(spec|test).js?(x)",
    // "<rootDir>/**/?(*.)test.a11y.js?(x)"
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/config/jest/jsTransform.js",
  },
};

module.exports = config;
