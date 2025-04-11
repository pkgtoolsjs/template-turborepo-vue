/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js?(x),ts?(x),json,md,vue,css,scss,sass,less}': 'prettier --write'
}
