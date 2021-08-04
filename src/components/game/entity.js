import getSprite from './spritePool';
import Position from './position';
import EntityConfig from './entityConfig';

export default class Entity {
  constructor(type, position = new Position(0, 0)) {
    this.position = position;
    this.type = type;
  }

  render(canvasContext) {
    const image = getSprite(this.type);
    const config = EntityConfig[this.type];
    canvasContext.drawImage(image, this.position.x, this.position.y, config.width, config.height);
  }
}