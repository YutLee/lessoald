var webpack = require('webpack-stream');
var argv = require('yargs').argv;

module.exports = function(gulp, $, conf) {

  gulp.task('script', function() {

    var buildPath = argv.environment === 'development' ?  conf.scriptsPathToBuild : conf.webpackJsPathToBuild;

    return gulp.src('')
     .pipe(webpack(require('../webpack/webpack.config.js')))
     .pipe(gulp.dest(buildPath));

  });

};