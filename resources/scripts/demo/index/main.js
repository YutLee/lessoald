require('../common/public');
require('./a');

require.ensure(['./b'], function(require){
   setTimeout(function(){
     require('./b').changeText()
   }, 2000);
});