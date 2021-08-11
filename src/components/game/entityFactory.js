import Enemy from './enemy';
import Player from './player';
import EntityConfig from './entityConfig'; 
import { EntityType } from './entityType';
import Size from './size';
import Bullet from './bullet';

function createEntity(entityType, position = null) {
  let entity = null;

  switch (entityType) {
    case EntityType.ENEMY:
      entity = new Enemy(position);
      break;
    case EntityType.PLAYER:
      entity = new Player(position);
      break;
    case EntityType.BULLET:
      entity = new Bullet(position);
      break;
    default:
      return entity;
  }

  let config = EntityConfig[entityType];
  entity.size = new Size(config.width, config.height);
  return entity;
}

export default createEntity;