//imports
import Game from "./game.js";
import BonusInfo from "./levels/bonusInfo.js";
import Homescreen from "./levels/homeScreen.js";

//defining canvas
const canvas = document.getElementById("game");
canvas.width = 1000;
canvas.height = 500;
const canvasBackground = new Image();
canvasBackground.src = './imgs/background.png'
const ctx = canvas.getContext("2d");
let homeScreen;

//image is asyncrhonous. It hasn't loaded yet. Thus, we need an onload
canvasBackground.onload = ()=> {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const pattern = ctx.createPattern(canvasBackground, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    homeScreen = new Homescreen(canvas, ctx, canvasBackground);
}

//setting displays to not show up yet
document.getElementById("pauseButton").style.display = "none";
document.getElementById("level").style.display = "none";
document.getElementById("lives").style.display = "none";
document.getElementById("timer").style.display = "none";

//initializing the currentGame
const currentGame = new Game(canvas, ctx, canvasBackground);

//calling newGame upon click
const playButton = document.getElementById("playButton");
playButton.addEventListener("click", ()=>{
    //starts the game
    currentGame.startGame();

    //resets the context shadow
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 5;

    //sets the display of these elements as block
    document.getElementById("pauseButton").style.display = "block";
    document.getElementById("level").style.display = "block";
    document.getElementById("lives").style.display = "block";
    document.getElementById("timer").style.display = "block";

    //sets the display of these elements to be none
    playButton.style.display = "none";
    document.getElementById("bonusInfo").style.display = "none";
    document.getElementById("homeScreen").style.display = "none";

})

//calling bonusInfo upon click
const bonusButton = document.getElementById("bonusInfo");
bonusButton.addEventListener("click", () => {
    new BonusInfo(canvas, ctx, canvasBackground);
})

//calling homescreen upon click
const homeButton = document.getElementById("homeScreen");
homeButton.addEventListener("click", () => {
    // new Homescreen(canvas, ctx, canvasBackground);
    homeScreen.setInfo();
    document.getElementById("bonusInfo").style.display = "block";
})

//calling pauseGame upon click
const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", () => {
    currentGame.pauseGame();
})

//calling muteGame upon click
const muteButton = document.getElementById("muteButton");
muteButton.addEventListener("click", () => {
    currentGame.muteGame();
})

//for responsive canvas:
//https://javascript.plainenglish.io/how-to-resize-html5-canvas-to-fit-the-window-26935bf301c4
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight * 0.75
// let bottomPart = document.getElementById("bottomPart");
// window.addEventListener('resize', () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight * 0.75
//       bottomPart.style.width = window.innerWidth
//     })
