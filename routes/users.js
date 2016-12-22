var express = require('express');
var router = express.Router();
const config = require('./config');

var nav = [
  {
    "name":"首页",
    "url":"/home"
  },
  {
    "name":"CRUD操作",
    "url":"/crud"
  }
]

const setCorsSupport = (req, res, next) => {
  const origin = req.headers.origin;
  if (config.whiteOrigins.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  }
  next();
};

router.all('/api/*', (req, res, next) => {
  setCorsSupport(req, res, next);
});

router.get('/api/nav', function (req, res) {
  res.json(nav);
});

router.get('/login', function (req, res) {
  res.sendfile('vue/module/login.html');
});

router.get('/reg', function (req, res) {
  res.sendfile('vue/module/reg.html');
});

/* GET users page. */
router.get('/', function(req, res, next) {
  res.render('users/index', { title: 'page users' });
});

module.exports = router;
