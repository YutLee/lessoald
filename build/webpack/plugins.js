var webpack = require('webpack');
var env = require('./env').env;

function getPlugin() {

  var aPlugin = [
      new webpack.optimize.CommonsChunkPlugin({
        name : 'common',
        filename: 'common.js',
        minChunks: 3
      }),
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
      })
  ];

  if( env === 'production' ){
     aPlugin.push( new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} }) );
  }

  return aPlugin;
}

module.exports = {
  plugins : getPlugin()
};