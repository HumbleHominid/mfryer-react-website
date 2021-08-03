let sprites = {};

export default class SpritePool {
  static getSprite(entityType) {
    if (entityType in sprites) return sprites[entityType];
    else {
      sprites[entityType] = new Image(64, 64);
      // TODO: Lookup for the src
      sprites[entityType].src = 'logo.png';
      return sprites[entityType];
    }
  }
}