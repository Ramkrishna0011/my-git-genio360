/** @type {import('jest').Config} */
module.exports = {
  displayName: 'web-admin',
  rootDir: '.',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@genio/ui$': '<rootDir>/../../libs/ui/src/index.ts',
    '\\.css$': '<rootDir>/../../jest.style-mock.js',
  },
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
};
