import Bubble from "../bubble.js";
import LevelCore from "./levelCore.js";

    export default class Level2 extends LevelCore{
        constructor(player){
            super(player);
            this.setInfo();
            this.createBubble();
        }

        setInfo(){
            document.getElementById("level").innerHTML = "Level: 2";
        }

        createBubble(){
            this.bubbles.push(new Bubble(50,this.canvas.height - 50,1,2,4));
            this.bubbles.push(new Bubble(100,this.canvas.height - 50,1,2,2));
        }
    }
