import Bubble from "../bubble.js";
import LevelCore from "./levelCore.js";

export default class Level3 extends LevelCore{
    constructor(player){
        super(player);
        this.setInfo();
        this.createBubble();
    }

    setInfo(){
        document.getElementById("level").innerHTML = "Level: 3";
    }

    createBubble(){
        this.bubbles.push(new Bubble(700, this.canvas.height - 50,1,2,5));
        this.bubbles.push(new Bubble(50, this.canvas.height - 50,1,2,2));
    }
}
