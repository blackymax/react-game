const CANVAS_SIZE: Array<number> = [800, 800];
const SNAKE_START: Array<Array<number>> = [
  [8, 7],
  [8, 8]
];
const APPLE_START: Array<number> = [8, 3];
const SCALE_SMALL: number = window.innerWidth > 1000 ? 40 : 28;
const SCALE_LARGE: number = window.innerWidth > 1000 ? 28 : 20;
const SPEED_SLOW: number = 100;
const SPEED_FAST: number = 50;
const DIRECTIONS: any = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export { CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE_SMALL, SCALE_LARGE, SPEED_SLOW, SPEED_FAST, DIRECTIONS };
