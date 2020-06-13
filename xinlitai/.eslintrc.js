module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jquery": true
  },
  //"extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "legacyDecorators": true,
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "babel",
    "react"
  ],
  "rules": {
    // "no-unused-vars": 0,//检查未使用的引用，启用下面配置no-unused-vars
    "no-unused-vars": ["warn", { "vars": "all", "varsIgnorePattern": "(connect)|([aA]ctions)", "args": "none"}],
    //"quotes": [2, "single"],
    //"strict": [2, "never"],
    //"new-cap": 1, //函数首字母大写
    //"generator-star-spacing": 1,
    //"object-shorthand": 1,
    //"arrow-parens": 1,
    "no-restricted-globals": ["error", "fetch"],
    "no-undef": 2,
    "no-await-in-loop": 1,
    "react/jsx-no-undef": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 0
  }
};