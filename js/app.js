class Sprite {
    constructor(sprite, x = 0, y = 0){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        // this.left = x;
        // this.right = x + blockWidth;
        // this.top = y;
        // this.bottom = y + blockHeight;`
    }

    render(ctx){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Sprite{
    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.speed = 50; //enemies speed will vary between 50 and 200
    }

    update(timeDelta){
        this.x += this.speed * timeDelta;
        if (this.x >= engine.blockWidth * 5){
            //reset the speed
            this.setSpeed();

            //reset the enemy location
            this.x = -engine.blockWidth;
            //bring the enemy back to a random stone row between 1 and 3 once it's off the right edge
            this.y = (engine.blockHeight * (Math.floor(Math.random() * 3) + 1)) - bottomBuffer;
        }
    }

    setSpeed(){
        this.speed = Math.floor(Math.random() * 150) + 50;
    }

    setInitialLocation(x, y){
        this.x = x;
        this.y = y;
        this.setSpeed();
    }


}

class Player extends Sprite {
    constructor(sprite, x, y) {
        super(sprite, x, y);
    }

    update(){

    }

    handleInput(keycode, blockWidth, blockHeight){
    
        //keycodes, up, down, left, right
        if (keycode == "up"){
            this.y = this.y - blockHeight;
            //check if we are in the water, if so, reset to the grass
            if (this.y <= 0){
                this.y = blockHeight * 5 - bottomBuffer
            }
        }

        if (keycode == "down"){
            this.y = this.y + blockHeight;
            //make sure user cannot go beyond the first row of grass
            if (this.y >= blockHeight * 5){
                this.y = blockHeight * 5 - bottomBuffer;
            }
        }

        if (keycode == "left") {
            this.x = this.x - blockWidth;
            //make sure user cannot go to the left of the initial block
            if (this.x < 0){
                this.x = 0;
            }
        }

        if (keycode == "right") {
            this.x = this.x + blockWidth;
            //make sure user cannot go to the right of the end
            //of the 5th column
            if (this.x >= blockWidth * 5){
                this.x = blockWidth * 4;
            }
        }
    }

    setInitialLocation(blockWidth, blockHeight){
        //squares are 101, 83

        //account for the buffer of grass on the bottom of the first row
        this.y = blockHeight * 5 - 20;

        //initially place in the middle of the field
        this.x = blockWidth * 2;
        console.log(this.x, this.y, "hello");
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
for (let i = 0; i < 2; i++){
    allEnemies.push(new Enemy("images/enemy-bug.png"));
}

//the game engine, which takes a canvas and the elements on 
//the canvas
let engine = new Engine(canvas, ctx, allEnemies, player, blockWidth, blockHeight);

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
