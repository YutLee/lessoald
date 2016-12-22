var express = require('express');
var modelProxy = require('../custom_modules/modelproxy');
var router = express.Router();


router.get('/', function(req, res) {

   res.render('demo/index', {
      title : 'demo',
      header : 'Hello Jade'
   })
});

router.get('/page', function(req, res) {
   res.render('demo/page')
});


router.get('/redis', function(req, res) {
   var sess = req.session
   if (sess.views) {
     sess.views++
     res.setHeader('Content-Type', 'text/html')
     res.write('<p>views: ' + sess.views + '</p>')
     res.end()
   } else {
     sess.views = 1
     res.end('welcome to the session demo. refresh!')
   }
});

var rules = [
  {
    key: 'captcha',  // 对应定义好接口的 key
    qs: {  // get 请求的参数，和 request 的参数一样
      mobile: '13690766666'
    }
  },
  {
    key: 'isRegister',
    form : { // post 请求的参数
      mobile: '13690766666'
    }
  },
  {
    key: 'regions'
  },
  {
    key: 'login',
    form: {
      mobile: '13690766666',
      password: '123456'
    }
  }
];

router.get('/proxy-1', function(req, res) {

  // 获取实例
  let model = modelProxy.getInstance();


  // model.request 发起请求的方法，返回扩展的 promise 对象
  model.request(rules).then(function(result) {
     res.send(result);
  }).catch(function(err) {
     res.send(err.message);
  });

});


router.get('/proxy-2', function(req, res) {

  let model = modelProxy.getInstance();

  // model.request 第二个参数是可选参数 默认为 false 设置为 true 时，则对返回结果进行再一步判断，即请求结果的 status 的值都为 1 ，请求才算成功，否则请求当失败处理
  model.request(rules, true).then(function(result) {
     res.send(result);
  }).catch(function(err) {
     res.send(err.message);  // status property unreasonable
  });

});


router.get('/proxy-3', function(req, res) {

  let model = modelProxy.getInstance();

  // 第三个参数 可选参数 并发请求数，默认值为 10
  model.request(rules, false, 1).then(function(result) {
     res.send(result);
  }).catch(function(err) {
     res.send(err.message);
  });

});


router.get('/proxy-4', function(req, res) {

  let model = modelProxy.getInstance();

  model.request([{
    key: 'login',
    form: {
      mobile: '13690766111',
      password: '000000'
    }
  }]).then(function(result){

    model.request([{
      key: 'users',
      headers: {
        Authorization: 'Bearer ' + result.login.data.token
      }
    }]).then(function(result) {
        res.send(result);
    }).catch(function(err){
       console.log(err);
    });

  });

});


router.get('/proxy-5', function(req, res) {

  let model = modelProxy.getInstance();
  let rules = [
    {
      key: 'regions',
      qs: {
        id: 1
      }
    }
  ];

  model.request(rules, true).then(function(result) {
     return result
  }).finally(function(result) {
     result.finally = '无论成功与否都执行，这里是成功';
  }).then(function(result) {

     model.request([{ key: 'adfqerewwr' }]).then(function(){
        console.log('这里不会执行，因为不存在 adfqerewwr api 会抛出错误');
     }).catch(function(err) {
        err.catchMessage = '在 catch 增加的错误信息';
        return err;
     }).then(function(err){
        throw err; // 抛出错误
     }).finally(function(err){
        err.finallyMessage = '无论成功与否都执行，这里是失败';
        res.send([result, err.message, err.catchMessage, err.finallyMessage]);
     }).catch(function(err){
        // console.log(err);
     });

  });

});


router.get('/proxy-6', function(req, res) {

  let model = modelProxy.getInstance();
  let rules = [];

  // 50
  for(let i=1; i<= 50; i++){
     rules.push({
       key: 'regions-' +i,
       qs: {
         id: i
       }
     });
  }

  model.request(rules, false, 50).then(function(result) {
     res.send(result);
  }).catch(function(err) {
     res.send(err.message);
  });

});


var request = require('request');
router.get('/proxy-7', function(req, res) {

  let baseRequest = request.defaults({
    baseUrl: 'http://api.lessoald.cn/',
    headers: {
      Accept: 'application/x.lessocloud.v1+json'
    },
    json: true
  });

  function createRequest(number){
    let aFn = [];
    let count = 0;
    let results = [];
    for(let i=1; i <= number; i++){
      let task = function(callback){
         baseRequest.get({
           uri: 'v1/regions',
           qs: {
             id: i
           }
         }, function(error, response, body) {
            // res.send(body);
            count += 1;
            results.push(body);
            if( count == number ){
              callback(results);
            }
         });
      };
      aFn.push(task);
    }

    return aFn;
  }


  function requestStart(tasks, callback) {
     tasks.forEach(function(fn){
        fn(callback);
     });
  }


  let tasks = createRequest(50);
  let startTime = +(new Date);
  requestStart(tasks, function(results) {
     console.log('---------------------------------------');
     console.log( +(new Date) - startTime );
     res.send(results);
  });


});

module.exports = router;