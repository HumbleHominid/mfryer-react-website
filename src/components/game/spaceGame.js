import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';
import BulletPool from './bulletPool';

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
  player = null;
  entities = []; // TODO: probably make a rock pool for these instead
  bulletPool = null;
  tickQueue = [];

  setState(inState) {
    this.state = inState;

    switch (this.state) {
      case SpaceGameState.PLAYING:
        // TODO probably more level logic and stuff in here.
        this.player = createEntity(EntityType.PLAYER, new Position(375, 250));
        this.bulletPool = new BulletPool();

        // Register the player input
        this.player.enableInput();
        this.player.shootHandler = () => this.handlePlayerShoot();

        // Register the tick functions
        this.tickQueue.push(this.player);
        this.tickQueue.push(this.bulletPool);
        break;
      case SpaceGameState.TITLE:
      case SpaceGameState.CONTROLS:
      case SpaceGameState.PAUSED:
      case SpaceGameState.POSTGAME:
      // Fallthrough is intended
      default:
        this.player.disableInput();
        this.player = null;
        this.entities = null;
        this.bulletPool = null;
        this.level = -1;
        this.score = 0;
        this.tickQueue = [];
        break;
    }
  }

  forEachEntity(delegate = (entity) => {}) {
    for (let i = 0; i < this.entities.length; ++i) delegate(this.entities[i]);
  }

  tick(dt) {
    for (let i = 0; i < this.tickQueue.length; ++i) {
      this.tickQueue[i].tick(dt);
    }
  }

  handlePlayerShoot() {
    this.bulletPool.spawnBullet(this.player.position, this.player.facingAngle);
  }
}

export { SpaceGameState };