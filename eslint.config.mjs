import config from '@cyansalt/eslint-config'

export default config({
  configs: [
    {
      languageOptions: {
        parserOptions: {
          project: [
            './tsconfig.app.json',
            './tsconfig.node.json',
          ],
        },
        globals: {
          worldBridge: 'readonly',
        },
      },
      rules: {
        'vue/no-undef-components': 'error',
        'vue/no-undef-properties': 'error',
      },
    },
  ],
})
