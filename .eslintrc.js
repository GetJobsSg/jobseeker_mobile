module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: { es6: true },
  rules: {
    'import/prefer-default-export': 'off',
  },
};
