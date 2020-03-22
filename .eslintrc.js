module.exports = {
  parserOptions: {
    sourceType: "module",
    "ecmaVersion": 2018
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV !== "production" ? "off" : "error",
    "no-debugger": process.env.NODE_ENV !== "production" ? "off" : "error",
    "no-useless-escape": "off",
    "no-empty": "off",
    "no-var": "error",
    "no-lonely-if": "error",
    "prefer-const": "error",
  }
}
