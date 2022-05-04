import init, { World } from "snake_game";

const CELL_SIZE = 20;
const WORLD_WIDTH = 18;
const FPS = 10;

(async () => {
  await init();

  //const SNEK_START_INDEX = Math.floor(Math.random() * WORLD_WIDTH ** 2);
  const SNEK_START_INDEX = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);
  const world = World.new(WORLD_WIDTH, SNEK_START_INDEX);
  const width = world.width();
  const canvas = <HTMLCanvasElement>document.querySelector("#game-board");
  const context = canvas.getContext("2d");
  canvas.height = width * CELL_SIZE;
  canvas.width = width * CELL_SIZE;

  document.addEventListener("keydown", (e) => {
    console.log(e.code);
    switch (e.code) {
      case "KeyW":
        break;
      case "KeyA":
        break;
      case "KeyS":
        break;
      case "KeyD":
        break;
    }
  });

  drawWorld(context, width, CELL_SIZE);
  drawSnake(world, width, context, CELL_SIZE);

  update(context, canvas, width, CELL_SIZE, world);
})();

const drawWorld = (ctx: any, width: number, CELL_SIZE: number) => {
  ctx.beginPath();

  for (let x = 0; x < width + 1; x++) {
    ctx.moveTo(CELL_SIZE * x, 0);
    ctx.lineTo(CELL_SIZE * x, width * CELL_SIZE);
  }
  for (let y = 0; y < width + 1; y++) {
    ctx.moveTo(0, CELL_SIZE * y);
    ctx.lineTo(width * CELL_SIZE, CELL_SIZE * y);
  }

  ctx.stroke();
};

const drawSnake = (world: any, width: number, ctx: any, CELL_SIZE: number) => {
  const snakeIdx = world.snake_head();
  const col = snakeIdx % width;
  const row = Math.floor(snakeIdx / width);

  ctx.beginPath();
  ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  ctx.stroke;
};

const paint = (context: any, width: number, CELL_SIZE: number, world: any) => {
  drawWorld(context, width, CELL_SIZE);
  drawSnake(world, width, context, CELL_SIZE);
};

const update = (
  context: any,
  canvas: any,
  width: number,
  CELL_SIZE: number,
  world: any
) => {
  setTimeout(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    world.update();
    paint(context, width, CELL_SIZE, world);
    requestAnimationFrame(() => {
      update(context, canvas, width, CELL_SIZE, world);
    });
  }, 1000 / FPS);
};
