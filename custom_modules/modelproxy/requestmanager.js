var request = require('request');

function RequestManager(opt) {

  this.__headers = opt.headers;

  this.__req = request.defaults({
    baseUrl: opt.baseUrl,
    headers: opt.headers,
    json: opt.json
  });
}

RequestManager.prototype = {

  /**
   * 请求后回调
   */
  __response: function(error, response, body, key, callback) {
    let status = body && body.status;
    if( error || (status != 0 && status != 1) ) {
      let err = new Error('request fail : ' + key);
      err.body = body;
      callback(err);
    }else{
      callback(null, body);
    }
  },

  /**
   * 创建请求需要的参数
   */
  __createRequestOpt: function(opt) {

    let oRule = opt.rule;
    let reqOpt = {
      uri: opt.uri
    };

    if(oRule.headers){
      reqOpt['headers'] = Object.assign({}, oRule.headers, this.__headers);
    }

    if(oRule.qs){
      reqOpt['qs'] = oRule.qs;
    }

    if(oRule.form){
      reqOpt['form'] = oRule.form;
    }

    return reqOpt;
  },

  get: function(opt) {

    let self = this;
    let key = opt.rule.key;
    let reqOpt = this.__createRequestOpt(opt);

    // 这里的 callback 与 async/parallelLimit 相关
    return function(callback) {
      self.__req.get(reqOpt, function(error, response, body) {
        self.__response(error, response, body, key, callback);
      });
    }

  },

  post: function(opt) {

    let self = this;
    let key = opt.rule.key;
    let reqOpt = this.__createRequestOpt(opt);

    return function(callback) {
      self.__req.post(reqOpt, function(error, response, body) {
        self.__response(error, response, body, key, callback);
      });
    }
  }

};

module.exports = RequestManager;