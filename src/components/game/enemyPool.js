import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';
import { makeQuadTree } from './quadTree';
import { MAX_STAGE } from './enemy';

export default class EnemyPool {
  pool = null;

  constructor() {
    this.pool = makeQuadTree();
  }

  tick(dt) { this.pool.tick(dt); }

  spawnEnemy(stage = MAX_STAGE) {
    // TODO: Magic numbers
    let enemy = createEntity(EntityType.ENEMY, new Position(Math.random() * 750, Math.random() * 500));
    enemy.init(stage);
    this.pool.insert(enemy);
  }

  render(context) {
    this.pool.forEach((item) => {
      item.render(context);
    });
  }

  forEach(delegate = () => {}) { if (this.pool) this.pool.forEach(delegate); }
}
