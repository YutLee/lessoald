var rule = {};

for(let i=1; i <= 100; i++){
  rule['regions-' + i] = {
    desc: '获取地区数据',
    version: 'v1',
    uri: 'regions'
  };
}

module.exports = rule;