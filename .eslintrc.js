module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "sort-imports-es6-autofix",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    // General
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error", "always"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "semi": ["error", "never", { "beforeStatementContinuationChars": "any" }],
    "sort-imports-es6-autofix/sort-imports-es6": [2, {
      "ignoreCase": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],
    "space-infix-ops": "error",
    // React
    "react/display-name": "off",
    "react/prop-types": "off",
    // TypeScript
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
  },
}
