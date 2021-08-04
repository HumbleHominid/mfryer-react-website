import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';

export default class SpaceGame {
  entities = [
    createEntity(EntityType.ENEMY, new Position(Math.random() * 250, Math.random() * 250)),
    createEntity(EntityType.ENEMY, new Position(Math.random() * 250, Math.random() * 250)),
    createEntity(EntityType.PLAYER, new Position(Math.random() * 250, Math.random() * 250)),
  ];

  forEachEntity(delegate = (entity) => {}) {
    for (let i = 0; i < this.entities.length; ++i) delegate(this.entities[i]);
  }
}