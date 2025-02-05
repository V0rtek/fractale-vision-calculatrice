import type { Config } from 'jest';

// Aide de ChatGPT ici à cause de quelques erreurs de configuration
const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};

export default config;
