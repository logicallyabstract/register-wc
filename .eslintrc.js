module.exports = {
  extends: ['airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': ['error'],
    'spaced-comment': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        // do not require test/fixture imports to be in main deps
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};