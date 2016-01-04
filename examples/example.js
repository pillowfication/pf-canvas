'use strict';

var $ = require('jquery');
var canvas = require('..');

$(function() {

  // Draw a simple blue square
  canvas('#example-1', function(ctx) {
    // Drawing loop code
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 80, 80);
  }, {
    // Canvas options
    // In this example, CSS was used to set the dimensions
    // width: '100px',
    // height: '100px'
  });

  // Draw a centered, rotating triangle
  canvas('#example-2', (function() {
    // Initialization code
    var PI23 = Math.PI*2/3, PI43 = Math.PI*4/3;
    var color = '#'+('000000'+(16777216*Math.random()|0).toString(16)).slice(-6);
    var size = 50;
    var theta = 0;

    // Loop code
    return function(ctx) {
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
    };
  })(), {
    // Tell the canvas to redraw on every frame
    redraw: 'always',
    // Tell the canvas to resize on window resize
    resize: true
  });

  canvas('#example-3', function(ctx) {
    // Fill the canvas with a random color
    ctx.fillStyle = '#'+('000000'+(16777216*Math.random()|0).toString(16)).slice(-6);
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, {
    // In this example, CSS was used to set the dimensions
    // width: '100px',
    // height: '100px'
  }).click(function() {
    // Trigger the draw event on click
    $(this).trigger('draw');
  });

});
