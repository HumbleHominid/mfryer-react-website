import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';
import EntityConfig from './entityConfig';

export default class BulletPool {
  pool = null;

  get hasEntries() { return this.pool && this.pool.length > 0; }

  constructor() {
    this.pool = [];
  }

  tick(dt) {
    // tick all the bullets
    this.pool.forEach((bullet) => bullet.tick(dt));

    // remove all bullets that have expired their lifetime
    this.pool = this.pool.filter((bullet) => bullet.isAlive);
  }

  spawnBullet(position, facingAngle) {
    const playerConfig = EntityConfig[EntityType.PLAYER];
    let adjustedAngle = facingAngle - (1/2 * Math.PI);
    let bulletNudgeX = Math.cos(adjustedAngle) * (playerConfig.width / 2);
    let bulletNudgeY = Math.sin(adjustedAngle) * (playerConfig.height / 2);
    let bulletInitialPosition = new Position(position.x + bulletNudgeX, position.y + bulletNudgeY);

    let bullet = createEntity(EntityType.BULLET, bulletInitialPosition);
    bullet.init(facingAngle);
    this.pool.push(bullet);
  }

  render(context) {
    this.pool.forEach((item) => {
      item.render(context);
    });
  }

  forEach(delegate = () => {}) { if (this.pool) this.pool.forEach(delegate); }
}