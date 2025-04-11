/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js?(x),json,md}': [
    'prettier --config ../../prettier.config.js --ignore-path ../../.prettierignore --write'
  ],
  '*.{htm?(l),css,scss,sass,less}': [
    'prettier --config ../../prettier.config.js --ignore-path ../../.prettierignore --write'
  ],
  '*.{ts?(x),vue}': [
    'prettier --config ../../prettier.config.js --ignore-path ../../.prettierignore --write',
    'eslint'
  ]
}
