module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "commonjs",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn"],
    "prettier/prettier": ["error"],
  },
};
