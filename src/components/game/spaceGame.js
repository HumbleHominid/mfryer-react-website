import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';
import BulletPool from './bulletPool';
import EnemyPool from './enemyPool';

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
  enemyPool = null;
  bulletPool = null;
  tickQueue = [];

  // Sets the level of the game
  setLevel(level) {
    if (this.enemyPool === null) return;

    let enemyCount = 10;
    for (let i = 0; i < enemyCount; ++i) this.enemyPool.spawnEnemy();
  }

  setState(inState) {
    this.state = inState;

    switch (this.state) {
      case SpaceGameState.PLAYING:
        this.player = createEntity(EntityType.PLAYER, new Position(375, 250));
        this.enemyPool = new EnemyPool();
        this.bulletPool = new BulletPool();

        // Register the player input
        this.player.enableInput();
        this.player.shootHandler = () => this.handlePlayerShoot();

        // Register the tick functions
        this.tickQueue.push(this.player);
        this.tickQueue.push(this.bulletPool);
        this.tickQueue.push(this.enemyPool);

        this.setLevel(1);
        break;
      case SpaceGameState.TITLE:
      case SpaceGameState.CONTROLS:
      case SpaceGameState.PAUSED:
      case SpaceGameState.POSTGAME:
      // Fallthrough is intended
      default:
        if (this.player) this.player.disableInput();
        this.player = null;
        this.bulletPool = null;
        this.enemyPool = null;
        this.level = -1;
        this.score = 0;
        this.tickQueue = [];
        break;
    }
  }

  renderEntities(context) {
    if (this.player) this.player.render(context);
    if (this.bulletPool) this.bulletPool.pool.forEach((bullet) => { bullet.render(context); });
    if (this.enemyPool) this.enemyPool.pool.forEach((enemy) => { enemy.render(context); });
  }

  tick(dt) {
    for (let i = 0; i < this.tickQueue.length; ++i) this.tickQueue[i].tick(dt);
  }

  handlePlayerShoot() {
    this.bulletPool.spawnBullet(this.player.position, this.player.facingAngle);
  }
}

export { SpaceGameState };