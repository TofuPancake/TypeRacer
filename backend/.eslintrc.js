module.exports = {
  plugins: ['jest'],
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  // ignorePatterns: ['**/dist/*.js', '**/node_modules/**/*.js'],
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'no-console': 'off',
  },
  ignorePatterns: ['/dist/*'],
};
