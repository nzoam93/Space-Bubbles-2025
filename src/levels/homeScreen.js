//commented out code is for homescreen character import if using homescreen character walking around on homescreen

// import homeScreenCharacter from "../playerHomeScreen.js";

export default class Homescreen{
    constructor(canvas, ctx, canvasBackground){
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasBackground = canvasBackground;
        // this.canvasBackground.src = './imgs/blurredBackground.png'
        this.setInfo();
        // this.newCharacter;
        // this.character();
    }

    setInfo(){
        //clear the screen and draws the background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.canvasBackground,0,0);

        document.getElementById("homeScreen").style.display = "none";
        this.ctx.font = "40px Fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        // this.ctx.shadowColor = "black";
        // this.ctx.shadowOffsetX = 10;
        // this.ctx.shadowOffsetY = 10;
        // this.ctx.shadowBlur = 10;
        this.ctx.fillText(`Instructions:`, this.canvas.width / 2, this.canvas.height * 0.1);

        this.ctx.font = "30px Fantasy";
        this.ctx.fillText(`1. Complete each level by popping all the bubbles`, this.canvas.width / 2, this.canvas.height * 0.25);
        this.ctx.fillText(`2. Press the left and right arrow keys to move`, this.canvas.width / 2, this.canvas.height * 0.4);
        this.ctx.fillText(`3. Press space to shoot a spike`, this.canvas.width / 2, this.canvas.height * 0.55);
        this.ctx.fillText(`4. Collect coins and finish levels early to earn more points`, this.canvas.width / 2, this.canvas.height * 0.7);
        this.ctx.fillText(`5. Good luck and have fun!`, this.canvas.width / 2, this.canvas.height * 0.85);
    }

    // character(){
    //     this.newCharacter= new homeScreenCharacter(this.canvas.width / 2 - 25, this.canvas.height - 50, this.ctx, this.canvas, this.canvasBackground);
    //     this.newCharacter.startLoop();
    // }

    // stopLoop(){
    //     this.newCharacter.stopLoop();
    // }
}
