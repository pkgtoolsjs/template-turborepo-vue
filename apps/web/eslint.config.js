import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'

import baseVueESLintConfig from 'eslint-config/config-vue'

export default defineConfigWithVueTs(baseVueESLintConfig, {
  files: ['**/*.{ts,mts,tsx,vue}'],
  rules: {}
})
