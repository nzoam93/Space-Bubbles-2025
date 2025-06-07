export default class EndGame{
    constructor(score, ctx, canvasBackground){
        this.score = score;
        this.ctx = ctx;
        this.canvasBackground = canvasBackground;
        this.setInfo();
    }

    setInfo(){
        let canvas = document.getElementById("game");
        //clear the screen and draws the background
            // this.ctx.fillRect(0, 0, canvas.width, canvas.height);
            // this.ctx.drawImage(this.canvasBackground,0,0);

        //write text
        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`GAME OVER`, canvas.width/2, canvas.height * 0.3);
        this.ctx.fillText(`Click "Restart" to play again`, canvas.width/2, canvas.height * 0.6);

    }



}
