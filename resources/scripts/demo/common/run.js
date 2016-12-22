var aStyle = [
  'width:0',
  'height:8px',
  'background-color:#000',
  'overflow:hidden',
  'position:absolute',
  'left:0',
  'bottom:0',
  'opacity:.6'
];

var $footer = $('<div style="' + aStyle.join(';') + '"></div>').appendTo('body');

$footer.animate({
  'width' : $(window).width(),
  'opacity' : 1
}, 1500);