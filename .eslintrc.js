module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    node: true
  },
  extends: [
    // "plugin:prettier/recommended",
    "plugin:vue/essential",
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'generator-star-spacing': 'off',
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
};
