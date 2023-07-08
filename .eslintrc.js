module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'import'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@?(shared|test|util)/**',
            group: 'internal',
          },
        ],
      },
    ],
  },
};
