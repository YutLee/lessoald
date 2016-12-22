var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var assets  = require('postcss-assets');
var sprites = require('postcss-sprites');
var updateRule = require('postcss-sprites/lib/core').updateRule;
var argv = require('yargs').argv;

function getProcessors(conf) {
  return [
    sprites({
      stylesheetPath: conf.publicPath,
      basePath: conf.assetsPath + '/images',
      spritePath: conf.imagesPathToBuild + '/spriteicon',
      filterBy: function(image) {
        if(!/\/spriteicon\//.test(image.url)) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
      groupBy: function(image) {
        let groups = /\/spriteicon\/(.+)\/.+/gi.exec(image.url);
        let groupName = groups ? groups[1] : groups;

        if(!groupName){
          return Promise.reject();
        }
        return Promise.resolve(groupName);
      },
      hooks: {
        onUpdateRule : function(rule, token, image) {
          image.spriteUrl = '/' + image.spriteUrl + '?' + image.spriteWidth + 'x' + image.spriteHeight;
          updateRule(rule, token, image);
        }
      }
    }),
    assets({
      basePath: conf.assetsPath,
      loadPaths: ['./images/original/', './images/inline/'],
      cachebuster: true
    }),
    autoprefixer({browsers: ['> 1%', 'last 2 versions']}),
    cssnano({
      mergeRules: false
    })
  ];
}

module.exports = function(gulp, $, conf) {

  gulp.task('sass', function () {

    var buildPath = conf.sass2cssPathToBuild;
    if( argv['_'] && argv['_'].length > 0 && argv['_'].includes('watch') ){
        buildPath = conf.stylesPathToBuild;
    }

    return gulp.src(conf.assetsPath + '/sass/**/*.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
         precision: 10
      }).on('error', $.sass.logError))
      .pipe($.postcss(getProcessors(conf)))
      .pipe($.sourcemaps.write('.maps', {
         includeContent : true
      }))
      .pipe(gulp.dest(buildPath));
  });

};