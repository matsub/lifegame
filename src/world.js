import { WIDTH, HEIGHT, CELL_SIZE } from "./const";
import Cell from "./cell";

class World {
  constructor() {
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH * CELL_SIZE;
    canvas.height = HEIGHT * CELL_SIZE;
    const ctx = canvas.getContext("2d");

    const blackLine = new Uint8ClampedArray(4 * CELL_SIZE).fill(255);
    for (let offset = 0; offset < blackLine.length; offset += 4) {
      blackLine.fill(0, offset, offset + 3);
    }

    this._cells = [];
    this.canvas = canvas;
    this.ctx = ctx;
    this._blackLine = blackLine;
  }

  _fill(buff, x, y) {
    let offset = y * CELL_SIZE * WIDTH * CELL_SIZE * 4 + x * CELL_SIZE * 4;
    for (let i = 0; i < CELL_SIZE; i += 1) {
      buff.set(this._blackLine, offset);
      offset += WIDTH * CELL_SIZE * 4;
    }
  }

  appendCell(x, y) {
    this._cells.push(new Cell(x, y, true));
  }

  cell(x, y) {
    return this._cells[x + y * WIDTH];
  }

  draw() {
    const imageData = this.ctx.createImageData(
      this.canvas.width,
      this.canvas.height
    );

    for (const cell of this._cells) {
      this._fill(imageData.data, cell.x, cell.y);
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  process() {
    const range = (n, cb) => [...new Array(n).keys()].map(cb);
    const nextGeneration = range(HEIGHT, y =>
      range(WIDTH, x => new Cell(x, y))
    );

    for (const cell of this._cells) {
      cell.neighbours = 0;
      nextGeneration[cell.y][cell.x] = cell;
    }

    for (const cell of this._cells) {
      for (const [x, y] of cell.generateNeighbour()) {
        if (y < HEIGHT && x < WIDTH) {
          nextGeneration[y][x].neighbours += 1;
        }
      }
    }

    this._cells = nextGeneration.flat().filter(cell => cell.isAlive);
  }
}

export default World;
