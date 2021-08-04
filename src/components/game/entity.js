import getSprite from './spritePool';
import Position from './position';

export default class Entity {
  constructor(type, position = new Position(50, 50)) {
    this.position = position;
    this.type = type;
  }

  render(canvasContext) {
    const image = getSprite(this.type);
    canvasContext.drawImage(image, this.position.x, this.position.y);
  }
}