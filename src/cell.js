class Cell {
  constructor(x, y, isAlive = false) {
    this.x = x;
    this.y = y;
    this._isAlive = isAlive;
    this.neighbours = 0;
  }

  get isAlive() {
    this._isAlive =
      this.neighbours === 3 || (this.neighbours === 2 && this._isAlive);
    return this._isAlive;
  }

  *generateNeighbour() {
    for (let y = -1; y < 2; y += 1) {
      for (let x = -1; x < 2; x += 1) {
        if (x === 0 && y === 0) continue;
        yield [this.x + x, this.y + y];
      }
    }
  }
}

export default Cell;
