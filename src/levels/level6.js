import Bubble from "../bubble.js";
import LevelCore from "./levelCore.js";

export default class Level6 extends LevelCore{
    constructor(player){
        super(player);
        this.setInfo();
        this.createBubble();
    }

    setInfo(){
        document.getElementById("level").innerHTML = "Level: 6";
    }

    createBubble(){
        //creates a bunch of small/medium bubbles going to the right
        for(let i = 1; i < 11; i++){
            this.bubbles.push(new Bubble((this.canvas.width * i * 0.04), this.canvas.height - 50, 1, 2, (i%3) + 1 )); //changing the last number to alternate between 1, 2, 3 (small and medium and large bubbles)
        }

        //creates a bunch of small/medium bubbles going to the left
        for(let i = 1; i < 11; i++){
            this.bubbles.push(new Bubble((this.canvas.width - (this.canvas.width * i * 0.04)), this.canvas.height - 50, -1, 2, (i%3) + 1));
        }
    }
}
