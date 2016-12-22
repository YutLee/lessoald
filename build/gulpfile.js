var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins')();
var config = require('./gulp/config')();

function registerTask(taskModule) {
  require('./gulp/' + taskModule)(gulp, gulpLoadPlugins, config);
}

var aTask = ['clean', 'image', 'style', 'script', 'watch', 'build'];

aTask.map(function(task) {
  registerTask(task);
});