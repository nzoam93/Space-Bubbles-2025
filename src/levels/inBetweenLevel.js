export default class InBetweenLevel{
    constructor(timerMin, timerSecs, ctx, canvasBackground, score){
        this.timerMin = timerMin;
        this.timerSecs = timerSecs;
        this.ctx = ctx;
        this.canvasBackground = canvasBackground;
        this.score = score;
        this.setInfo();
        this.canvas = document.getElementById("game")
        this.countDown = 3;
        this.countDownLoop;
    }

    setInfo(){
        this.countDown = 3;
        this.canvas = document.getElementById("game");
        //clear the screen and draws the background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.canvasBackground,0,0);

        //write text
        // this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 100, 40);
        this.ctx.font = "32px Fantasy";
        this.ctx.fillText("Level Complete!", this.canvas.width/2, this.canvas.height * 0.3);
        this.ctx.fillText(`You got ${this.timerSecs * 10 + this.timerMin * 60} points for finishing ${this.timerSecs + this.timerMin * 60} secs early`, this.canvas.width/2, this.canvas.height * 0.5)
        this.ctx.fillText(`Next level in ${this.countDown}`, this.canvas.width/2, this.canvas.height * 0.7)
        this.countDownLoop = setInterval(this.setFlashingTime.bind(this),1000)
    }

    setFlashingTime(){
        this.countDown--;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.canvasBackground,0,0);
        // this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 100, 40);
        this.ctx.fillText("Level Complete!", this.canvas.width/2, this.canvas.height * 0.3);
        this.ctx.fillText(`You got ${this.timerSecs * 10 + this.timerMin * 60} points for finishing ${this.timerSecs + this.timerMin * 60} secs early`, this.canvas.width/2, this.canvas.height * 0.5)
        this.ctx.fillText(`Next level in ${this.countDown}`, this.canvas.width/2, this.canvas.height * 0.7)
        this.checkLoop();
    }

    checkLoop(){
        if(this.countDown < 2){
            clearInterval(this.countDownLoop);
        }
    }

}
