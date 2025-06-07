export default class Sound{
    constructor(){
        this.isMuted = true; //during testing, keeping it muted
        this.backgroundMusic = new Audio("./sounds/Superhero_violin.ogg");
        this.gameOverSound = new Audio("./sounds/gameOver.ogg");
        this.laserSound = new Audio("./sounds/laser4.wav");
        this.ow = new Audio("./sounds/ow.m4a");
        this.pop = new Audio("./sounds/bubblePop.m4a")
    }

    playThemeSong(){
        if(!this.isMuted){
            this.backgroundMusic.play();
            this.backgroundMusic.loop = true;
        }
    }

    pauseThemeSong(){
        this.backgroundMusic.pause();
    }

    gameOver(){
        if(!this.isMuted){
            this.gameOverSound.play();
        }
    }

    projectile(){ //currently, this is controlled with a NEW SOUND separately in the player class. This isn't quite right
        if(!this.isMuted){
            this.laserSound.play();
        }
    }

    playerHit(){
        if(!this.isMuted){
            this.ow.play();
        }
    }

    poppedBubble(){
        if(!this.isMuted){
            this.pop.play();
        }
    }

    muteAndUnmute(){
        if(this.isMuted){
            this.isMuted = false;

            // test1.style.backgroundImage="url('./imgs/mute.png')";
            this.playThemeSong();
        }
        else{
            this.isMuted = true;

            // test.style.backgroundImage="url('./imgs/volume.png')";
            this.pauseThemeSong();
        }
    }
}
