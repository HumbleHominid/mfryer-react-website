import SpriteConfig from './entityConfig';

let sprites = {};

function getSprite(entityType) {
  if (entityType in sprites) return sprites[entityType];
  else {
    let config = SpriteConfig[entityType];
    sprites[entityType] = new Image(config.width, config.height);
    sprites[entityType].src = config.spritePath;
    return sprites[entityType];
  }
}

export default getSprite;