module.exports = function(gulp, $, conf) {

  gulp.task('sass:watch', function () {
    // gulp.watch(conf.assetsPath + '/sass/**/*.scss', ['sass']);
    $.watch(conf.assetsPath + '/sass/**/*.scss', function() {
       gulp.start('sass');
    })
  });

  gulp.task('script:watch', $.shell.task(['cross-env NODE_ENV=development gulp --color --gulpfile gulpfile.js --environment development script']));

  gulp.task('watch:image', function() {
    $.watch(conf.assetsPath + '/images/**/*.{jpg,jpeg,png,gif}', function() {
       gulp.start('generateImages');
    });
  });

  gulp.task('watch', ['clean'], function() {
    gulp.start('generateImages');
    gulp.start('sass');
    gulp.start('watch:image');
    gulp.start('sass:watch');
    gulp.start('script:watch');
  });

};