var path = require('path');

module.exports = function() {

  var resourcesPath = path.resolve(__dirname, '../../resources');
  var publicPath = path.resolve(__dirname, '../../public');

  var config = {
    assetsPath: resourcesPath,
    publicPath: publicPath,
    imagesPathToBuild: path.resolve(publicPath, './images'),
    stylesPathToBuild: path.resolve(publicPath, './styles'),
    sass2cssPathToBuild: path.resolve(publicPath, './sass2css'),
    revPathToBuild: path.resolve(publicPath, './rev'),
    scriptsPathToBuild: path.resolve(publicPath, './scripts'),
    webpackJsPathToBuild: path.resolve(publicPath, './webpackjs'),
    viewsPathToBuild: path.resolve(resourcesPath, '../viewsBuild')
  };

  return config;

};