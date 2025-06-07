import Bubble from "../bubble.js";
import LevelCore from "./levelCore.js";

export default class Level4 extends LevelCore{
    constructor(player){
        super(player);
        this.setInfo();
        this.createBubble();
    }

    setInfo(){
        document.getElementById("level").innerHTML = "Level: 4";
    }

    createBubble(){
        //creates a bunch of small bubbles going to the right
        for(let i = 1; i < 11; i++){
            this.bubbles.push(new Bubble((this.canvas.width * i * 0.04), this.canvas.height - 50, 1, 2, 1));
        }

        //creates a bunch of small bubbles going to the left
        for(let i = 1; i < 11; i++){
            this.bubbles.push(new Bubble((this.canvas.width - (this.canvas.width * i * 0.04)), this.canvas.height - 50, -1, 2, 1));
        }
    }
}
