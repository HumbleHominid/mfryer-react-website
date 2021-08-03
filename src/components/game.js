import { Component } from 'react';
import '../styles/game.scss';
import GameCanvas from './game/gameCanvas';
import GameState from './game/gameState';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: new GameState()
    }
  }

  render() {
    return (
      <div>
        <h1 className="display-2">Game</h1>
        <GameCanvas gameState={this.state.gameState} />
      </div>
    );
  }
}