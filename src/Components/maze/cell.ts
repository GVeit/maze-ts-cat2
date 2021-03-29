import React from 'react'

export class Cell {
    visited: boolean;
    up: boolean;
    right: boolean;
    down: boolean;
    left: boolean;
    x: any;
    y: any;
    constructor(x: number, y: number) {
      this.visited = false;
      this.up = true;
      this.right = true;
      this.down = true;
      this.left = true;
      this.x = x;
      this.y = y;
    }
  }