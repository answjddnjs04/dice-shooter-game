const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

const dice = {
    size: 20,
    speed: 7,
    list: []
};

const enemy = {
    x: Math.random() * (canvas.width - 50),
    y: 50,
    size: 50,
    speed: 5
};

function drawPlayer() {
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawDice() {
    ctx.fillStyle = '#000';
    dice.list.forEach(d => {
        d.y -= dice.speed;
        ctx.fillRect(d.x, d.y, dice.size, dice.size);
        ctx.fillStyle = '#f00';
        ctx.font = '20px Arial';
        ctx.fillText(d.value, d.x + 5, d.y + 15);
        ctx.fillStyle = '#000';
    });
}

function drawEnemy() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

function movePlayer(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    }
}

function stopPlayer(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = 0;
    }
}

function shootDice() {
    dice.list.push({ x: player.x + player.width / 2 - dice.size / 2, y: player.y, value: Math.floor(Math.random() * 6) + 1 });
}

function update() {
    clear();
    drawPlayer();
    drawDice();
    drawEnemy();

    newPos();

    dice.list = dice.list.filter(d => d.y + dice.size > 0);

    dice.list.forEach(d => {
        if (d.x < enemy.x + enemy.size && d.x + dice.size > enemy.x && d.y < enemy.y + enemy.size && d.size + d.y > enemy.y) {
            enemy.x = Math.random() * (canvas.width - enemy.size);
            enemy.y = 50;
            dice.list = dice.list.filter(item => item !== d);
        }
    });

    enemy.y += enemy.speed;
    if (enemy.y + enemy.size > canvas.height) {
        enemy.y = 50;
        enemy.x = Math.random() * (canvas.width - enemy.size);
    }

    requestAnimationFrame(update);
}

update();

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        shootDice();
    }
});
