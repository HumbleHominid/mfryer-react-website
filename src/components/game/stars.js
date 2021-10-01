// The epsilon that determines if a star should turn on
const onEpsilon = 0.00001;
// The epsilon that determines if a star should turn off
const offEpsilon = 0.01;

export default class Stars {
  tiles = [];
  width = null;
  height = null;

  constructor({ width = 500, height = 500 }) {
    this.width = width;
    this.height = height;
    this.tiles = Array(width);

    for (let i = 0; i < this.tiles.length; ++i) {
      this.tiles[i] = Array(height);
      for (let j = 0; j < this.tiles[i].length; ++j) {
        this.tiles[i][j] = Math.random() < onEpsilon;
      }
    }
  }

  render(context) {
    context.save();

    const width = context.canvas.width;
    const height = context.canvas.height;

    // Draw a dark screen
    context.fillStyle = '#1c1c1c';
    context.fillRect(0, 0, width, height);

    // Draw the stars
    context.fillStyle = '#eee';

    for (let i = 0; i < this.tiles.length; ++i) {
      for (let j = 0; j < this.tiles[i].length; ++j) {
        if (this.tiles[i][j]) {
          context.fillRect(i, j, 1, 1);
          this.tiles[i][j] = Math.random() >= offEpsilon;
        }
        else this.tiles[i][j] = Math.random() < onEpsilon;
      }
    }

    context.restore();
  }
}