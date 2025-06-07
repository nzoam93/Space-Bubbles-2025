export default class LevelCore{
    constructor(player){
        this.player = player;
        this.bubbles = [];
        this.canvas = document.getElementById("game");
        this.setPlayerPosition();
    }

    setPlayerPosition(){
        this.player.xPos = this.canvas.width / 2 - 25;
        // this.player1.xPos = this.canvas.width / 2 - 25;
        // this.player2.xPos = this.canvas.width / 2 + 25;
    }

    levelComplete(){
        return this.bubbles.length === 0;
    }
}
