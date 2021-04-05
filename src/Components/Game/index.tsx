import React from 'react'
import Maze from '../Maze'


class Game extends React.Component {

    render() {
        return (
            <div className="mazeGame">  <Maze state={undefined} /> </div>
        )
    }
}


export default Game;