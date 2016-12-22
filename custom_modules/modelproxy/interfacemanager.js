var Custompromise = require('./custompromise');
var Requestmanager = require('./requestmanager');
var parallelLimit = require('async/parallelLimit');

var requestManagerInstance = null;

function InterfaceManager(rule) {
  this.__rule = rule;
  requestManagerInstance = new Requestmanager(rule.requestOpt);
}

InterfaceManager.prototype = {

  /**
   * 创建请求任务
   */
  __createTasks: function(rules) {

    let oTasks = {};
    let self = this;
    let oRule = this.__rule.interfaces;
    let version = this.__rule.requestOpt.version;

    rules.forEach(function(obj) {
      let key = obj['key'];
      let targetRule = oRule[key];
      if(targetRule){

        // 请求相关信息
        let useful = {
          method : targetRule['method'] || 'GET',
          uri: targetRule['version'] ? targetRule['version'] + '/' + targetRule['uri'] : version + '/' + targetRule['uri'],
          rule: obj
        };

        oTasks[key] = self.__generateTask(useful);

      }else{ // 若没定义改接口，则任务出错（即请求没定义的接口）
        oTasks[key] = function(callback) {
          callback(new Error('undefined ' + key + ' api'));
        };
      }
    });

    return oTasks;
  },

  __generateTask: function(opt) {
    let task = null;
    switch(opt.method) {
      case 'GET':
        task = requestManagerInstance.get(opt);
        break;
      case 'POST':
        task = requestManagerInstance.post(opt);
        break;
      default :
        // 如 opt.method 不正确，也认为请求失败
        task = function(callback) { callback(new Error('undefined ' + opt.method + ' method in requestManagerInstance')); };
    }
    return task;
  },

  __checkPass: function(results) {

     let res = true;
     let aKey = Object.keys(results);
     for (let key of aKey) {
       if( results[key]['status'] == 0 ){
          res = false;
          break;
       }
     }

     return res;
  },

  start: function(rules, pass, limit) {

    let self = this;
    let oTasks = this.__createTasks(rules);
    let startTime = +(new Date);
    let promise = new Custompromise(function(resolve, reject) {
       parallelLimit(oTasks, limit, function(err, results) {
         console.log( +(new Date) - startTime );
         if(err){
           reject(err);
         }else{
           if(pass){
             self.__checkPass(results) ? resolve(results) : reject(new Error('status property unreasonable'));
           }else{
             resolve(results);
           }
         }
       });
    });
    return promise;
  }

};

module.exports = InterfaceManager;
