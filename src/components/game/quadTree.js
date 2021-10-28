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
  _items = null;
  entries = 0;

  get items() {
    let ret = [];
    this.forEach((item) => { ret.push(item); });
    return ret;
  }

  get numEntries() {
    let ret = 0;
    this.forEach(() => { ++ret; });
    return ret;
  }

  constructor({ isLeaf = false, sortFunc = (item) => {} /* Function that takes an item and returns [0,4]. */, children = null }) {
    this.isLeaf = isLeaf;
    this.sortFunc = sortFunc;
    this.children = children;
    this._items = isLeaf ? [] : null;
  }

  insert(item) {
    if (this.isLeaf) {
      this._items.push(item);
      ++this.entries;
      return;
    }

    let childIndex = this.sortFunc(item);

    if (childIndex >= 0 && childIndex < 4) {
      this.children[childIndex].insert(item);
    }
  }

  remove(item) {
    if (this.isLeaf) {
      let index = this._items.findIndex((a) => a.id === item.id);

      if (index !== -1) {
        --this.entries;
        this._items.splice(index, 1);
      }
    }

    let childIndex = this.sortFunc(item);

    if (childIndex >= 0 && childIndex < 4) {
      this.children[childIndex].remove(item);
    }
  }

  forEach(delegate = (item, node) => {}) {
    if (this.isLeaf) {
      for (let i = 0; i < this._items.length; ++i) {
        delegate(this._items[i], this);
      }
    }
    else {
      for (let i = 0; i < this.children.length; ++i) {
        this.children[i].forEach(delegate);
      }
    }
  }

  getNodeForItem(item) {
    if (this.isLeaf) return this;

    let quad = this.sortFunc(item);
    this.children[quad].getNodeForItem(item);
  }

  tick(dt) {
    function ItemUpdateObj(node, item) {
      this.node = node;
      this.item = item;
    }

    let itemsToRemove = [];
    let itemsToUpdate = [];
    this.forEach((item, node) => {
      let initialQuad = this.sortFunc(item);
      item.tick(dt);
      let finalQuad = this.sortFunc(item);

      if (!item.isAlive) {
        itemsToRemove.push(new ItemUpdateObj(node, item));
      }
      else if (initialQuad !== finalQuad) itemsToUpdate.push(new ItemUpdateObj(node, item));
    });

    // reconcile dead entities
    for (let i = 0; i < itemsToRemove.length; ++i) {
      let updateObj = itemsToRemove[i];
      let index = updateObj.node._items.findIndex((item) => item.id === updateObj.item.id);
      if (index !== -1) updateObj.node._items.splice(index, 1);
    }

    // reconcile entities that moved quadrants
    for (let i = 0; i < itemsToUpdate.length; ++i) {
      let updateObj = itemsToUpdate[i];
      let index = updateObj.node._items.findIndex((item) => item.id === updateObj.item.id);
      if (index !== -1) updateObj.node._items.splice(index, 1);
      this.insert(updateObj.item);
    }
  }
}

export { makeQuadTree };