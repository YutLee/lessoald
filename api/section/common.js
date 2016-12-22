module.exports = {
  captcha: {
    desc: '获取验证码', // 接口描述，可选
    version: 'v1',  // 接口版本， 可选，默认 v1
    uri: 'auth/login/captcha', // 接口路径，必填
    method: 'GET'  // 接口请求方法， 可选，默认为 'GET'
  },
  isRegister: {
    desc: '检测手机是否可以注册',
    version: 'v1',
    uri: 'auth/register/mobile/precheck',
    method: 'POST'
  },
  isLogin: {
    desc: '验证手机号是否可以通过验证码进行登录',
    version: 'v1',
    uri: 'auth/login/mobile/precheck',
    method: 'POST'
  },
  login: {
    desc: '用户名 + 密码登录',
    method: 'POST',
    uri: 'auth/login'
  }
}