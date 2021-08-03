export default class Position {
  static INVALID_DIST = -1;
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distSquared(other) {
    if (typeof(other) !== Position) {
      return -1;
    }
    return this.x * other.x + this.y * other.y;
  }
}