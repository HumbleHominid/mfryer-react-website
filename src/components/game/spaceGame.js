import Entity from './entity.js';
import { EntityType } from './entityType';
import Position from './position.js';

export default class SpaceGame {
  entities = [
    new Entity(EntityType.ENEMY, new Position(Math.random() * 200, Math.random() * 200)),
    new Entity(EntityType.ENEMY, new Position(Math.random() * 200, Math.random() * 200)),
    new Entity(EntityType.PLAYER, new Position(Math.random() * 200, Math.random() * 200)),
  ];

  forEachEntity(delegate = (entity) => {}) {
    for (let i = 0; i < this.entities.length; ++i) delegate(this.entities[i]);
  }
}