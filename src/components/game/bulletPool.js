import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';
import EntityConfig from './entityConfig';
import { makeQuadTree } from './quadTree';

export default class BulletPool {
  pool = null;

  get hasEntries() { return this.pool && this.pool.numEntries > 0; }

  constructor() {
    this.pool = makeQuadTree();
  }

  tick(dt) { this.pool.tick(dt); }

  spawnBullet(position, facingAngle) {
    const playerConfig = EntityConfig[EntityType.PLAYER];
    let adjustedAngle = facingAngle - (1/2 * Math.PI);
    let bulletNudgeX = Math.cos(adjustedAngle) * (playerConfig.width / 2);
    let bulletNudgeY = Math.sin(adjustedAngle) * (playerConfig.height / 2);
    let bulletInitialPosition = new Position(position.x + bulletNudgeX, position.y + bulletNudgeY);

    let bullet = createEntity(EntityType.BULLET, bulletInitialPosition);
    bullet.init(facingAngle);
    this.pool.insert(bullet);
  }

  render(context) {
    this.pool.forEach((item) => {
      item.render(context);
    });
  }

  forEach(delegate = () => {}) { if (this.pool) this.pool.forEach(delegate); }
}