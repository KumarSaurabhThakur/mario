"use strict"

const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.backgroundImage = "url('marioimages/background.png')";

const context = canvas.getContext("2d");


//PLAYER CREATION

let gravity = 0.8;
let offset = 0;
let key = "";

class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.width = 80;
        this.height = 177;
        this.velocity = { x: 0, y: 1 };
        this.frames = 1;
    }

    draw() {
        if (this.velocity.y == 0 && this.velocity.x == 0) {
            if (key == "right")
                context.drawImage(marioStandingRight, 177 * this.frames, 0, 177, 400, this.position.x, this.position.y, this.width, this.height);
            if (key == "left")
                context.drawImage(marioStandingLeft, 177 * this.frames, 0, 177, 400, this.position.x, this.position.y, this.width, this.height);
        }
        if (this.velocity.x > 0)

            context.drawImage(marioMovingRight, 340 * this.frames, 0, 340, 400, this.position.x, this.position.y, 155, 185);
        if (this.velocity.x < 0)
            context.drawImage(marioMovingLeft, 340 * this.frames, 0, 340, 400, this.position.x, this.position.y, 155, 185);

    }

    playerMovement() {
        this.frames++;
        if (this.frames > 24)
            this.frames = 1;


        if (this.position.y + this.velocity.y + this.height >= canvas.height + 60) {
            this.velocity.y = 0;
            alert("Game Over!!!")
            window.location.reload();
        }

        else
            this.velocity.y += gravity;


        //PLATFORM SITTING CONDITIONS
        for (let i = 0; i < platformsArray.length; i++) {
            if ((this.position.x + this.velocity.x + this.width >= platformsArray[i].position.x - 6)
                && (this.position.x + this.velocity.x <= platformsArray[i].position.x + platformsArray[i].width + 6)
                && (this.position.y + this.velocity.y + this.height >= platformsArray[i].position.y)
                && (this.position.y + this.velocity.y <= platformsArray[i].position.y + 10))
                this.velocity.y = 0;

            if ((this.position.x + this.width >= platformsArray[i].position.x)
                && (this.position.x <= platformsArray[i].position.x + platformsArray[i].width)
                && (this.position.y + this.velocity.y + this.height >= platformsArray[i].position.y)
                && (this.position.y + this.velocity.y + this.height <= platformsArray[i].position.y + platformsArray[i].height))
                this.velocity.x = 0;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }

}


// PLATFORM CREATION   
class Platform {
    constructor(x, y, width, height, image) {
        this.position = { x: x, y: y }
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw() {
        let platforms = new Image();
        //platforms.src = "marioimages/platform.png";
        context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.position.x, this.position.y, this.width, this.height);
    }
}


//HILLS CREATION
class Hills {
    constructor() {
        this.position = { x: 0, y: 0 };
    }

    draw() {
        let hills = new Image();
        hills.src = "marioimages/hills.png";
        context.drawImage(hills, this.position.x, this.position.y);
    }
}


const hillsFigure = new Hills();

let marioStandingRight = new Image();
marioStandingRight.src = "marioimages/spriteStandRight.png";

let marioStandingLeft = new Image();
marioStandingLeft.src = "marioimages/spriteStandLeft.png";

let marioMovingRight = new Image();
marioMovingRight.src = "marioimages/spriteRunRight.png";

let marioMovingLeft = new Image();
marioMovingLeft.src = "marioimages/spriteRunLeft.png";

const platformsArray = [];
let first = new Image();
let second = new Image();
first.src = "marioimages/platform.png";
second.src = "marioimages/platformSmallTall.png"
const platformFigure = new Platform(0, 500, 600, 150, first);
const platformFigure2 = new Platform(platformFigure.width - 4, 500, 600, 150, first);
const platformFigure3 = new Platform(platformFigure.width * 2 + 80, 450, 300, second.width, second);
const platformFigure4 = new Platform(platformFigure.width * 2 + second.width + 82, 500, 600, 150, first);
const platformFigure5 = new Platform(platformFigure.width * 3 + second.width - 4, 500, 600, 150, first);

platformsArray.push(platformFigure);
platformsArray.push(platformFigure2);
platformsArray.push(platformFigure3);
platformsArray.push(platformFigure4);
platformsArray.push(platformFigure5);

const playerFigure = new Player();
playerFigure.draw();

//PLAYER MOVEMENT JUMP, LEFT, RIGHT
addEventListener("keydown", function (event) {
    if (event.key == "ArrowRight") {
        key = "right";
        playerFigure.velocity.x = 5;
        if (playerFigure.position.x + playerFigure.width >= 300)
            moveOffset(-5);
        if (playerFigure.position.x >= 500)
            playerFigure.position.x = 500;
    }

    if (event.key == "ArrowLeft") {
        key = "left";
        playerFigure.velocity.x = -5;
        if (playerFigure.position.x + playerFigure.width <= 600)
            moveOffset(5);
    }

    if (event.key == "ArrowUp") {
        key = "up";
        playerFigure.velocity.y = -20;
    }
})

addEventListener("keyup", function (event) {
    if (event.key == "ArrowRight")
        playerFigure.velocity.x = 0;

    if (event.key == "ArrowLeft")
        playerFigure.velocity.x = 0;
})


//GAME ANIMATION
function gameAnimation() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    hillsFigure.draw();

    for (let i = 0; i < platformsArray.length; i++)
        platformsArray[i].draw();

    playerFigure.playerMovement();
    playerFigure.draw();

    requestAnimationFrame(gameAnimation);
}


function moveOffset(x) {
    offset = x;
    hillsFigure.position.x += x;
    for (let i = 0; i < platformsArray.length; i++) {
        platformsArray[i].position.x += x;

    }
}

gameAnimation();
