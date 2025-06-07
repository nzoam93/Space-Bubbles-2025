// import Player from "./playerWithoutAnimation.js";
// import Player from "./playerWithAnimation.js";
import Player1 from "./player1.js"
import Player2 from "./player2.js";
import SpikeController from "../spikeController.js";
import Bubble from "../bubble.js";
import Sound from "../sounds.js";
import Timer from "../timer.js";
import Level1 from "../levels/level1.js";
import Level2 from "../levels/level2.js";
import Level3 from "../levels/level3.js";
import Bonus from "../bonus.js";
import InBetweenLevel from "../levels/inBetweenLevel.js";
import EndGame from "../levels/endGame.js";
import Level4 from "../levels/level4.js";

export default class Game{
    constructor(canvas, ctx, canvasBackground){
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasBackground = canvasBackground;
        this.sound = new Sound();
        this.spikeController = new SpikeController();
        this.players = [];
        this.player1 = new Player1(canvas.width / 2 - 25, canvas.height - 50, this.spikeController, this.sound);
        this.player2 = new Player2(canvas.width / 2 + 25, canvas.height - 50, this.spikeController, this.sound);
        this.players.push(this.player1, this.player2);
        console.log(this.players);
        this.gameLength = 20; //used for timer
        this.timer = new Timer(this.gameLength);
        this.level;
        this.levelNumber = 1;
        this.bubbles;
        this.bonuses = [];

        this.score = 0;
        this.highScore = 0;
        this.gameSpeed = 60; //determines how many times a second the game runs
        this.paused = false;
        this.timedLoop; //used by game loop
    }

    startGame(){
        //starts at level 1
        this.level = new Level1(this.player1, this.player2); //setting it to level 1 when you first start the game
        this.bubbles = this.level.bubbles; //getting the array of bubbles defined in the level class

        //calls the game loop
        this.timedLoop = setInterval(this.gameLoop.bind(this), 1000 / this.gameSpeed);

        //this block is for restarting the game properly
        this.sound.playThemeSong();
        this.levelNumber = 1;
        this.score = 0;
        this.timer.startTime = this.gameLength;
        this.timer.countdownEl.style.color = "white";
        this.player1.lives = 3;
        this.player2.lives = 3;
        document.getElementById("lives").innerHTML = "Lives: 3";
        this.player1.immunity = 0;
        this.player2.immunity = 0;
    }

    //stopping the loop with the pause button
    pauseGame(){
        let pauseButton = document.getElementById("pauseButton");
        if (!this.paused){
            this.paused = true;
            clearInterval(this.timedLoop);
            pauseButton.innerHTML = "Resume";
            this.sound.pauseThemeSong();
        }
        else {
            this.paused = false;
            this.timedLoop = setInterval(this.gameLoop.bind(this), 1000 / this.gameSpeed);
            pauseButton.innerHTML = "Pause";
            this.sound.playThemeSong();
        }
    }

    //What should continuously happen throughout the game
    gameLoop(){
        //timer counts down the seconds
        this.timer.countdown();

        //clear the screen and draws the background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.canvasBackground,0,0);

        //draw the spikes, player
        this.spikeController.draw(this.ctx)
        this.player1.draw(this.ctx)
        this.player2.draw(this.ctx)



        //collision detection for bubbles
        this.bubbleAndSpikeCollision();
        this.bubbleAndTopCollision();

        //collision detection for player1
        this.bubbleAndPlayer1Collision();
        this.bonusAndPlayer1Collision();

        //collision detection for player2
        this.bubbleAndPlayer2Collision();
        this.bonusAndPlayer2Collision();

        //decrement immunity and draw shield if appropriate
        this.player1.immunity--;
        if(this.player1.lives > 0 && this.player1.immunity > 10) {
            this.player1.drawShield(this.ctx);
        }
        this.player2.immunity--;
        if(this.player2.lives > 0 && this.player2.immunity > 10) {
            this.player2.drawShield(this.ctx);
        }

        //drop bonuses when appropriate
        this.dropBonus();

        //update score and high score
        this.updateScore();

        //see if the level is over
        this.isLevelComplete();

        //see if the game is over
        this.gameOver();

    }

    //bubble and spike collision
    bubbleAndSpikeCollision(){
        this.bubbles.forEach((bubble) => {
            if(this.spikeController.collideWithBubble(bubble)){ //if there is a bubble collision with spike
                this.sound.poppedBubble();
                this.score += 50;

                //get rid of the current bubble
                const bubbleIndex = this.bubbles.indexOf(bubble);
                this.bubbles.splice(bubbleIndex, 1);

                //create two smaller bubbles
                let newBubbleSize = bubble.size - 1; //decrease the size of the bubble
                if(newBubbleSize > 0){
                    this.bubbles.push (new Bubble(bubble.xPos, bubble.yPos, 1, -2, newBubbleSize));
                    this.bubbles.push (new Bubble(bubble.xPos, bubble.yPos, -1, -2, newBubbleSize));
                }

                //bonus logic. Drop coin from medium bubbles; drop shield from big bubbles
                if(bubble.size > 2 && bubble.size < 5){
                    this.bonuses.push(new Bonus(this.ctx, bubble.xPos, bubble.yPos, "coin"));
                }
                else if(bubble.size === 5){
                    this.bonuses.push(new Bonus(this.ctx, bubble.xPos, bubble.yPos, "shield"));
                }
            }
            else {
                bubble.draw(this.ctx);
            }
        })
    }

