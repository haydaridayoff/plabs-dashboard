/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  pluginSearchDirs: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["^@", "^[a-zA-Z0-9-]+", "^[./]"],
};
