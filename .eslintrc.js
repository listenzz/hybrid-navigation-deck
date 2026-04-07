module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest/*'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-unused-vars': 'off',
  },
}
