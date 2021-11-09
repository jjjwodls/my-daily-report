module.exports = {
  root: true,
  env: {
    node: false,
    browser : false
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars' : 'off', //사용하지 않는 변수에 대해 설정을 꺼준다.
    'no-undef' : 'off',
    'no-mixed-spaces-and-tabs' : 'off',
    'no-console'  : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
