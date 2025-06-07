//defined outside so it only has to load once
const coin = new Image();
coin.src = "./imgs/coin.png";

const shield = new Image();
shield.src = "./imgs/shield.png";

const twoSpike = new Image();
twoSpike.src = "./imgs/twoSpike.png";

export default class Bonus{
    constructor(ctx, bubbleX, bubbleY, typeOfBonus){
        this.ctx = ctx;
        this.xPos = bubbleX;
        this.yPos = bubbleY;
        this.typeOfBonus = typeOfBonus
        this.width = 20
        this.height = 20
        this.vel = 0;
        this.acc = 0.01;
        this.imgToDraw;
    }


    draw(){
        if(this.typeOfBonus === "coin") this.imgToDraw = coin;
        else if(this.typeOfBonus === "shield") this.imgToDraw = shield;
        else if(this.typeOfBonus === "twoSpike"){
            this.imgToDraw = twoSpike;
            this.width = 30; //harder to see this particular bonus so I increased the size
            this.height = 30;
        }


        this.yPos += this.vel;
        this.vel += this.acc;
        this.ctx.drawImage(this.imgToDraw, this.xPos, this.yPos, this.width, this.height);
    }
}
