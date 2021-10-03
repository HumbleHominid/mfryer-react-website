import Entity from './entity'
import { EntityType } from './entityType';
import Position from './position';
import getSprite from './spritePool';

// Absolute values of the min/max rotation speed in radians/s
const MIN_ROTATION_SPEED = 1/4 * Math.PI;
const MAX_ROTATION_SPEED = Math.PI;

// Total velocity, not per component, in units/s
const MIN_SPEED = 10;
const MAX_SPEED = 100;

const ENEMY_SCALE = [ 0.5, 0.8, 1.0 ];

const MAX_STAGE = ENEMY_SCALE.length - 1;

export default class Enemy extends Entity {
  constructor(position = null) {
    if (position === null) super(EntityType.ENEMY);
    else super(EntityType.ENEMY, position);
  }

  init(stage = MAX_STAGE) {
    this.stage = stage;
    this.facingAngle = Math.random() * (2 * Math.PI);
    let totalVel = (Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED;

    const cosAng = Math.cos(this.facingAngle);
    const sinAng = Math.sin(this.facingAngle);

    this.velX = cosAng * totalVel;
    this.velY = sinAng * totalVel;

    this.rotationAngle = Math.random() * (2 * Math.PI);
    this.rotationSpeed = (Math.random() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED)) + MIN_ROTATION_SPEED;
    this.rotationSpeed *= Math.random() < 0.5 ? 1 : -1;
  }

  get isAlive() { return this.stage > -1; }

  tick(dt) {
    const dtSeconds = dt / 1000;
    let deltaX = (this.velX * dtSeconds);
    let deltaY = (this.velY * dtSeconds);

    let newPos = new Position(
        this.position.x + deltaX,
        this.position.y + deltaY,
    );

    // TODO: Magic numbers
    if (newPos.x > 750) newPos.x -= 750;
    else if (newPos.x < 0) newPos.x += 750;
    if (newPos.y > 500) newPos.y -= 500;
    else if (newPos.y < 0) newPos.y += 500;

    this.position = newPos;

    const twoPi = 2 * Math.PI;
    this.rotationAngle += (this.rotationSpeed * dtSeconds);

    if (this.rotationAngle > twoPi) this.rotationAngle -= twoPi;
    else if (this.rotationAngle < 0) this.rotationAngle += twoPi;
  }

  render(context) {
    context.save();

    const image = getSprite(this.type);
    const width = this.size.width * ENEMY_SCALE[this.stage];
    const height = this.size.height * ENEMY_SCALE[this.stage];

    context.translate(
      this.position.x,
      this.position.y);

    context.rotate(this.rotationAngle);

    context.drawImage(image,
        -(width / 2),
        -(height / 2),
        width,
        height);

    context.restore();
  }
}

export { MAX_STAGE };