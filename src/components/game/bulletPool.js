import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';
import EntityConfig from './entityConfig';

export default class BulletPool {
  pool = null;

  constructor() {
    // TODO: This should be nested arrays that split the space into 16 spaces. However, JS is running into some memory issues when I try to do that and I'm not sure why. Since arrays are all references, I suspect that references aren't getting cleaned up and causing mem leaks. Obviously, this is undesirable. Moreover, the memleaks compound and cause the system to run out of memory very quickly. Although this current implementation is inefficent, it is preferable in the short term to running out of memory.
    this.pool = [];
  }

  tick(dt) {
    for (let i = 0; i > -1 && i < this.pool.length; ++i) {
      let bullet = this.pool[i];
      bullet.tick(dt);

      // Remove swap hack thing
      if (!bullet.isAlive) {
        let newLength = this.pool.length - 1;
        this.pool[i] = this.pool[newLength];
        this.pool.length = newLength;
        --i;
      }
    }
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
    for (let i = 0; i < this.pool.length; ++i) {
      this.pool[i].render(context);
    }
  }
}