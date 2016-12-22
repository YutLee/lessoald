'use strict';

var request = require('request');
var baseRequest = request.defaults({
  headers: {'Accept': 'application/x.lessocloud.v1+json'}
});

const config = {
  host: 'http://api.lessoald.cn',
  request: baseRequest
};

module.exports = config;