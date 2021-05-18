module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    document: true,
    localStorage: true,
    window: true,
    AMap: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
}
