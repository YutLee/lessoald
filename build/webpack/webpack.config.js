var path = require('path');
var env = require('./env').env;

module.exports = {

  entry: require('./entry'),

  output: {
    publicPath: '/scripts/',
    filename: '[name].js',
    chunkFilename: 'async-[id]-[chunkhash].js'
  },

  plugins: require('./plugins').plugins,

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'jquery' : path.resolve('../') + '/resources/scripts/lib/jquery-3.1.1.js'
    }
  },

  watch : env === 'development' ? true : false
}