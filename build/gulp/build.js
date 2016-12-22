module.exports = function(gulp, $, conf) {

  gulp.task('generateScripts', ['script'], function() {
    return gulp.src([conf.webpackJsPathToBuild + '/**/async-*.js'])
      .pipe(gulp.dest(conf.scriptsPathToBuild));
  });

  gulp.task('revjs', ['generateScripts'], function() {
     return gulp.src([conf.webpackJsPathToBuild + '/**/*.js', '!' + conf.webpackJsPathToBuild + '/**/async-*.js'])
       .pipe($.rev())
       .pipe(gulp.dest(conf.scriptsPathToBuild))
       .pipe($.rev.manifest())
       .pipe(gulp.dest(conf.revPathToBuild + '/script'));
  });

  gulp.task('revcss', ['sass'], function() {
    return gulp.src([conf.sass2cssPathToBuild + '/**/*.css'])
      .pipe($.rev())
      .pipe(gulp.dest(conf.stylesPathToBuild))
      .pipe($.rev.manifest())
      .pipe(gulp.dest(conf.revPathToBuild + '/style'));
  });

  gulp.task('revCollector', ['revcss', 'revjs'], function() {
     return gulp.src([conf.revPathToBuild + '/**/*.json', '../views/**/*.jade'])
       .pipe($.revCollector())
       .pipe(gulp.dest(conf.viewsPathToBuild));
  });

  gulp.task('init', ['generateImages', 'revCollector']);

  gulp.task('build', ['clean'], $.shell.task(['cross-env NODE_ENV=production gulp --color --gulpfile gulpfile.js init']));

};