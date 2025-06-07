// import Player from "./playerWithoutAnimation.js";
import Player from "./playerWithAnimation.js";
import SpikeController from "./spikeController.js";
import Bubble from "./bubble.js";
import Sound from "./sounds.js";
import Timer from "./timer.js";
import Bonus from "./bonus.js";
import InBetweenLevel from "./levels/inBetweenLevel.js";
import EndGame from "./levels/endGame.js";
import Level1 from "./levels/level1.js";
import Level2 from "./levels/level2.js";
import Level3 from "./levels/level3.js";
import Level4 from "./levels/level4.js";
import Level5 from "./levels/level5.js";
import Level6 from "./levels/level6.js";
import Level7 from "./levels/level7.js";


export default class Game{
    constructor(canvas, ctx, canvasBackground){
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasBackground = canvasBackground;
        this.sound = new Sound();
        this.spikeController = new SpikeController();
        this.player = new Player(canvas.width / 2 - 15, canvas.height - 50, this.spikeController, this.sound);
        this.gameLength = 20; //used for timer
        this.timer = new Timer(this.gameLength);
        this.level;
        this.levelNumber = 1;
        this.bubbles;
        this.bonuses = [];
        this.numBubblesPopped = 0;

        this.score = 0;
        this.highScore = 0;
        this.gameSpeed = 60; //determines how many times a second the game runs
        this.paused = false;
        this.timedLoop; //used by game loop
    }

    startGame(){

        //allows for the tilting to be counted by the phone
        this.player.setupTiltControl();

        //sets the background to not be blurry
        this.canvasBackground.src = './imgs/background.png';

        //hides the bonusInfo button
        document.getElementById("bonusInfo").style.display = "none";

        //starts at level 1
        this.level = new Level1(this.player); //setting it to level 1 when you first start the game
        this.bubbles = this.level.bubbles; //getting the array of bubbles defined in the level class

        //calls the game loop
        this.timedLoop = setInterval(this.gameLoop.bind(this), 1000 / this.gameSpeed);

        //this block is for restarting the game properly
        this.sound.playThemeSong();
        this.levelNumber = 1;
        this.score = 0;
        this.timer.startTime = this.gameLength;
        this.timer.countdownEl.style.color = "white";
        this.player.lives = 3;
        document.getElementById("lives").innerHTML = "Lives: 3";
        this.player.immunity = 0;
        this.spikeController.numSpikesAllowed = 1;
        this.numBubblesPopped = 0;
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
        this.player.draw(this.ctx)


        //collision detection
        this.bubbleAndSpikeCollision();
        this.bubbleAndPlayerCollision();
        this.bubbleAndTopCollision();
        this.bonusAndPlayerCollision();

        //decrement immunity and draw shield if appropriate
        this.player.immunity--;
        if(this.player.lives > 0 && this.player.immunity > 10) {
            this.player.drawShield(this.ctx);
        }

        //drop bonuses when appropriate
        this.dropBonus();

        //update score and high score
        this.updateScore();

        //update numBubbles popped
        this.ctx.fillText(`Bubbles Popped: ${this.numBubblesPopped}`, this.canvas.width - 120, 40);

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
                this.numBubblesPopped += 1;
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
                else if(this.numBubblesPopped % 75 === 0){ //every 75 bubbles, allow user to use one more spike!
                    this.bonuses.push(new Bonus(this.ctx, bubble.xPos, bubble.yPos, "twoSpike"));
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

    //bubble collision with player
    bubbleAndPlayerCollision(){
        this.bubbles.forEach((bubble) => {
            if(this.player.collideWithBubble(bubble) && this.player.immunity <= 0){
                this.player.immunity = this.gameSpeed * 1.5; //gives you 1.5 seconds of immunity!
                this.player.lives--;
                if(this.player.lives >= 0){
                    document.getElementById("lives").innerHTML = `Lives: ${this.player.lives}`;
                }
                this.sound.playerHit();
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

    //collecting bonus
    bonusAndPlayerCollision(){
        this.bonuses.forEach((bonus) => {
            if(this.player.collideWithBonus(bonus)){
                const bonusIndex = this.bonuses.indexOf(bonus);
                this.bonuses.splice(bonusIndex, 1);
                if(bonus.typeOfBonus === "coin"){
                    this.score += 100;
                }
                else if(bonus.typeOfBonus === "shield"){
                    //give 5 seconds of immunity
                    this.player.immunity = this.gameSpeed * 5;
                }
                else if(bonus.typeOfBonus === "twoSpike"){
                    //allows user to use one more spike
                    this.spikeController.numSpikesAllowed += 1;
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
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 100, 80);
        if(this.score > this.highScore){
            this.highScore = this.score;
        }
        this.ctx.fillText(`High Score: ${this.highScore}`, this.canvas.width - 100, 120);
    }


    //performs logic if the level is complete
    isLevelComplete(){
        if(this.level.levelComplete()){
            //get points for finishing early
            this.score += (this.timer.seconds * 10 + this.timer.minutes * 60);

            //pause and unpause the game for 3 seconds
            this.pauseGame();
            new InBetweenLevel(this.timer.minutes, this.timer.seconds, this.ctx, this.canvasBackground, this.score);
            setTimeout(this.pauseGame.bind(this), 3000); //bind so it doesn't lose context! Pauses the game for 4 secs

            //go to the next level or to the end of the game if finished all levels
            if (this.levelNumber === 1){
                this.level = new Level2(this.player);
            }
            else if(this.levelNumber === 2){
                this.level = new Level3(this.player);
            }
            else if(this.levelNumber === 3){
                this.level = new Level4(this.player);
            }
            else if(this.levelNumber === 4){
                this.level = new Level5(this.player);
            }
            else if(this.levelNumber === 5){
                this.level = new Level6(this.player);
            }
            else if(this.levelNumber === 6){
                this.level = new Level7(this.player);
            }
            else if(this.levelNumber === 7){
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
        if((this.player.lives === 0) || (this.timer.minutes <= 0 && this.timer.seconds <= 0)){
            this.sound.gameOver();
            new EndGame(this.score, this.ctx, this.canvasBackground);
            clearInterval(this.timedLoop);
            document.getElementById("pauseButton").style.display = "none";
            document.getElementById("playButton").style.display = "block";
            document.getElementById("homeScreen").style.display = "block";
            document.getElementById("playButton").innerHTML = "Restart"
            this.sound.pauseThemeSong();
        }
    }

    //muteGame function used by index.js for the onclick of mute button
    muteGame(){
        this.sound.muteAndUnmute();
    }
}
