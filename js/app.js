
/**
 * @description Sprite class represents any game piece that is placed on the gameboard. This will be the 
 * parent class for player and enemies. 
 * @constructor Takes an image and x and y coordinates for the starting position of the image
 * @param {string} sprite - represents the path of an image file
 * @param {number} x - represents the x coordinate of the image 
 * @param {number} y - represents the y coordinate of the image
 */
class Sprite {
    constructor(sprite, x = 0, y = 0){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    /**
     * Draws each sprite on the game canvas. This is method is called by engine.js.
     * @param {object} ctx
     */
    render(ctx){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * @description Enemy class represents an enemy that is placed on the gameboard. 
 * @constructor Takes an image and x and y coordinates for the starting position of the image
 * @param {string} sprite - represents the path of an image file
 * @param {number} x - represents the x coordinate of the image 
 * @param {number} y - represents the y coordinate of the image
 */
class Enemy extends Sprite{
    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.speed = 50; //enemies speed will vary between 50 and 200
    }


    /**
     * Update method updates the enemy position on the canvas over time
     * @param {number} timeDelta 
     */
    update(timeDelta){
        this.x += this.speed * timeDelta;
        if (this.x >= engine.blockWidth * 5){
            //reset the speed
            this.setSpeed();

            //reset the enemy location
            this.x = -engine.blockWidth;
            //bring the enemy back to a random stone row between 1 and 3 once it's off the right edge
            this.y = (engine.blockHeight * (Math.floor(Math.random() * 3) + 1)) - BOTTOM_BUFFER;
        }
    }

    /**
     * Determines a random speed for each enemy using a random factor of 50 to 200 pixels to set the speed
     */
    setSpeed(){
        this.speed = Math.floor(Math.random() * 150) + 50;
    }

    /**
     * setInitialLocation for enemies is called from engine.js. Enemies are placed on the grid in a random
     * fashion within the three stone rows
     * @param {number} x 
     * @param {number} y 
     */
    setInitialLocation(x, y){
        this.x = x;
        this.y = y;
        this.setSpeed();
    }
}

/**
 * @description Player class represents a player that is placed on the gameboard. 
 * @constructor Takes an image and x and y coordinates for the starting position of the image
 * @param {string} sprite - represents the path of an image file
 * @param {number} x - represents the x coordinate of the image 
 * @param {number} y - represents the y coordinate of the image
 */
class Player extends Sprite {
    constructor(sprite, x, y) {
        super(sprite, x, y);
    }

    /**
     * Determine which key the player has pressed and move the player sprite accordingly. If the 
     * player sprite reaches the water, reset to the grass. Make sure the player cannot go to the
     * left of left point of the canvas nor to the right of the right edge of the canvas.
     * @param {string} keycode - Indicator of left, right, up, down key was pressed
     * @param {number} blockWidth - Width of the block the images are placed on
     * @param {number} blockHeight - height of the block the images are placed on
     */
    handleInput(keycode, BLOCK_WIDTH, BLOCK_HEIGHT){
    
        //keycodes, up, down, left, right
        if (keycode == "up"){
            this.y = this.y - BLOCK_HEIGHT;
            //check if we are in the water, if so, reset to the grass
            if (this.y <= 0){
                this.y = BLOCK_HEIGHT * 5 - BOTTOM_BUFFER
            }
        }

        if (keycode == "down"){
            this.y = this.y + BLOCK_HEIGHT;
            //make sure user cannot go beyond the first row of grass
            if (this.y >= BLOCK_HEIGHT * 5){
                this.y = BLOCK_HEIGHT * 5 - BOTTOM_BUFFER;
            }
        }

        if (keycode == "left") {
            this.x = this.x - BLOCK_WIDTH;
            //make sure user cannot go to the left of the initial block
            if (this.x < 0){
                this.x = 0;
            }
        }

        if (keycode == "right") {
            this.x = this.x + BLOCK_WIDTH;
            //make sure user cannot go to the right of the end
            //of the 5th column
            if (this.x >= BLOCK_WIDTH * 5){
                this.x = BLOCK_WIDTH * 4;
            }
        }
    }

    /**
     * Set the initial location for the player sprite
     * @param {number} blockWidth 
     * @param {number} blockHeight 
     */
    setInitialLocation(BLOCK_WIDTH, BLOCK_HEIGHT){
        //squares are 101, 83

        //account for the buffer of grass on the bottom of the first row
        this.y = BLOCK_HEIGHT * 5 - 20;

        //initially place in the middle of the field
        this.x = BLOCK_WIDTH * 2;
    }

    update(){
        //noop
    }
}

// Objects needed for the game
//the canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

//the player and enemies
let player = new Player("images/char-boy.png");
let allEnemies = [];

//create enemies, one for each stone row (3)
for (let i = 0; i < 3; i++){
    allEnemies.push(new Enemy("images/enemy-bug.png"));
}

//the game engine, which takes a canvas and the elements on 
//the canvas
let engine = new Engine(canvas, ctx, allEnemies, player, BLOCK_WIDTH, BLOCK_HEIGHT);

//Event listener used by the player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode], engine.blockWidth, engine.blockHeight);
});
