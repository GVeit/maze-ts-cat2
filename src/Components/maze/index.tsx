import React from 'react'
import { MazeGameState } from './mazegamestate'
import { MazeUi } from './mazeui'
import App from '../../App';



class MazeGame extends React.Component {
    offsets: { left: { x: number; y: number; }; up: { x: number; y: number; }; right: { x: number; y: number; }; down: { x: number; y: number; }; };
    options: any;
    state: MazeGameState | undefined;
    ui: MazeUi | undefined;

    constructor(canvas, options) {
  
      super(canvas, options);
      this.offsets = {
        "left"  : { x: -1, y: 0 },
        "up"  : { x: 0, y:  -1 },
        "right" : { x: 1, y: 0 },
        "down"  : { x: 0, y: 1 }
      };
  
      //this.options = $.extend({}, defaultOptions, options);
  
      //this.state = new MazeGameState(this.options.dimensions, this.options.startPosition);
      //this.ui = new MazeUi(this.state, options.ui, canvas);
      //this.ui.center();
  
      this.start();
    }
  
    start() {
      this.state.gameInProgress = true;
      this.state.startTime = new Date();
    }
  
    move(direction) {
      var newPos = {
        x: this.state.currentPos.x + this.offsets[direction].x,
        y: this.state.currentPos.y + this.offsets[direction].y
      };
      if (this.state.gameInProgress && this.state.isCellInBounds(newPos.x, newPos.y)) {
        if (this.state.getCell(this.state.currentPos.x, this.state.currentPos.y)[direction] === false) {
          this.state.path.push(newPos);
          this.state.currentPos = newPos;
          this.ui.update()
          if (this.state.isEndCell(newPos)) {
            /*if(key1 === true && key2 === true && key3 === true){
              this.onGameEnd();
            }
            else{
              alert("Need to get all keys before exit the game");
            }*/
          }
          /*
          if (this.state.isCheckpointCell(newPos)) {
            console.log("On Checkpoint");
          }
          */
        }
      }
    }
  
    onGameEnd() {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.gameInProgress = false;
      /*clearInterval(App.timer);
      //App.center($("#options").show());
      //reset all keys
      key1 = false;
      key2 = false;
      key3 = false;
      */
    }
    
    render() {

          function startTick() {
          if (App.timer) {
              clearInterval(App.timer);
          }
          App.timer = setInterval(tick, 100);
          }

          function tick() {
          App.mazeGame.ui.drawTimer();
          }

          function pass_function(){
          alert('42');
          }
          

          return (
              <>
              <div className="grid-container">
                  <canvas id="maze">Sorry your browser doesn't support the canvas element. Try upgrading your browser.</canvas>
                  <div id="messageArea"></div>
                  <div className="a">
                      <div id="time"></div>
                      <div id="steps"></div>
                      <h1><span> <a href="#options"></a></span></h1>
                  </div>

                  <div className="options">
                      <form>
                      <label htmlFor="w">Width</label>
                      <label htmlFor="h">Height</label>
                      <input id="w" type="number" min="2" step="1" defaultValue="7" />
                      by
                      <input id="h" type="number" min="2" step="1" defaultValue="7" />
                      <button type="submit">Generate New Maze</button>
                      </form>
                  </div>
              </div>
              </>
          );
      }

      componentDidMount() {
          
      }

      componentWillUnmount() {

      }

  }


export default MazeGame;