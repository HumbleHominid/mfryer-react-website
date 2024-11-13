import Entity from './entity';
import { EntityType } from './entityType';

export default class QuadEntity extends Entity {
	// List of descending quad coords e.g.: [0, 3]
	quadCoords = [];
	constructor(position) {
	  super(EntityType.BULLET, position);
	}
}