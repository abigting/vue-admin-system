module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
      sourceType: "module"
  },
  env: {
      browser: true,
      node: true,
      es6: true,
      // 添加
      jquery: true
  },
  extends: "eslint:recommended",
  // required to lint *.vue files
  plugins: ["html"],
  // check if imports actually resolve
  settings: {
      "import/resolver": {
          webpack: {
              config: "build/webpack.base.conf.js"
          }
      }
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  // add your custom rules here
  rules: {
      "no-console": "off",
      "indent": "off",
      "no-unused-vars": 0,
      "no-multiple-empty-lines": "off",
      // allow async-await
      "generator-star-spacing": "off",
      // allow debugger during development
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
