module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], // we don't care that .js files contain JSX code
    "react/jsx-props-no-spreading": "off" // HOCs should have prop spreading
  }
};
