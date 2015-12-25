# pfcanvas

**Simple jQuery canvas utility** - This is a little tool that takes a DOM element and a drawing function to create a canvas.

## Examples

First require the module to use it. I suggest using jQuery, too.
```javascript
var pfcanvas = require('pf-canvas');
var $ = require('jquery');
```

Use the module to draw a static image.
```javascript
$(function() {
  // Draw a simple blue square
  pfcanvas('#example-1', function(ctx) {
    // Drawing loop code
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 80, 80);
  }, {
    // Canvas options
    // You can also set the size of `#example-1` through CSS and not use this
    width: '100px',
    height: '100px'
  });
});
```

Use the module to draw an animated image which works by looping over the drawing function.
```javascript
$(function() {
  // Draw a centered, rotating triangle
  var PI23 = Math.PI*2/3, PI43 = Math.PI*4/3;
  var color = '#'+('000000'+(16777216*Math.random()|0).toString(16)).slice(-6);
  var size = 50;
  var theta = 0;

  pfcanvas('#example-2', function(ctx) {
    // Clear the canvas
    var width = ctx.canvas.width, height = ctx.canvas.height;
    var centerX = width/2,        centerY = height/2;
    ctx.clearRect(0, 0, width, height);

    // Draw the triangle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX + size*Math.cos(theta),      centerY + size*Math.sin(theta));
    ctx.lineTo(centerX + size*Math.cos(theta+PI23), centerY + size*Math.sin(theta+PI23));
    ctx.lineTo(centerX + size*Math.cos(theta+PI43), centerY + size*Math.sin(theta+PI43));
    ctx.closePath();
    ctx.fill();

    // Rotate the triangle every frame
    theta += .03;
  }, {
    // Tell the canvas to redraw on every frame
    redraw: 'always',
    // Tell the canvas to resize on window resize
    resize: true
  });
});
```

Often times the drawing function needs its own variables such as `color`, `size`, and `theta` in the example above.
To scope those variables properly, I prefer to rewrite the above as follows
```javascript
$(function() {
  var PI23 = Math.PI*2/3, PI43 = Math.PI*4/3;

  pfcanvas('#example-2', (function() {
    // Initialization code
    var color = '#'+('000000'+(16777216*Math.random()|0).toString(16)).slice(-6);
    var size = 50;
    var theta = 0;

    // Loop code
    return function(ctx) {
      var width = ctx.canvas.width, height = ctx.canvas.height;
      var centerX = width/2,        centerY = height/2;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX + size*Math.cos(theta),      centerY + size*Math.sin(theta));
      ctx.lineTo(centerX + size*Math.cos(theta+PI23), centerY + size*Math.sin(theta+PI23));
      ctx.lineTo(centerX + size*Math.cos(theta+PI43), centerY + size*Math.sin(theta+PI43));
      ctx.closePath();
      ctx.fill();
      theta += .03;
    };
  })(), {
    redraw: 'always',
    resize: true
  });
});
```

The element passed is also returned with a `'draw'` event that can be used to manually redraw the canvas.
```javascript
$(function() {
  pfcanvas('#example-3', function(ctx) {
    // Fill the canvas with a random color
    ctx.fillStyle = '#'+('000000'+(16777216*Math.random()|0).toString(16)).slice(-6);
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, {
    width: '100px',
    height: '100px'
  }).click(function() {
    // Trigger the draw event on click
    $(this).trigger('draw');
  });
});
```

View these examples in `examples/index.html`.

## API

### pfcanvas(elem, draw, options)

 * **elem** (DOM, jQuery, Array, String) - The element to turn into a canvas

`elem` will be passed through jQuery's `jQuery()` function to transform it into a jQuery object. Thus it can be a DOM element, a jQuery object, an array of such, a CSS selector string, or HTML string. (See http://api.jquery.com/jQuery/)

 * **draw** (Function) - The drawing function to be looped

`draw` is a function with signature `function(ctx)` and `ctx` being the canvas's `CanvasRenderingContext2D`. To get the canvas's width and height, you may use `ctx.canvas.width` and `ctx.canvas.height`.

 * **options** (Object) - *Optional*. An object of options
   * **id** (String) - Default: `null`. An id to give the canvas element
   * **class** (String) - Default: `null`. A class to give the canvas element
   * **width** (String) - Default: `null`. Set the width of both `elem` and the canvas
   * **height** (String) - Default: `null`. Set the height of both `elem` and the canvas
   * **redraw** (String) - Default: `'never'`. Determine when to call the `draw` function
   * **resize** (Boolean) - Default: `false`. Determine when the canvas is resized

`redraw` is one of `'never'`, `'always'`, `'resize'`. If set to `'never'`, `draw` is only called once upon initialization. If set to `always`, `draw` is called constantly according to `requestAnimationFrame()`. If set to `'resize'`, `draw` is called when the window is resized.

`resize` will update the canvas object to match the dimensions of `elem` on window resize, if set to true. Note that even if the dimensions of the canvas do not change, a resize will cause the canvas to clear.

 * **returns** (jQuery) - The jQuery wrapped `elem` variable
