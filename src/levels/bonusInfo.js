//commented out code is for homescreen character import if using homescreen character walking around on homescreen

// import homeScreenCharacter from "../playerHomeScreen.js";

export default class BonusInfo{
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
        document.getElementById("homeScreen").style.display = "block";
        document.getElementById("bonusInfo").style.display = "none";


        //to make it blurry, comment in the below line
        // this.canvasBackground.src = './imgs/blurredBackground.png'
         //clear the screen and draws the background
         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
         this.ctx.drawImage(this.canvasBackground,0,0);

        this.ctx.font = "40px Fantasy";
        this.ctx.fillStyle = "orange";
        this.ctx.textAlign = "center";
        // this.ctx.shadowColor = "black";
        // this.ctx.shadowOffsetX = 10;
        // this.ctx.shadowOffsetY = 10;
        // this.ctx.shadowBlur = 10;
        this.ctx.fillText(`Bonus Info:`, this.canvas.width / 2, this.canvas.height * 0.1);

        this.ctx.font = "30px Fantasy";
        this.ctx.fillText(`Popping bubbles gives you bonuses:`, this.canvas.width / 2, this.canvas.height * 0.25);
        this.ctx.fillText(`Medium/Large Bubbles: coin (worth 100 points)`, this.canvas.width / 2, this.canvas.height * 0.4);
        this.ctx.fillText(`X-Large Bubbles: Shield (5 seconds of immunity)`, this.canvas.width / 2, this.canvas.height * 0.55);
        this.ctx.fillText(`Every 75 Bubbles: Extra Spike (lets you shoot more than one spike)`, this.canvas.width / 2, this.canvas.height * 0.7);
    }

    // character(){
    //     this.newCharacter= new homeScreenCharacter(this.canvas.width / 2 - 25, this.canvas.height - 50, this.ctx, this.canvas, this.canvasBackground);
    //     this.newCharacter.startLoop();
    // }

    // stopLoop(){
    //     this.newCharacter.stopLoop();
    // }
}
