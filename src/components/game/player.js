import Entity from './entity'
import { EntityType } from './entityType';
import getSprite from './spritePool';

const MAX_VEL = 100; // Max vel calculated as |<velX, velY>| units/s. TODO: Magic number (canvas width)
const MAX_VEL_SQUARED = MAX_VEL * MAX_VEL;
const VEL_STEP = MAX_VEL * 0.03; // units/s. Lower numbers are "more floaty"
const ROTATION_SPEED = Math.PI * (3/2); // In radians/s

const INPUT_MAP = {
  'FORWARD': 'ArrowUp',
  'ROTATE_RIGHT': 'ArrowRight',
  'ROTATE_LEFT': 'ArrowLeft',
  'SHOOT': 'Space',
  'PAUSE': 'Escape',
}

export default class Player extends Entity {
  lives = 3;

  velX = 0;
  velY = 0;

  facingAngle = 0; // North (Up)

  inputs = { };

  constructor(position = null) {
    if (position === null) super(EntityType.PLAYER);
    else super(EntityType.PLAYER, position);

    // TODO: This should be handled by the outside
    this.registerInput();
  }

  registerInput() {
    // TODO: Special-case pause to go right away
    document.addEventListener("keydown", (e) => this.inputs[e.code] = true);
    document.addEventListener("keyup", (e) => this.inputs[e.code] = false);
  }

  deregisterInput() {
    document.removeEventListener("keydown", (e) => this.inputs[e.code] = true);
    document.removeEventListener("keyup", (e) => this.inputs[e.code] = false);
  }

  adjustRotation() {
    const dubPi = 2*Math.PI;
    if (this.facingAngle < 0) this.facingAngle += dubPi;
    if (this.facingAngle > dubPi) this.facingAngle -= dubPi;
  }

  tick(dt) {
    const dtSeconds = dt / 1000;
    // Process the input
    if (this.inputs[INPUT_MAP.FORWARD]) {
      // The canvas and the image are off by 90* so we have to adjust it here.
      const adjustedAngle = this.facingAngle - (1/2 * Math.PI);
      const cosAng = Math.cos(adjustedAngle);
      const sinAng = Math.sin(adjustedAngle);
      const changeX = cosAng * VEL_STEP;
      const changeY = sinAng * VEL_STEP;

      this.velX += changeX;
      this.velY += changeY;

      const vel = this.velX * this.velX + this.velY * this.velY;
      if (vel > MAX_VEL_SQUARED) {
        // If we are now going too fast, roll back the change.
        // This is arguably "not correct" but it makes the game more floaty and fun IMO
        this.velX -= changeX;
        this.velY -= changeY;
      }
    }
    if (this.inputs[INPUT_MAP.ROTATE_RIGHT]) {
      this.facingAngle += ROTATION_SPEED * dtSeconds;
      this.adjustRotation();
    }
    if (this.inputs[INPUT_MAP.ROTATE_LEFT]) {
      this.facingAngle -= ROTATION_SPEED * dtSeconds;
      this.adjustRotation();
    }
    if (this.inputs[INPUT_MAP.SHOOT]) {
      console.log('pew');
    }

    this.position.x += this.velX * dtSeconds;
    this.position.y += this.velY * dtSeconds;
    
    // TODO: Magic numbers
    if (this.position.x > 750) this.position.x -= 750;
    if (this.position.x < 0) this.position.x += 750;
    if (this.position.y > 500) this.position.y -= 500;
    if (this.position.y < 0) this.position.y += 500;
  }

  render(context)  {
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