const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const SCREEN_WIDTH = 1200;
const SCREEN_HEIGHT = 800;
const SQUARE_SIZE = 50;
const GRAVITY = 0.5;
const JUMP_SPEED = -10;
const SQUARE_SPEED = 5;

let squareX = SCREEN_WIDTH / 2 - SQUARE_SIZE / 2;
let squareY = SCREEN_HEIGHT - SQUARE_SIZE;
let verticalSpeed = 0;
let isJumping = false;
let keys = {};

function drawSquare() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(squareX, squareY, SQUARE_SIZE, SQUARE_SIZE);
}

function clearCanvas() {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function applyGravity() {
    if (isJumping) {
        squareY += verticalSpeed;
        verticalSpeed += GRAVITY;
        if (squareY >= SCREEN_HEIGHT - SQUARE_SIZE) {
            squareY = SCREEN_HEIGHT - SQUARE_SIZE;
            isJumping = false;
        }
    }
}

function moveSquare() {
    if (keys['ArrowLeft'] && squareX > 0) {
        squareX -= SQUARE_SPEED;
    }
    if (keys['ArrowRight'] && squareX < SCREEN_WIDTH - SQUARE_SIZE) {
        squareX += SQUARE_SPEED;
    }
}

function gameLoop() {
    clearCanvas();
    drawSquare();
    applyGravity();
    moveSquare();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    if (event.key === ' ' && !isJumping) {
        isJumping = true;
        verticalSpeed = JUMP_SPEED;
    }
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

gameLoop();
