// Enemies our player must avoid

const Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    // Handles collision with the Player
    // https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
    if (player.x < this.x + 81 &&
        player.y < this.y + 60 &&
        player.x + 81 > this.x &&
        player.y + 60 > this.y) {
        // alert('stop');
        player.x = 202;
        player.y = 385;
    }
    // Enemy speed changes after first move
    if (this.x > 510) {
        this.x = -100;
        this.speed = 100 + Math.random() * 120
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    // Implement direction keys and they will only work within the game panel
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (key === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (key === 'right' && this.x < 404) {
        this.x += 101;
    }
    if (key === 'down' && this.y < 405) {
        this.y += 83;
    }
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 385;
        }, 800);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
// Generate 3 enemies on each road
[60, 145, 228].forEach(function (loc) {
    const enemy = new Enemy(0, loc, 200);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
const player = new Player(202, 385);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
