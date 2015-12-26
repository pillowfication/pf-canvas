'use strict';

var $ = require('jquery');

module.exports = function(elem, draw, options) {
  var $elem = $(elem);
  options = $.extend({
    id: null,
    class: null,
    width: null,
    height: null,
    redraw: 'never', // never, always, resize
    resize: false
  }, options);

  $elem.each(function() {
    var $this = $(this);

    // Size the container
    $this.css({overflow: 'hidden'});
    if (options.width)
      $this.css('width', options.width);
    if (options.height)
      $this.css('height', options.height);

    // Create the canvas and context
    var canvas = document.createElement('canvas');
    $(canvas).css({position: 'absolute'});
    if (options.id)
      canvas.id = options.id;
    if (options.class)
      canvas.className = options.class;
    var context = canvas.getContext('2d');

    // Resize the canvas to match the container
    function size() {
      canvas.width = $this.innerWidth();
      canvas.height = $this.innerHeight();
    }
    size();

    // Bind function on window resize
    if (options.resize)
      $(window).resize(size);
    if (options.redraw === 'resize')
      $(window).resize(function() {
        draw(context);
      });

    // Loop the drawing function
    if (options.redraw === 'always')
      (function run() {
        draw(context);
        requestAnimationFrame(run);
      })();
    else
      draw(context);

    // Add the draw event
    $this.on('draw', function() {
      draw(context);
    });

    $this.prepend(canvas);
  });

  return $elem;
};
