var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var favicon = require('serve-favicon');
// var logger = require('morgan');


// 初始化接口服务
var modelProxy = require('./custom_modules/modelproxy');
modelProxy.init(require('./api/main'));


var app = express();
var env = app.get('env');

app.set('x-powered-by', false);

// view engine setup
var viewsPath = env === 'production' ? path.join(__dirname, 'viewsBuild') : path.join(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if(env === 'production'){

  var RedisStore = require('connect-redis')(session);

  app.use(session({
    secret: 'lessoald',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
       host: '127.0.0.1',
       port: '6379',
       db: 2
    })
  }));

  app.use(function (req, res, next) {
    if (!req.session) {
      return next(new Error('Lost Connections to Redis'));
    }
    next();
  });

}else{

  app.use(session({
    secret: 'lessoald',
    resave: false,
    saveUninitialized: false
  }));

}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vue')));


var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test/index');
var demo  = require('./routes/demo');

app.use('/', index);
app.use('/member', users);
app.use('/test', test);
app.use('/demo', demo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
