import getSprite from './spritePool';
import Position from './position';
import Size from './size';

export default class Entity {
  constructor(type, position = new Position(0, 0), size = new Size()) {
    this.position = position === null ? new Position(0, 0) : position;
    this.type = type;
    this.size = size;
  }

  render(canvasContext) {
    const image = getSprite(this.type);
    canvasContext.drawImage(image, this.position.x, this.position.y, this.size.width, this.size.height);
  }
}