import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';

const SpaceGameState = {
  'TITLE': 'title',
  'CONTROLS': 'controls',
  'PLAYING': 'playing',
  'PAUSED': 'paused',
  'POSTGAME': 'postgame',
};

export default class SpaceGame {
  state = SpaceGameState.TITLE;
  score = 0;
  level = -1;
  player = createEntity(EntityType.PLAYER, new Position(375, 250));
  entities = [
    createEntity(EntityType.ENEMY, new Position(Math.random() * 750, Math.random() * 500)),
    createEntity(EntityType.ENEMY, new Position(Math.random() * 750, Math.random() * 500)),
  ];

  forEachEntity(delegate = (entity) => {}) {
    for (let i = 0; i < this.entities.length; ++i) delegate(this.entities[i]);
  }

  tick(dt) {
    // handle player tick
    this.player.tick(dt);
  }
}

export { SpaceGameState };