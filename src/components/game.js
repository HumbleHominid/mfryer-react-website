import React, { Component } from 'react';
import '../styles/game.scss';
import GameCanvas from './game/gameCanvas';
import SpaceGame from './game/spaceGame';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frameCount: 0
    }
    this.spaceGame = new SpaceGame();
  }

  componentDidMount() {
    let el = document.getElementById('gameCanvasContainer');
    let bottom = el.offsetTop + el.offsetHeight;
    let right = el.offsetLeft + el.offsetWidth;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    if (right > clientWidth) {
      let calculatedWidth = clientWidth * 0.8;
      document.getElementById('gameCanvas').style.width = `${calculatedWidth}px`;
    }
    else if (bottom > clientHeight) {
      let calculatedHeight = clientHeight * 0.8;
      document.getElementById('gameCanvas').style.height = `${calculatedHeight}px`;
    }

    setInterval(() => this.loop(), 1000 / 30); // render at 30fps
  }

  render() {
    return (
      <div>
        <h1 className="display-2">Game</h1>
        <div id="gameCanvasContainer">
          <GameCanvas spaceGame={this.spaceGame} frame={this.state.frameCount} />
        </div>
      </div>
    );
  }

  loop() {
    const newFrameCount = this.state.frameCount + 1;
    this.spaceGame.score = Math.floor(newFrameCount / 10);

  
    this.setState({
      frameCount: newFrameCount
    });
  }
}