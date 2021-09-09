import createEntity from './entityFactory';
import { EntityType } from './entityType';
import Position from './position';
import EntityConfig from './entityConfig';
import QuadTree from './quadTree';

function makeSortingFunc(xMin, yMin, xMax, yMax) {
  return (item) => {
    // TODO: Fix the magic numbers!!!
    const width = xMax - xMin;
    const height = yMax - yMin;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    let x = Math.floor((item.position.x - xMin) / halfWidth); // [0, 1]
    let y = Math.floor((item.position.y - yMin) / halfHeight); // [0, 1]

    return (x + (2 * y));
  };
};

function makeQuadTree() {
  let topLevelChildren = Array(4);

  const halfWidth = 750 / 2;
  const halfHeight = 500 / 2;

  for (let i = 0; i < 4; ++i) {
    let xMin = halfWidth * (i % 2);
    let yMin = halfHeight * Math.floor(i / 2);
    let quad = new QuadTree({
      sortFunc: makeSortingFunc(xMin, yMin, xMin + halfWidth, yMin + halfHeight),
      children: [
        new QuadTree({isLeaf: true}),
        new QuadTree({isLeaf: true}),
        new QuadTree({isLeaf: true}),
        new QuadTree({isLeaf: true}),
      ],
    });

    topLevelChildren[i] = quad;
  }

  return new QuadTree({
    children: topLevelChildren,
    sortFunc: makeSortingFunc(0, 0, 750, 500) // TODO: Magic numbers
  });
}

export default class BulletPool {
  pool = null;

  constructor() {
    this.pool = makeQuadTree();
  }

  tick(dt) {
    let newTree = makeQuadTree();
    this.pool.forEach((item) => {
      item.tick(dt);

      if (item.isAlive) newTree.insert(item);
    });

    this.pool = newTree;
  }

  spawnBullet(position, facingAngle) {
    const playerConfig = EntityConfig[EntityType.PLAYER];
    let adjustedAngle = facingAngle - (1/2 * Math.PI);
    let bulletNudgeX = Math.cos(adjustedAngle) * (playerConfig.width / 2);
    let bulletNudgeY = Math.sin(adjustedAngle) * (playerConfig.height / 2);
    let bulletInitialPosition = new Position(position.x + bulletNudgeX, position.y + bulletNudgeY);

    let bullet = createEntity(EntityType.BULLET, bulletInitialPosition);
    bullet.init(facingAngle);
    this.pool.insert(bullet);
  }

  render(context) {
    this.pool.forEach((item) => {
      item.render(context);
    });
  }
}