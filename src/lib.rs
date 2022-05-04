use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[derive(PartialEq)]
enum Direction {
    Up,
    Right,
    Down,
    Left,
}

struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    fn new(spawn_index: usize) -> Snake {
        Snake {
            body: vec![SnakeCell(spawn_index)],
            direction: Direction::Down,
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    size: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, snake_idx: usize) -> World {
        World {
            width,
            size: width * width,
            snake: Snake::new(snake_idx),
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn snake_head(&self) -> usize {
        self.snake.body[0].0
    }

    pub fn update(&mut self) {
        let snake_idx = self.snake_head();
        let (row, col) = self.cell_to_index(snake_idx);
        let (row, col) = match self.snake.direction {
            Direction::Right => (row, (col + 1) % self.width),
            Direction::Left => (row, (col - 1) % self.width),
            Direction::Up => ((row - 1) % self.width, col),
            Direction::Down => ((row + 1) % self.width, col),
        };
        let next_idx = self.index_cell(row, col);
        self.set_snake_head(next_idx);
    }

    fn set_snake_head(&mut self, idx: usize) {
        self.snake.body[0].0 = idx
    }

    fn cell_to_index(&self, idx: usize) -> (usize, usize) {
        (idx / self.width, idx % self.width)
    }

    fn index_cell(&self, row: usize, col: usize) -> usize {
        (row * self.width) + col
    }
}

// wasm-pack build --target web
