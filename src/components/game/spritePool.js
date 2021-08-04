let sprites = {};

function getSprite(entityType) {
  if (entityType in sprites) return sprites[entityType];
  else {
    sprites[entityType] = new Image(64, 64);
    // TODO: Lookup for the src
    sprites[entityType].src = 'logo.png';
    return sprites[entityType];
  }
}

export default getSprite;