    //if bubble goes off the screen
    bubbleAndTopCollision(){
        this.bubbles.forEach((bubble) => {
            if(bubble.hitTop()){
                this.sound.poppedBubble();
                this.score += 500;
                const bubbleIndex = this.bubbles.indexOf(bubble);
                this.bubbles.splice(bubbleIndex, 1);
            }
        })
    }

    //bubble collision with player 1
    bubbleAndPlayer1Collision(){
        this.bubbles.forEach((bubble) => {
            if(this.player1.collideWithBubble(bubble) && this.player1.immunity <= 0){
                this.player1.immunity = this.gameSpeed * 1.5; //gives you 1.5 seconds of immunity!
                this.player1.lives--;
                if(this.player1.lives >= 0){
                    document.getElementById("lives").innerHTML = `Lives: ${this.player1.lives}`;
                }
                this.sound.playerHit();
            }
        })
    }

     //bubble collision with player 2
     bubbleAndPlayer2Collision(){
        this.bubbles.forEach((bubble) => {
            if(this.player2.collideWithBubble(bubble) && this.player2.immunity <= 0){
                this.player2.immunity = this.gameSpeed * 1.5; //gives you 1.5 seconds of immunity!
                this.player2.lives--;
                if(this.player2.lives >= 0){
                    document.getElementById("lives").innerHTML = `Lives: ${this.player2.lives}`;
                }
                this.sound.playerHit();
            }
        })
    }


    //collecting bonus for player 1
    bonusAndPlayer1Collision(){
        this.bonuses.forEach((bonus) => {
            if(this.player1.collideWithBonus(bonus)){
                const bonusIndex = this.bonuses.indexOf(bonus);
                this.bonuses.splice(bonusIndex, 1);
                if(bonus.typeOfBonus === "coin"){
                    this.score += 100;
                }
                else if(bonus.typeOfBonus === "shield"){
                    //give 5 seconds of immunity
                    this.player1.immunity = this.gameSpeed * 5;
                }
            }
        })
    }

     //collecting bonus for player 2
     bonusAndPlayer2Collision(){
        this.bonuses.forEach((bonus) => {
            if(this.player2.collideWithBonus(bonus)){
                const bonusIndex = this.bonuses.indexOf(bonus);
                this.bonuses.splice(bonusIndex, 1);
                if(bonus.typeOfBonus === "coin"){
                    this.score += 100;
                }
                else if(bonus.typeOfBonus === "shield"){
                    //give 5 seconds of immunity
                    this.player2.immunity = this.gameSpeed * 5;
                }
            }
        })
    }

    dropBonus(){
        this.bonuses.forEach((bonus) => {
            bonus.draw();
            if(bonus.yPos > this.canvas.height){
                const bonusIndex = this.bonuses.indexOf(bonus);
                this.bonuses.splice(bonusIndex, 1);
            }
        })
    }

    //updates the score on the canvas
    updateScore(){
        this.ctx.font = "25px Fantasy";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 100, 40);
        if(this.score > this.highScore){
            this.highScore = this.score;
        }
        this.ctx.fillText(`High Score: ${this.highScore}`, this.canvas.width - 100, 80);
    }


    //performs logic if the level is complete
    isLevelComplete(){
        if(this.level.levelComplete()){
            //get points for finishing early
            this.score += this.timer.seconds * 10;

            //pause and unpause the game for 4 seconds
            this.pauseGame();
            new InBetweenLevel(this.timer.seconds, this.ctx, this.canvasBackground, this.score);
            setTimeout(this.pauseGame.bind(this), 4000); //bind so it doesn't lose context! Pauses the game for 4 secs

            //go to the next level or to the end of the game if finished all levels
            if (this.levelNumber === 1){
                this.level = new Level2(this.player1, this.player2);
            }
            else if(this.levelNumber === 2){
                this.level = new Level3(this.player1, this.player2)
            }
            else if(this.levelNumber === 3){
                this.level = new Level4(this.player1, this.player2)
            }
            else if(this.levelNumber === 4){
                new EndGame(this.score, this.ctx, this.canvasBackground);
            }

            this.levelNumber++; //use to increment it automatically
            this.timer.startTime = this.levelNumber * 20; //increase the timer count by 20 each level
            this.timer.countdownEl.style.color = "white" //puts it back to black if it was red before
            this.bubbles = this.level.bubbles; //actually makes the array so it can draw the bubbles!
        }
    }


    //gameOver logic
    gameOver(){
        if((this.player1.lives === 0) || (this.player2.lives === 0) || (this.timer.minutes <= 0 && this.timer.seconds <= 0)){
            this.sound.gameOver();
            new EndGame(this.score, this.ctx, this.canvasBackground);
            clearInterval(this.timedLoop);
            document.getElementById("pauseButton").style.display = "none";
            document.getElementById("playButton").style.display = "block";
            document.getElementById("playButton").innerHTML = "Restart"
            this.sound.pauseThemeSong();
        }
    }

    //muteGame function used by index.js for the onclick of mute button
    muteGame(){
        this.sound.muteAndUnmute();
    }
}
