import getSprite from './spritePool';
import Position from './position';
import Size from './size';

export default class Entity {
  static idCount = 0;

  constructor(type, position = new Position(0, 0), size = new Size()) {
    this.position = position === null ? new Position(0, 0) : position;
    this.type = type;
    this.size = size;
    this.id = ++Entity.idCount;
  }

  render(canvasContext) {
    const image = getSprite(this.type);
    const width = this.size.width;
    const height = this.size.height;
    canvasContext.drawImage(image,
      this.position.x - (width / 2),
      this.position.y - (height / 2),
      width,
      height);
  }

  tick(dt) {}
}