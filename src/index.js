import { CELL_SIZE } from "./const";
import World from "./world";

function drawGrid(world) {
  for (let x = 0; x <= world.canvas.width; x += CELL_SIZE) {
    world.ctx.moveTo(x, 0);
    world.ctx.lineTo(x, world.canvas.height);
  }

  for (let y = 0; y <= world.canvas.height; y += CELL_SIZE) {
    world.ctx.moveTo(0, y);
    world.ctx.lineTo(world.canvas.width, y);
  }

  world.ctx.strokeStyle = "#ddd";
  world.ctx.stroke();
}

function main() {
  const world = new World();
  document.body.appendChild(world.canvas);

  // Glider Gun
  world.appendCell(1, 5);
  world.appendCell(1, 6);
  world.appendCell(2, 5);
  world.appendCell(2, 6);

  world.appendCell(11, 5);
  world.appendCell(11, 6);
  world.appendCell(11, 7);
  world.appendCell(12, 4);
  world.appendCell(12, 8);
  world.appendCell(13, 3);
  world.appendCell(13, 9);
  world.appendCell(14, 3);
  world.appendCell(14, 9);
  world.appendCell(15, 6);
  world.appendCell(16, 4);
  world.appendCell(16, 8);
  world.appendCell(17, 5);
  world.appendCell(17, 6);
  world.appendCell(17, 7);
  world.appendCell(18, 6);

  world.appendCell(21, 3);
  world.appendCell(21, 4);
  world.appendCell(21, 5);
  world.appendCell(22, 3);
  world.appendCell(22, 4);
  world.appendCell(22, 5);
  world.appendCell(23, 2);
  world.appendCell(23, 6);
  world.appendCell(25, 1);
  world.appendCell(25, 2);
  world.appendCell(25, 6);
  world.appendCell(25, 7);

  world.appendCell(35, 3);
  world.appendCell(35, 4);
  world.appendCell(36, 3);
  world.appendCell(36, 4);

  let lastFrameTime = 0;
  const draw = elapsedTime => {
    // 20fps --
    const delta = elapsedTime - (lastFrameTime || 0);
    requestAnimationFrame(draw);
    if (lastFrameTime && delta < 50) {
      return;
    }
    // -- 20fps

    world.draw();
    drawGrid(world);

    world.process();
    lastFrameTime = elapsedTime;
  };

  requestAnimationFrame(draw);
}

main();
