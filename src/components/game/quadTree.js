export default class QuadTree {
  children = null;
  items = null;

  constructor({ isLeaf = false, sortFunc = (item) => {} /* Function that takes an item and returns [0,4]. */, children = null }) {
    this.isLeaf = isLeaf;
    this.sortFunc = sortFunc;
    this.children = children;
    this.items = isLeaf ? [] : null;
  }

  insert(item) {
    if (this.isLeaf) {
      this.items.push(item);
      return;
    }

    let index = this.sortFunc(item);

    if (index >= 0 && index < 4) {
      this.children[index].insert(item);
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