var del = require('del');

module.exports = function(gulp, $, conf) {

  gulp.task('clean', del.bind(null, [
    conf.stylesPathToBuild,
    conf.imagesPathToBuild,
    conf.scriptsPathToBuild,
    conf.webpackJsPathToBuild,
    conf.revPathToBuild,
    conf.sass2cssPathToBuild,
    conf.viewsPathToBuild
  ], { force: true }));

};