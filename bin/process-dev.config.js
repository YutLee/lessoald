let config = require('./process-base.config.js');
let app = config.apps[0];

app.env = {
  "NODE_ENV": "development"
};

module.exports = config;