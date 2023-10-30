module.exports = {
  root: true,
  extends: [
    '@cyansalt/preset',
  ],
  parserOptions: {
    project: './tsconfig.tools.json',
  },
  rules: {
    'vue/no-undef-components': 'error',
    'vue/no-undef-properties': 'error',
  },
}
