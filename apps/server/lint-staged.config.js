/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js?(x),json,md}': [
    'prettier --config ../../prettier.config.js --ignore-path ../../.prettierignore --write'
  ],
  '*.ts?(x)': [
    'eslint',
    'prettier --parser=typescript --config ../../prettier.config.js --ignore-path ../../.prettierignore --write'
  ]
}
