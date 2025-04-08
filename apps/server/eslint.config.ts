import tseslint from 'typescript-eslint'
import baseLibraryESLintConfig from 'eslint-config/config-library'

export default tseslint.config(
  baseLibraryESLintConfig,

  // Add your custom rules here:
  {
    name: 'app/custom-rules',
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {}
  }
)
