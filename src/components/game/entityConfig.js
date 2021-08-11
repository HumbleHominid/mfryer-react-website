import { EntityType } from './entityType';

function Config(width = 16, height = 16, path = 'logo.png') {
  this.width = width;
  this.height = height;
  this.spritePath = path;
  return this;
}

const EntityConfig = {
  [EntityType.ENEMY]: new Config(),
  [EntityType.PLAYER]: new Config(16, 16, 'player.png'),
  [EntityType.BULLET]: new Config(8, 8, 'bullet.png')
}

export default EntityConfig;