export default class Timer{
    constructor(startTime){
        this.startTime = startTime;
        this.countdownEl = document.getElementById("timer");
        this.delayTime = 60; //way of getting around the game loop being 60 times faster
        this.minutes;
        this.seconds;
        this.secondsToDisplay;
    }

    countdown(){
        this.minutes = Math.floor(this.startTime / 60);
        this.seconds = this.startTime % 60;

        //displays the 0 at the beginning of the seconds
        (this.seconds < 10) ? this.secondsToDisplay = "0" + this.seconds : this.secondsToDisplay = this.seconds;

        //makes the clock red to alert players that they are low on time
        if(this.minutes === 0 && this.seconds < 10){
            this.countdownEl.style.color = "red";
        }

        this.countdownEl.innerHTML = `${this.minutes}:${this.secondsToDisplay}`;

        this.delayTime--;
        if(this.delayTime <= 0){ //bad fix for the game loop being faster
            this.delayTime = 60;
            this.startTime--;
        }
    }
}
