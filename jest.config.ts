import nextJest from 'next/jest'
import type { Config } from 'jest'

const createJestConfig = nextJest({
  dir: './',
})

const customConfig: Config = {
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
    cache: true,
  maxWorkers: '50%',
  testTimeout: 10000,
  verbose: false, 

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
   roots: ['<rootDir>/src'],
    testMatch: [
    '**/?(*.)+(test|spec).[tj]s?(x)',
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',

  coverageReporters: [
    'text',
    'text-summary',
    'json',
    'lcov',
    'clover',
    'html',
  ],

  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}

export default createJestConfig(customConfig)