var Interfacemanager = require('./interfacemanager');

var interfaceManagerInstance = null;

function ModelProxy(rule) {

  interfaceManagerInstance = new Interfacemanager(rule);

  ModelProxy.__isInit = true;
  ModelProxy.__instance = this;

};


ModelProxy.prototype = {

  /**
   * 发出请求
   * @param  {[array]} rules 要请求的接口例: [ {key: 'login', form: {...}}, { key: 'captcha'} ]
   * @param  {[Boole]} pass  [可选参数 默认为 false 设置为 true 时，则对返回结果进行再一步判断，即请求结果的 status 的值都为 1 ，请求才算成功，否则请求当失败处理]
   * @param  {[number]} limit [可选参数 并发请求数，默认值为 10]
   */
  request: function(rules, pass, limit) {

    pass = !!pass;

    if( /^[1-9]\d*$/.test(limit) === false ) {
      limit = 10;
    }

    // 返回的是一个扩展的 promise 对象
    return interfaceManagerInstance.start(rules, pass, limit);
  }

};

/**
 * 初始化 ModelProxy 实例只能调用一次
 * @param  {[obj]} rule [接口对象]
 */
ModelProxy.init = function(rule) {
  if(!this.__isInit){
    return new ModelProxy(rule);
  }else{
    throw new Error('ModelProxy.init Method Only Call Once');
  }
};

/**
 * 获取 ModelProxy 实例
 */
ModelProxy.getInstance = function() {
  if(!this.__isInit){
    throw new Error('ModelProxy.init Method Must Called Before');
  }
  return this.__instance;
};


module.exports = ModelProxy;
