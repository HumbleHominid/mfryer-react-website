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

// iterative is faster but this isn't run much so meh
function fib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fib(n - 2) + fib(n - 1);
}

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

    // We use fibonacci for levels so it gets real hard real fast
    // start from level+1 as fib(1) == fib(2)
    let enemyCount = fib(level + 1);
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
    if (this.bulletPool) this.bulletPool.forEach((bullet) => { bullet.render(context); });
    if (this.enemyPool) this.enemyPool.forEach((enemy) => { enemy.render(context); });
  }

  tick(dt) {
    // Update all the entities
    for (let i = 0; i < this.tickQueue.length; ++i) this.tickQueue[i].tick(dt);
  }

  handlePlayerShoot() {
    this.bulletPool.spawnBullet(this.player.position, this.player.facingAngle);
  }
}

export { SpaceGameState };