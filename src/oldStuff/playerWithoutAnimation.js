export default class Player{
    constructor(xPos, yPos, spikeController, sound){
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = 50;
        this.height = 50;
        this.vel = 4;
        this.lives = 1;
        this.immunity = 0;
        this.spikeController = spikeController;
        this.sound = sound;

        //event listeners for the keystrokes
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx){
        //draw the updated character pos
        this.move();

        //creating the look of the character
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(this.xPos, this.yPos, this.height, this.width);
        ctx.fillStyle = "red";
        ctx.fillRect(this.xPos, this.yPos, this.height, this.width);

        //do the shoot function
        this.shoot();

    }

    move(){
        if(this.leftPressed){ //if it's true as defined below to be true when keying down
            this.xPos -= this.vel;
        }
        if(this.rightPressed){ //if it's true as defined below to be true when keying down
            this.xPos += this.vel;
        }
        this.wrapAround();
    }

    wrapAround(){
        let canvas = document.getElementById("game");
        if(this.xPos < 0){
            this.xPos = canvas.width;
        }
        else if(this.xPos > canvas.width){
            this.xPos = 0;
        }

    }

    keydown = (e) => {
        if(e.code === "ArrowLeft"){
            this.leftPressed = true;
        }
        if(e.code === "ArrowRight"){
            this.rightPressed = true;
        }
        if(e.code === "Space"){
            this.shootPressed = true;
            this.sound.projectile();
        }
    }

    keyup = (e) => {
        if(e.code === "ArrowLeft"){
            this.leftPressed = false;
        }
        if(e.code === "ArrowRight"){
            this.rightPressed = false;
        }
        if(e.code === "Space"){
            this.shootPressed = false;
        }
    }

    collideWithBubble(bubble){
        bubble.height = bubble.radius * 2; //defined so that a bubble with a radius can also work in the collision detection
        bubble.width = bubble.radius * 2;

        //xPos of bubble on a circle is the MIDDLE. So you need to subtract the radius
        if(this.xPos < bubble.xPos + bubble.width - bubble.radius &&
           this.xPos + this.width > bubble.xPos - bubble.radius &&
           this.yPos < bubble.yPos + bubble.height - bubble.radius &&
           this.yPos + this.height > bubble.yPos
        ){
            //collision detected
            // bubble.takeDamage(this.damage);
            return true;
        }
        return false;
    }

    collideWithBonus(bonus){
        console.log()
        if(this.xPos < bonus.xPos + bonus.width &&
            this.xPos + this.width > bonus.xPos &&
            this.yPos < bonus.yPos + bonus.height &&
            this.yPos + this.height > bonus.yPos
         ){
             return true;
         }
         return false;
    }

    shoot(){
        if(this.shootPressed){
            const speed = 5;
            const delay = 7; //for delay between spikes
            const damage = 1;
            const spikeX = this.xPos + this.width / 2;
            const spikeY = this.yPos;
            this.spikeController.shoot(spikeX, spikeY, speed, damage, delay);
        }
    }


}
