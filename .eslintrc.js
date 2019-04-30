module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'arrow-body-style': ['error', 'as-needed'],
    'max-len': ['error', { code: 130 }],
    'linebreak-style': 0,
    'arrow-parens': ['error', 'as-needed'],
    'space-before-function-paren': ['error', 'never']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
