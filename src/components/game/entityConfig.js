import { EntityType } from './entityType';

function Config(width = 64, height = 64, path = 'logo.png') {
  this.width = width;
  this.height = height;
  this.spritePath = path;
  return this;
}

const EntityConfig = {
  [EntityType.ENEMY]: new Config(),
  [EntityType.PLAYER]: new Config(100, 100),
}

export default EntityConfig;