import Bubble from "../bubble.js";

export default class Level1{
    constructor(player1, player2){//player used in other levels, so I just kept it consistent here
        this.player1 = player1;
        this.player2 = player2
        this.bubbles = [];
        this.canvas = document.getElementById("game");

        this.setInfo();
        this.createBubble();
    }

    setInfo(){
        document.getElementById("level").innerHTML = "Level: 1";
        this.player1.xPos = this.canvas.width / 2 - 25;
        this.player2.xPos = this.canvas.width / 2 + 25;
    }

    createBubble(){
        this.bubbles.push(new Bubble(100,this.canvas.height - 50,1,2,2));
    }

    levelComplete(){
        return this.bubbles.length === 0;
    }
}
