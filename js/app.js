// Building enemy class:
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    //Width and height for collision detection
    this.width = 0;
    this.height = 50;
    this.speed = Math.floor(Math.random() * 100) + 1;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position. Dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Move the bug back to the beginning of the screen
    // when he goes off the right;
    if (this.x < 500) {
      this.x += this.speed * dt;
    } else {
      this.x = -200;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Building player class:
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  //Width and height for collision detection
  this.width = 50;
  this.height = 0;
    // The image/sprite for the player
  this.sprite = 'images/char-princess-girl.png';
};

//Update player's position when he goes off the top of the screen
Player.prototype.update = function() {
  if (this.y <= 0) {
    this.x = 200;
    this.y = 400;
  }

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Control of the player's movement using keyboard
Player.prototype.handleInput = function(direction) {
  if (direction === 'up' && this.y > 0) {
    this.y -= 83;
  }
  if (direction === 'down' && this.y < 400) {
    this.y += 83;
  }
  if (direction === 'left' && this.x > 0) {
    this.x -= 101;
  }
  if (direction === 'right' && this.x < 400) {
    this.x += 101;
  }
};

// Collision detection by looping through the enemy array and comparing the position of each enemy with the position of the player at the current frame

Player.prototype.reset = function(x, y) {
  this.x = x;
  this.y = y;
};

function checkCollisions(allEnemies, player) {
  for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x < player.x + player.width && allEnemies[i].x + allEnemies[i].width > player.x && allEnemies[i].y < player.y + player.height && allEnemies[i].y + allEnemies[i].height > player.y) {
      player.reset(200, 400);
    }
  }
}



// Instants of enemy and player objects
var allEnemies = [
  new Enemy(0, 60),
  new Enemy(0, 145),
  new Enemy(0, 230)
];

var player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
