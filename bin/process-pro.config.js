let config = require('./process-base.config.js');
let app = config.apps[0];

app.env = {
  "NODE_ENV": "production"
};

app['instances'] = 'max';
app['exec_mode'] = 'cluster';

module.exports = config;