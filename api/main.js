var fs = require('fs');
var path = require('path');
var lodash_object = require('lodash/object');
var lodash_array = require('lodash/array');

// 加载接口配置文件
var sources = [];
var aKey = [];
var files = fs.readdirSync( path.resolve(__dirname, './section') );
files.forEach(function(val) {
  if(path.extname(val) == '.js'){
    let targetModule = require('./section/' + val);
    aKey = aKey.concat(Object.keys(targetModule));
    sources.push(targetModule);
  }
});

// 检测是否有重复的 key
if( aKey.length != lodash_array.uniq(aKey).length ) {
  aKey.sort();
  let duplicateValues = aKey.filter( function(v,i,o){if(i>=0 && v===o[i-1]) return v;}).join(', ');
  throw new Error('Rule Key Has Repeat : ' + duplicateValues);
}

var rule = {
  requestOpt: {
    version: 'v1',
    baseUrl: 'http://api.lessoald.cn/',
    headers: {
      Accept: 'application/x.lessocloud.v1+json'
    },
    json: true
  },
  interfaces: {}
};
rule.interfaces = lodash_object.merge({}, ...sources);

module.exports = rule;