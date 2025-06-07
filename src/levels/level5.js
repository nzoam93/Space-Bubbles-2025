import Bubble from "../bubble.js";
import LevelCore from "./levelCore.js";

export default class Level5 extends LevelCore{
    constructor(player){
        super(player);
        this.setInfo();
        this.createBubble();
    }

    setInfo(){
        document.getElementById("level").innerHTML = "Level: 5";
    }

    createBubble(){
        //creates a bunch of small/medium bubbles going to the right
        for(let i = 1; i < 11; i++){
            this.bubbles.push(new Bubble((this.canvas.width * i * 0.04), this.canvas.height - 50, 1, 2, (i%2) + 1 )); //changing the last number to alternate between 1 and 2 (small and medium bubbles)
        }

        //creates a bunch of small/medium bubbles going to the left
        for(let i = 1; i < 11; i++){
            this.bubbles.push(new Bubble((this.canvas.width - (this.canvas.width * i * 0.04)), this.canvas.height - 50, -1, 2, (i%2) + 1));
        }
    }
}
