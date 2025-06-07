export default class homeScreenCharacter{
    constructor(xPos, yPos, ctx, canvas, canvasBackground){
        this.xPos = xPos;
        this.yPos = yPos;
        this.ctx = ctx;
        this.canvas = canvas;
        this.canvasBackground = canvasBackground;

        //animation stuff
        this.spriteImage = new Image();
        this.spriteImage.src = "./imgs/runningSprite.png";
        this.spriteWidth = (540 / 9) + 2; //dividing the 540 width of sprite sheet by 9 sprites.
        this.spriteHeight = (233 / 4) + 3.2; //+3.2 at the end to make it look correct
        this.width = 30; //actual width of the sprite
        this.height = 45; //actual height of the sprite
        this.frameX = 0;
        this.frameY = 2;
        this.gameFrame = 0;
        this.staggerFrame = 7;
        this.timedLoop;
    }

    draw(){
        //clear the screen and draws the background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.canvasBackground,0,0);
        this.ctx.fillText(`Instructions:`, this.canvas.width / 2, this.canvas.height * 0.1);

        this.ctx.font = "30px Fantasy";
        this.ctx.fillText(`1. Complete each level by popping all the bubbles`, this.canvas.width / 2, this.canvas.height * 0.25);
        this.ctx.fillText(`2. Press the left and right arrow keys to move`, this.canvas.width / 2, this.canvas.height * 0.4);
        this.ctx.fillText(`3. Press space to shoot a spike`, this.canvas.width / 2, this.canvas.height * 0.55);
        this.ctx.fillText(`4. Collect coins and finish levels early to earn more points`, this.canvas.width / 2, this.canvas.height * 0.7);
        this.ctx.fillText(`5. Good luck and have fun!`, this.canvas.width / 2, this.canvas.height * 0.85);
        //animate
        this.ctx.drawImage(this.spriteImage, 10 + this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
        this.width, this.height, this.xPos, this.yPos + 3 - this.height / 2, this.width * 1.5, this.height * 1.5); //9 argument draw
        if(this.gameFrame % this.staggerFrame === 0){ //makes it change less rapidly
            if(this.frameX < 8) this.frameX++;
            else this.frameX = 0;
        }
        this.gameFrame++;
    }

    startLoop(){
        this.timedLoop = setInterval(this.draw.bind(this), 1000 / 45);
    }

    stopLoop(){
        clearInterval(this.timedLoop);
    }

}
