function gameLoop() {
    console.log('Game loop started');
    clearCanvas();
    drawSquare();
    applyGravity();
    moveSquare();
    requestAnimationFrame(gameLoop);
    console.log('Game loop ended');
}
