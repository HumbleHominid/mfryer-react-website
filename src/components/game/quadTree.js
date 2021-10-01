function makeSortingFunc(xMin, yMin, xMax, yMax) {
  return (item) => {
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

export default class QuadTree {
  children = null;
  items = null;
  entries = 0;

  get numEntries() { return this.entries; }

  constructor({ isLeaf = false, sortFunc = (item) => {} /* Function that takes an item and returns [0,4]. */, children = null }) {
    this.isLeaf = isLeaf;
    this.sortFunc = sortFunc;
    this.children = children;
    this.items = isLeaf ? [] : null;
  }

  insert(item) {
    if (this.isLeaf) {
      this.items.push(item);
      ++this.entries;
      return;
    }

    let index = this.sortFunc(item);

    if (index >= 0 && index < 4) {
      this.children[index].insert(item);
      ++this.entries;
    }
  }

  forEach(delegate = (item) => {}) {
    if (this.isLeaf) {
      for (let i = 0; i < this.items.length; ++i) {
        delegate(this.items[i]);
      }
    }
    else {
      for (let i = 0; i < this.children.length; ++i) {
        this.children[i].forEach(delegate);
      }
    }
  }
}

export { makeQuadTree };