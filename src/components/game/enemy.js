import Entity from './entity'
import { EntityType } from './entityType';

export default class Enemy extends Entity {
  constructor(position = null) {
    if (position === null) super(EntityType.ENEMY);
    else super(EntityType.ENEMY, position);
  }
}