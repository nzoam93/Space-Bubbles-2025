import Bubble from "../bubble.js";

export default class Level4{
    constructor(player1, player2){
        this.numBubbles = 50; //I don't think I actually need this one
        this.bubbles = [];
        this.player1 = player1;
        this.player2 = player2;
        this.canvas = document.getElementById("game");
        this.setInfo();
        this.createBubble();
        this.createBubbleDynamically(); //makes it much harder. creates bubble every 10 secs
    }

    setInfo(){
        document.getElementById("level").innerHTML = "Level: 4";
        this.player1.xPos = this.canvas.width / 2 - 25;
        this.player2.xPos = this.canvas.width / 2 + 25;
    }

    createBubble(){
        this.bubbles.push(new Bubble(700, this.canvas.height - 50,1,2,5));
        this.bubbles.push(new Bubble(50, this.canvas.height - 50,1,2,2));
        this.bubbles.push(new Bubble(600, this.canvas.height - 400,-1,2,5));
        this.bubbles.push(new Bubble(600, this.canvas.height - 50,-1,2,2));
        this.bubbles.push(new Bubble(500, this.canvas.height - 250,-1,2,4));
    }

    createBubbleDynamically(){
        let canvas = document.getElementById("game");
        setInterval(()=>{
            this.bubbles.push(new Bubble(500, this.canvas.height - 450,-1,2,5));
        }, 10000)
    }

    levelComplete(){
        return this.bubbles.length === 0;
    }
}
