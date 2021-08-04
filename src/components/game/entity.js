import getSprite from './spritePool';
import Position from './position';
import SpriteConfig from './spriteConfig';

export default class Entity {
  constructor(type, position = new Position(0, 0)) {
    this.position = position;
    this.type = type;
  }

  render(canvasContext) {
    const image = getSprite(this.type);
    let config = SpriteConfig[this.type];
    canvasContext.drawImage(image, this.position.x, this.position.y, config.width, config.height);
  }
}