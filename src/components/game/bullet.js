import Entity from './entity';
import { EntityType } from './entityType';
import Position from './position';
import getSprite from './spritePool';

const BULLET_VEL = 150; // dist/ second
const BULLET_LIFETIME = (0.8 * 500) / BULLET_VEL; // TODO: Magic number

export default class Bullet extends Entity {
  lifetime = BULLET_LIFETIME;
  constructor(position) {
    super(EntityType.BULLET, position);
  }
  
  init(facingAngle) {
    this.facingAngle = facingAngle;
    const adjustedAngle = this.facingAngle - (1/2 * Math.PI);
    const cosAng = Math.cos(adjustedAngle);
    const sinAng = Math.sin(adjustedAngle);

    this.velX = cosAng * BULLET_VEL;
    this.velY = sinAng * BULLET_VEL;
  }

  get isAlive() {
    return this.lifetime > 0;
  }

  tick(dt) {
    const dtSeconds = dt / 1000;
    let deltaX = (this.velX * dtSeconds);
    let deltaY = (this.velY * dtSeconds);

    let newPos = new Position(
        this.position.x + deltaX,
        this.position.y + deltaY,
    );
    
    this.position = newPos;
    
    // TODO: Magic numbers
    if (this.position.x > 750) this.position.x -= 750;
    else if (this.position.x < 0) this.position.x += 750;
    if (this.position.y > 500) this.position.y -= 500;
    else if (this.position.y < 0) this.position.y += 500;

    this.lifetime -= dtSeconds;
  }

  render(context) {
    context.save();
    
    const image = getSprite(this.type);
    const width = this.size.width;
    const height = this.size.height;
    
    context.translate(
      this.position.x,
      this.position.y);

    context.rotate(this.facingAngle);

    context.drawImage(image,
        -(width / 2),
        -(height / 2),
        width,
        height);
    
    context.restore();
  }
}