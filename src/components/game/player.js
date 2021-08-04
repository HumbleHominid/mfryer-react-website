import Entity from './entity'
import { EntityType } from './entityType';

export default class Player extends Entity {
  constructor(position = null) {
    if (position === null) super(EntityType.PLAYER);
    else super(EntityType.PLAYER, position);
  }
}