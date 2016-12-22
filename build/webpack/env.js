function getEnv() {

  var env = 'undefined';

  if(process.env.NODE_ENV){

    var expression = process.env.NODE_ENV.trim();

    switch (expression) {
      case 'development':
        env = 'development';
        break;
      case 'production':
        env = 'production';
        break;
    }
  }

  return env;
}

module.exports = {
  env : getEnv()
};