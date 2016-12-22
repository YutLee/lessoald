module.exports = function(gulp, $, conf) {

  gulp.task('generateImages', function() {
    return gulp.src([
        conf.assetsPath + '/images/**',
        '!' + conf.assetsPath + '/images/inline/**',
        '!' + conf.assetsPath + '/images/spriteicon/**'
      ])
      .pipe(gulp.dest(conf.imagesPathToBuild));
  });

};