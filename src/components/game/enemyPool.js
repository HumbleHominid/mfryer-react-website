import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';
import { makeQuadTree } from './quadTree';

export default class EnemyPool {
  pool = null;

  constructor() {
    this.pool = makeQuadTree();
  }

  tick(dt) {
    this.pool.forEach((item) => {
      item.tick(dt);
    });
  }

  spawnEnemy() {
    let enemy = createEntity(EntityType.ENEMY, new Position(Math.random() * 750, Math.random() * 500));
    // TODO: make the starting size actually make sense
    enemy.init(Math.floor(Math.random() * 3));
    this.pool.insert(enemy);
  }

  render(context) {
    this.pool.forEach((item) => {
      item.render(context);
    });
  }
}
