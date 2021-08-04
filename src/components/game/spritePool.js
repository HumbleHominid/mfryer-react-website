import EntityConfig from './entityConfig';

let sprites = {};

function getSprite(entityType) {
  if (entityType in sprites) return sprites[entityType];
  else {
    let config = EntityConfig[entityType];
    sprites[entityType] = new Image(config.width, config.height);
    sprites[entityType].src = config.spritePath;
    return sprites[entityType];
  }
}

export default getSprite;