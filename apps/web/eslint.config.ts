import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'

import baseVueESLintConfig from 'eslint-config/vue'

export default defineConfigWithVueTs(
  baseVueESLintConfig,

  // Add your custom rules here:
  {
    name: 'app/custom-rules',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {}
  }
)
