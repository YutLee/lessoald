'use strict';

const config = {
  host: 'http://localhost:3000',
  webHost: 'http://localhost:8080',

  whiteOrigins: [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://store.lessoald.cn'
  ]
};

// 判断环境
switch (process.env.LC_APP_ENV) {

  // 当前环境为线上测试环境
  case 'stage':
    config.host = 'http://dev.store.lessoald.cn';
    config.webHost = 'http://dev.store.lessoald.cn';
    break;

  // 当前环境为线上正式运行的环境
  case 'production':
  default:
    config.host = 'http://store.lessoald.cn';
    config.webHost = 'http://store.lessoald.cn';
    break;
}

module.exports = config;