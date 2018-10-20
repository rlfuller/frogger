class Sprite {
    constructor(sprite, x, y){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    render(resources, ctx){
        ctx.drawImage(resources.get(this.sprite), this.x, this.y);
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

    update(timeDelta){
        //this.x = (this.x + 1)  * timeDelta;
        //this.y;
    }

    handleInput(){
        //keyboard junk here
    }
}

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

document.body.appendChild(canvas);


let myEnemy = new Enemy("images/enemy-bug.png", 0, 0);
let player = new Player("images/char-boy.png", 100, 70);
console.log(player.x);
console.log(player.y);

let allEnemies = [];
allEnemies.push(myEnemy);

let engine = new Engine(Resources, canvas, ctx, allEnemies, player);
