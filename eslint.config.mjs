import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    ignores: ['.nuxt', 'node_modules', 'dist']
  }
)
