module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@/config/logger\\.config$': '../../config/logger.config',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@config/(.*)': '<rootDir>/../config/$1',
    '@test/(.*)': '<rootDir>/../test/$1',
    '@/(.*)': '<rootDir>/$1',
    '@module/(.*)': '<rootDir>/modules/$1',
    '@shared/(.*)': '<rootDir>/shared/$1',
  },
};
