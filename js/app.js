class Sprite {
    constructor(sprite, x = 0, y = 0){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    render(ctx){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


class Enemy extends Sprite{
    constructor(sprite, x, y) {
        super(sprite, x, y);
        // this.sprite = sprite;
        // this.x = x;
        // this.y = y;
        this.name = "Tom";
    }

    update(timeDelta){
        //this.x = (this.x + 1)  * timeDelta;
        //this.y;
    }

}
// read about ctx
//figure out the dimensions of the ctx canvas
//figure out the starting position of bug
//bug needs to start on the bricks, what are the 
//x,y of the bricks
//figure out the starting position of the player
//player needs to start on the grass
//figure out where the water starts
//need to figure out how to capture player clicks and 
//move the player
//maybe get rid of hte curser
//figure out the timedelta and how to move
//these stupid sprite things
//when the bugs get to the edge of thectx, they need
//to move back tothe beginning of the ctx
//when the player gets to the water, he needs to 
//be placed back on the grass
//figure out collisions of bug and player
//when player dies, he needs to move back to the grass

class Player extends Sprite {
    constructor(sprite, x, y) {
        super(sprite, x, y);
        // this.sprite = "images/char-boy.png";
        // this.x = 100;
        // this.y = 70;
        this.name = "chester";
    }

    update(){
        //this.x = (this.x + 1)  * timeDelta;
        //this.y;
    }

    handleInput(){
        //keyboard junk here
    }

    setInitialLocation(blockWidth, blockHeight){
        //squares are 101, 83
        let img = Resources.get(this.sprite);
        let width = img.width;
        let height = img.height;
        console.log(width, height, "player");
        // this.x = canvasWidth / 2;
        // this.y = canvasHeight - height;
        console.log(this.x, this.y, "hello");
        this.y = blockHeight * 5 - 20;
        this.x = 2 * blockWidth;
    }
}

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

console.log(canvas.width, canvas.height);
let myEnemy = new Enemy("images/enemy-bug.png", 252, 256);
let player = new Player("images/char-boy.png");
console.log(player.x);
console.log(player.y);

let allEnemies = [];
allEnemies.push(myEnemy);

let engine = new Engine(canvas, ctx, allEnemies, player);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
