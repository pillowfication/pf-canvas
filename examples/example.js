'use strict';

var $ = require('jquery');
var pfcanvas = require('..');

$(function() {

  pfcanvas('#example-1', function(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 80, 80);
  }, {
    width: '100px',
    height: '100px'
  });

  pfcanvas('#example-2', (function() {
    var PI23 = Math.PI*2/3, PI43 = Math.PI*4/3;
    var color = '#'+('000000'+(16777216*Math.random()|0).toString(16)).slice(-6);
    var size = 50;
    var theta = 0;
    return function(ctx) {
      var width = ctx.canvas.width, height = ctx.canvas.height;
      var centerX = width/2, centerY = height/2;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX + size*Math.cos(theta), centerY + size*Math.sin(theta));
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

  pfcanvas('#example-3', function(ctx) {
    ctx.fillStyle = '#'+('000000'+(16777216*Math.random()|0).toString(16)).slice(-6);
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, {
    width: '100px',
    height: '100px'
  }).click(function() {
    $(this).trigger('draw');
  });

});
