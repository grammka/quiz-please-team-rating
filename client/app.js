var header      = document.getElementById('header');
var sidebar     = document.getElementById('sidebar');
var container   = document.getElementById('container');
var content     = document.getElementById('content');


container.onscroll = function() {
  var top   = container.scrollTop;
  var left  = container.scrollLeft;

  sidebar.style.marginTop = -top + 'px';
  header.style.marginLeft = -left + 'px';
};
