import React from 'react'
import { Rand } from './random'
import { Cell } from './cell'
import { MazeGame } from './mazegame'


  /* Generate the maze using recursive backtracking.
   * Returns a 2D array of Cells
   * https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
   */
  export class MazeGenerator {
    width: any;
    height: any;
    board = Array();
    nextCell: any;
    cell: any;
    constructor(width: any, height: any) {
      //super(width, height);
      this.width = width;
      this.height = height;
      this.board = [];
  
      // generate cells with walls everywhere
      for (let x = 0; x < this.width; x++) {
        this.board.push([]);
        for (let y = 0; y < this.height; y++) {
          this.board[x].push(new Cell(x, y));
        }
      }
  
      let cell = this.randomCell();
      //let nextCell = null;
  
      cell.visited = true;
      let visitedStack = [cell];
  
      while (visitedStack.length > 0) {
        if (this.isDeadEnd(cell.x, cell.y)) {
          cell = visitedStack.pop();
        } else {
          this.nextCell = this.randomNeighbor(cell.x, cell.y);
          this.nextCell.visited = true;
          this.breakWall(cell, this.nextCell);
          visitedStack.push(cell);
          cell = this.nextCell;
        }
      }
    }
  
    getNeighbors(x: number, y: number) {
      var n = Array();
  
      if (y != 0) {
        n.push(this.board[x][y - 1]);
      }
      if (y != this.height - 1) {
        n.push(this.board[x][y + 1]);
      }
      if (x != 0) {
        n.push(this.board[x - 1][y]);
      }
      if (x != this.width - 1) {
        n.push(this.board[x + 1][y]);
      }
  
      return n;
    }
  
    availableNeighbors(x: any, y: any) {
      var list = Array();
      var neighbors = this.getNeighbors(x, y);
      for (let i = 0; i < neighbors.length; i++) {
        if (!neighbors[i].visited) list.push(neighbors[i]);
      }
      return list;
    }
  
    randomNeighbor(x: any, y: any) {
      return Rand.pickRand(this.availableNeighbors(x, y));
    }
  
    randomCell() {
      return this.board[Rand.randomInt(this.width)][Rand.randomInt(this.height)];
    }
  
    breakWall(c1: { x: number; y: number; down: boolean; up: boolean; right: boolean; left: boolean }, c2: { x: number; y: number; up: boolean; down: boolean; left: boolean; right: boolean }) {
      if (c1.x == c2.x) {
        if (c1.y < c2.y) {
          c1.down = false;
          c2.up = false;
        }
        if (c1.y > c2.y) {
          c1.up = false;
          c2.down = false;
        }
      } else if (c1.y == c2.y) {
        if (c1.x < c2.x) {
          c1.right = false;
          c2.left = false;
        }
        if (c1.x > c2.x) {
          c1.left = false;
          c2.right = false;
        }
      }
    }
  
    isDeadEnd(x: number, y: number) {
      var neighbors = this.getNeighbors(x, y);
      for (let i = 0; i < neighbors.length; i++) {
        if (!neighbors[i].visited) return false;
      }
      return true;
    }
  }

