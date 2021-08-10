import Entity from './entity'
import { EntityType } from './entityType';
import getSprite from './spritePool';

const MAX_VEL = 10; // Max vel calculated as sqrt(velX**2 + velY**2)
const VEL_STEP = MAX_VEL * 0.1;
const ROTATION_SPEED = 0.17; // In radians

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

  inputEvent = null;

  constructor(position = null) {
    if (position === null) super(EntityType.PLAYER);
    else super(EntityType.PLAYER, position);

    // TODO: This should be handled by the outside
    this.registerInput();
  }

  registerInput() {
    document.addEventListener("keydown", (e) => this.inputEvent = e.code);
  }

  deregisterInput() {
    document.removeEventListener("keydown", (e) => this.inputEvent = e.code);
  }

  adjustRotation() {
    const dubPi = 2*Math.PI;
    if (this.facingAngle < 0) this.facingAngle += dubPi;
    if (this.facingAngle > dubPi) this.facingAngle -= dubPi;
  }

  tick(dt) {
    // Process the input
    if (this.inputEvent !== null) {
      switch (this.inputEvent) {
        case INPUT_MAP.FORWARD:
          const adjustedAngle = this.facingAngle - (1/2 * Math.PI);
          const cosAng = Math.cos(adjustedAngle);
          const sinAng = Math.sin(adjustedAngle);
          const changeX = cosAng * VEL_STEP;
          const changeY = sinAng * VEL_STEP;

          this.velX  += changeX;
          this.velY += changeY;

          const maxX = cosAng * MAX_VEL;
          const maxY = sinAng * MAX_VEL;

          // This can cause bad flips in speed when going 90*. fix later
          if (Math.abs(maxX) < Math.abs(this.velX)) this.velX = maxX;
          if (Math.abs(maxY) < Math.abs(this.velY)) this.velY = maxY;
          break;
        case INPUT_MAP.ROTATE_RIGHT:
          this.facingAngle += ROTATION_SPEED;
          this.adjustRotation();
          break;
        case INPUT_MAP.ROTATE_LEFT:
          this.facingAngle -= ROTATION_SPEED;
          this.adjustRotation();
          break;
        case INPUT_MAP.SHOOT:
          console.log('pew');
          break;
        case INPUT_MAP.PAUSE:
          // broadcast pause event request
          console.log('break');
          break;
        default:
          break;
      }

      this.inputEvent = null;
    }

    this.position.x += this.velX;
    this.position.y += this.velY;
    
    // TODO: Magic number
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