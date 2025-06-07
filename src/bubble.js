export default class Bubble {
    colors = [
        "red",
        "orange",
        "green",
        "blue",
        "white",
        "turquoise"
    ];

    constructor(xPos, yPos, xVel, yVel, size){
        //positioning stuff
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.acc = 0.03;
        this.maxHeightReached = false;

        //misc stuff
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.size = size;
        this.bonuses = [];
        this.radius = this.sizeDetermination();
        this.heightAllowed = this.heightDetermination();
        this.delay = 60; //used for when a bubble spawns to allow it to go up for one second
        this.canvas = document.getElementById("game");
    }

    //determines how big the bubble is (its radius)
    sizeDetermination(){
        if(this.size === 1) return 5; //smallest bubble
        else return (this.size - 1) * 10; //bigger bubbles
    }

    //determines how high the bubble can go before coming back down
    heightDetermination(){
        if(this.size === 1) return 110;
        else return (110 + this.size * 50);
    }

    //draws the bubble. This is called in the game loop for each bubble
    draw(ctx){
        ctx.fillStyle = this.color;
        this.hitWall(ctx);
        this.hitGround(ctx);
        this.hitUpperLimit(ctx);
        this.xPos += this.xVel;
        this.yPos += this.yVel;

        //only do the acceleration if it has reached the max height
        if(this.yPos < (this.canvas.height - this.heightAllowed + 110)){ //offset so gravity can start to do something first
            this.maxHeightReached = true;
        }
        if(this.maxHeightReached){
            this.yVel += this.acc;
        }

        //actually draw the circle
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        //draw a shiny inner part
            // ctx.fillStyle = "white";
            // ctx.beginPath();
            // ctx.arc(this.xPos - this.radius * 0.4, this.yPos + this.radius * 0.4, 2, 0, 2 * Math.PI);
            // ctx.stroke();
            // ctx.fill();
    }

    //turn around if it hits the wall
    hitWall(){
        if(this.xPos - this.radius < 0){
            this.xVel = -this.xVel;
        }
        else if (this.xPos > this.canvas.width - this.radius){
            this.xVel = -this.xVel;
        }
    }

    //turn around if it hits the ground
    hitGround(){
        if(this.yPos > this.canvas.height - this.radius){
            this.yVel = -this.yVel;
        }
    }

    //turn around if it has gone too high for its bubble type
    hitUpperLimit(){
        //decrements the delay count (note: the delay is there so the bubble doesn't immediately come down)
        if(this.delay > 0) this.delay--;


        //first conditional checks to see if it's too high
        //second conditional checks to see if it's going up
        //third conditional makes sure it waits a second before causing it to come back down
        if((this.yPos < this.canvas.height - this.heightAllowed) && (this.yVel < 0) && (this.delay <= 0)){
            this.yVel = 0;
            // this.yVel = -this.yVel //this is the previous logic (without gravity)
        }
    }

    //returns true if the bubble has reached the top of the screen. Used in the game loop
    hitTop(){
        return this.yPos < this.radius //if any part if it touches the top
    }
}
