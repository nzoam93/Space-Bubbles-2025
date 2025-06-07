import Bubble from "../bubble.js";
import LevelCore from "./levelCore.js";

export default class Level7 extends LevelCore{
    constructor(player){
        super(player);
        this.setInfo();
        this.createBubble();
        this.createBubbleDynamically(); //makes it much harder. creates bubble every 10 secs
    }

    setInfo(){
        document.getElementById("level").innerHTML = "Level: 7";
    }

    createBubble(){
        this.bubbles.push(new Bubble(700, this.canvas.height - 50,1,2,5));
        this.bubbles.push(new Bubble(50, this.canvas.height - 50,1,2,2));
        this.bubbles.push(new Bubble(600, this.canvas.height - 400,-1,2,5));
        this.bubbles.push(new Bubble(600, this.canvas.height - 50,-1,2,2));
        this.bubbles.push(new Bubble(500, this.canvas.height - 250,-1,2,4));
    }

    createBubbleDynamically(){
        setInterval(()=>{
            this.bubbles.push(new Bubble(500, this.canvas.height - 450,-1,2,5));
        }, 10000)
    }
}
