class Enemy {
    constructor() {
        this.sprite = "images/enemy-bug.png";
        this.x = 5;
        this.y = 4;
        this.name = "tom";
    }

    update(timeDelta){
        //this.x = (this.x + 1)  * timeDelta;
        //this.y;
        console.log("td: ", timeDelta);
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
//when player dies, he needs to move back to the gras


class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.x = 100;
        this.y = 70;
        this.name = "chester";
    }

    update(timeDelta){
        //this.x = (this.x + 1)  * timeDelta;
        //this.y;
    }

    render(){
        // console.log("here");
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        console.log(this.name);
    }

    handleInput(){
        //keyboard junk here
    }
}

let myEnemy = new Enemy();
let player = new Player();
console.log(player.x);
console.log(player.y);

let allEnemies = [];
allEnemies.push(myEnemy);