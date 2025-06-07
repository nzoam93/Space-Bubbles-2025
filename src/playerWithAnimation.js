export default class Player{
    constructor(xPos, yPos, spikeController, sound){
        this.xPos = xPos;
        this.yPos = yPos;
        this.vel = 4;
        this.lives;
        this.immunity = 0;
        this.spikeController = spikeController;
        this.sound = sound;

        //event listeners for the keystrokes
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);

        //animation stuff
        this.spriteImage = new Image();
        this.spriteImage.src = "./imgs/runningSprite.png";
        this.spriteWidth = (540 / 9) + 2; //dividing the 540 width of sprite sheet by 9 sprites.
        this.spriteHeight = (233 / 4) + 3.2; //+3.2 at the end to make it look correct
        this.width = 30; //actual width of the sprite
        this.height = 45; //actual height of the sprite
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.staggerFrame = 7;

    }

    draw(ctx){
        //determine if it has moved left or right. This info used for drawImage below
        this.move();

        //animation logic draw
        //frameX moves along one path
        //frameY chooses a different animiation from the sprite sheet
        //constants are to adjust on the sprite sheet
        ctx.drawImage(this.spriteImage, 10 + this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
        this.width, this.height, this.xPos, this.yPos + 3 - this.height / 2, this.width * 1.5, this.height * 1.5); //9 argument draw
        if(this.gameFrame % this.staggerFrame === 0){ //makes it change less rapidly
            if(this.frameX < 8) this.frameX++;
            else this.frameX = 0;
        }
        this.gameFrame++;

        //do the shoot function, wraparound function, and shield functions
        this.shoot();
        this.wrapAround();
    }

    //draws a shield around the character if they collected a shield
    drawShield(ctx){
        ctx.beginPath();
        ctx.arc(this.xPos + this.width / 2 + 6, this.yPos + this.height / 2 + 3, 42, 0, 2 * Math.PI);
        ctx.stroke();
    }

    move(){
        if(this.leftPressed){ //if it's true as defined below to be true when keying down
            this.xPos -= this.vel;
            this.frameY = 1;
        }
        else if(this.rightPressed){ //if it's true as defined below to be true when keying down
            this.xPos += this.vel;
            this.frameY = 3;
        }
        else{ //if it's not going left or right
            this.frameY = 2;
        }
    }

    wrapAround(){
        let canvas = document.getElementById("game");
        if(this.xPos < 0){
            this.xPos = canvas.width;
        }
        else if(this.xPos > canvas.width){
            this.xPos = 0;
        }
    }

    keydown = (e) => {
        e.preventDefault();
        if(e.code === "ArrowLeft"){
            this.leftPressed = true;
        }
        if(e.code === "ArrowRight"){
            this.rightPressed = true;
        }
        if(e.code === "Space"){
            this.shootPressed = true;
            this.sound.projectile();
        }
    }

    keyup = (e) => {
        e.preventDefault();
        if(e.code === "ArrowLeft"){
            this.leftPressed = false;
        }
        if(e.code === "ArrowRight"){
            this.rightPressed = false;
        }
        if(e.code === "Space"){
            this.shootPressed = false;
        }
    }

    //note that the +3 in yPos is to account for the positioning of the sprite sheet.
    collideWithBubble(bubble){
        bubble.height = bubble.radius * 2; //defined so that a bubble with a radius can also work in the collision detection
        bubble.width = bubble.radius * 2;

        //xPos of bubble on a circle is the MIDDLE. So you need to subtract the radius
        if(this.xPos < bubble.xPos + bubble.width - bubble.radius &&
           this.xPos + this.width > bubble.xPos - bubble.radius &&
           (this.yPos + 8 - this.height / 2) < bubble.yPos + bubble.height - bubble.radius && //subtract this.height / 2 because I stretched the character in the draw function
           (this.yPos + 3) + this.height > bubble.yPos
        ){
            //collision detected
            return true;
        }
        return false;
    }

    //note that the +3 in yPos is to account for the positioning of the sprite sheet
    collideWithBonus(bonus){
        if(this.xPos < bonus.xPos + bonus.width &&
            this.xPos + this.width > bonus.xPos &&
            (this.yPos + 8 - this.height / 2) < bonus.yPos + bonus.height && //subtract this.height / 2 because I stretched the character in the draw function
            (this.yPos + 3) + this.height > bonus.yPos
         ){
             return true;
         }
         return false;
    }

    shoot(){
        if(this.shootPressed){
            const speed = 5;
            const delay = 7; //for delay between spikes
            const spikeX = this.xPos + this.width / 2;
            const spikeY = this.yPos;
            this.spikeController.shoot(spikeX, spikeY, speed, delay);
        }
    }
}
