import React from 'react'
import { MazeGenerator } from './MazeGenerator'

export class MazeGameState {
    width: any;
    height: any;
    currentPos: any;
    path: any[];
    startTime: any;
    gameInProgress: boolean;
    start: any;
    end: { x: number; y: number; };
    checkpoint1: { x: number; y: number; };
    checkpoint2: { x: number; y: number; };
    checkpoint3: { x: number; y: number; };
    board = Array();
    constructor(mazeDimensions, startPosition) {
      const [ width, height ] = mazeDimensions;
  
      this.width = width;
      this.height = height;
      this.currentPos = startPosition;
      this.path = [this.currentPos];
      this.startTime = null;
      this.gameInProgress = false;
  
      this.start = startPosition;
      
      this.end = {
        x: this.width - 1,
        y: this.height - 1
      };
  
      //checkpoints 

      this.checkpoint1 = {
        x: Math.floor(Math.random() * (this.width - 2)),
        y: Math.floor(Math.random() * (this.height - 2))
      }
  
  
      this.checkpoint2 = {
        x: Math.floor(Math.random() * (this.width - 2)),
        y: Math.floor(Math.random() * (this.height - 2))
      }
  
      this.checkpoint3 = {
        x: Math.floor(Math.random() * (this.width - 2)),
        y: Math.floor(Math.random() * (this.height - 2))
      }
  
  
  
      this.board = new MazeGenerator(this.width, this.height).board;
    }

    
    getCell(x, y) {
      return this.board[x][y];
    };
  
    isStartCell(cell) {
      if (this.start.x === cell.x && this.start.y === cell.y) return true;
      return false;
    }
  
    isCheckpointCell(cell){
      /*
      if (this.checkpoint1.x === cell.x && this.checkpoint1.y === cell.y) {
        console.log("At the checkpoint1");
        console.log("1 x :" + this.checkpoint1.x + " y :" + this.checkpoint1.y);
        if(key1 === false){
          //alert("At the Checkpoint 1");
          const messageArea = document.getElementById("messageArea");
          //messageArea.innerHTML = ReactDOMServer.renderToStaticMarkup(Example());
          //  const nameForm = new WordForm(null);
          //  ReactDOM.render(nameForm.render(), messageArea);
          key1 = true;
        }
        return;
      }
      else if (this.checkpoint2.x === cell.x && this.checkpoint2.y === cell.y) {
        console.log("At the checkpoint2");
        console.log("2 x :" + this.checkpoint2.x + " y :" + this.checkpoint2.y);
        if(key2 === false){
          //alert("At the checkpoint 2");
          const messageArea = document.getElementById("messageArea");
          //messageArea.innerHTML = ReactDOMServer.renderToStaticMarkup(Example());
          //  const nameForm = new WordForm(null);
          //  ReactDOM.render(nameForm.render(), messageArea);
          key2 = true;
        }
        return;
      }
      else if (this.checkpoint3.x === cell.x && this.checkpoint3.y === cell.y) {
        console.log("At the checkpoint3");
        console.log("3 x :" + this.checkpoint3.x + " y :" + this.checkpoint3.y);
        if(key3 === false){
          //alert("At the checkpoint 3");
          const messageArea = document.getElementById("messageArea");
          //messageArea.innerHTML = ReactDOMServer.renderToStaticMarkup(Example());
          //  const nameForm = new WordForm(null);
          //  ReactDOM.render(nameForm.render(), messageArea);
          key3 = true;
        }
        return;
      }
      console.log("Not checkpoint");
      const messageArea = document.getElementById("messageArea") as HTMLDivElement;
      messageArea.innerHTML = "";
      return false;
      */
    }
  
    isEndCell(cell) {
      if (this.end.x === cell.x && this.end.y === cell.y) return true;
      return false;
    }
  
    isCellInBounds(x, y) {
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        return true;
      }
      return false;
    }
  
    get numSteps() {
      // subtract one to account for the current positon being part of the path
      return this.path.length - 1;
    }
  
    get playTime() {
      if (this.startTime) {
        return (new Date()).getTime() - this.startTime.getTime();
      }
    }
  }