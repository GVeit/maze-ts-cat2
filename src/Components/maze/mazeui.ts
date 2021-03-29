import React from 'react'

export class MazeUi {
    canvas: any;
    ctx: any;
    state: any;
    options: any;
    constructor(state, options, canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.state = state;
  
      let defaultOptions = {
        colors: {
          walls: "#282929",
          curPosition: "#8e44ad",
          finish: "#63efff",
          checkpoint1: "#1abc9c",
          checkpoint2: "#e74c3c",
          checkpoint3: "#f39c12",
          visitedBlock: "#fff"
        },
        offset: {x: 0, y: 0}, // top left corner where the maze is actually drawn
        scale: 26,
        curIndicatorDiameter: 4,
        pathWidth: 8,
      }
  
      // TODO: don't use jQuery here
      this.options = $.extend({}, defaultOptions, options);
    }
  
    update() {
      this.clear();
      this.drawPath();
      this.drawMaze();
      this.drawSteps()
      this.drawTimer()
    }
  

    
    center() {
      let $body = $('body');
      this.canvas.width = $body.width();
      this.canvas.height = $body.height();
  
      this.options.offset.x = Math.floor((this.canvas.width / 2) - (this.state.width * this.options.scale / 2));
      this.options.offset.y = Math.floor((this.canvas.height / 2) - (this.state.height * this.options.scale / 2));
      $("#a").width(this.state.width * this.options.scale + 3).css('padding-top', (this.canvas.height / 2) - (this.state.height * this.options.scale / 2));

      if(typeof $ !== 'undefined') {
        console.log("Undefined");
      }
      //$("#a").width(this.state.width * this.options.scale + 3).css('padding-top', (this.canvas.height / 2) - (this.state.height * this.options.scale / 2) - $('h1').height());
      $("#time, #steps").css('margin-top', this.state.height * this.options.scale);
      this.update();
    }
    
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawSteps() {
      $("#steps").html(this.state.numSteps + " step" + (App.steps !== 1 ? "s" : ""));
    }
  
    drawTimer() {
      let playTimeSeconds = Math.floor((this.state.playTime || 0) / 1000)
      $("#time").html(playTimeSeconds + " second" + (playTimeSeconds !== 1 ? "s" : ""));
    }
  
    drawPath() {
      this.ctx.lineWidth = this.options.pathWidth;
      this.ctx.strokeStyle = this.options.colors.visitedBlock;
      this.ctx.beginPath();
      this.ctx.moveTo(this.options.offset.x + 0.5 * this.options.scale, 0);
      for (let i = 0; i < this.state.path.length - 1; i++) {
        let pathPosition = this.state.path[i];
        this.ctx.lineTo(this.options.offset.x + (pathPosition.x + 0.5) * this.options.scale, this.options.offset.y + (pathPosition.y + 0.5) * this.options.scale);
      }
      this.ctx.lineTo(this.options.offset.x + (this.state.currentPos.x + 0.5) * this.options.scale, this.options.offset.y + (this.state.currentPos.y + 0.5) * this.options.scale);
      this.ctx.stroke();
      this.circle(this.state.currentPos.x, this.state.currentPos.y, this.options.colors.curPosition);
  
      
    }
  
    drawMaze() {
      this.circle(this.state.end.x, this.state.end.y, this.options.colors.finish);
  
      this.circle(this.state.checkpoint1.x, this.state.checkpoint1.y, this.options.colors.checkpoint1);
      console.log("1 x :" + this.state.checkpoint1.x + " y :" + this.state.checkpoint1.y);
      this.circle(this.state.checkpoint2.x, this.state.checkpoint2.y, this.options.colors.checkpoint2);
      console.log("2 x :" + this.state.checkpoint2.x + " y :" + this.state.checkpoint2.y);
      this.circle(this.state.checkpoint3.x, this.state.checkpoint3.y, this.options.colors.checkpoint3);
      console.log("3 x :" + this.state.checkpoint3.x + " y :" + this.state.checkpoint3.y);
  
      for (let x = 0; x < this.state.width; x++) {
        for (let y = 0; y < this.state.height; y++) {
          let cell = this.state.getCell(x, y);
          this.drawCell(cell);
        }
      }
    }
  
    drawCell(cell) {
      var originx = cell.x * this.options.scale;
      var originy = cell.y * this.options.scale;
      if (cell.up && !this.state.isStartCell(cell)) this.line(originx, originy, originx + this.options.scale, originy);
      if (cell.down && !this.state.isEndCell(cell)) this.line(originx, originy + this.options.scale, originx + this.options.scale, originy + this.options.scale);
      if (cell.right) this.line(originx + this.options.scale, originy, originx + this.options.scale, originy + this.options.scale);
      if (cell.left) this.line(originx, originy, originx, originy + this.options.scale);
    }
  
    line(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.options.colors.walls;
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.options.offset.x + x1 + 1, this.options.offset.y + y1 + 1);
      this.ctx.lineTo(this.options.offset.x + x2 + 1, this.options.offset.y + y2 + 1);
      this.ctx.stroke();
    }
  
    circle(x, y, color) {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(this.options.offset.x + (x + 0.5) * this.options.scale, this.options.offset.y + (y + 0.5) * this.options.scale, this.options.curIndicatorDiameter, 0, Math.PI*2, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

