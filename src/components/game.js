import { Component } from 'react';
import '../styles/game.scss';
import GameCanvas from './game/gameCanvas';
import SpaceGame from './game/spaceGame';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceGame: new SpaceGame()
    }
  }

  render() {
    return (
      <div>
        <h1 className="display-2">Game</h1>
        <GameCanvas gameState={this.state.spaceGame} />
      </div>
    );
  }
}