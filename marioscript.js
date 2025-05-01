"use strict"

const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.backgroundImage = "url('marioimages/background.png')";

const context = canvas.getContext("2d");


//PLAYER CREATION

let gravity = 0.8;
let offset = 0;

class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.width = 50;
        this.height = 50;
        this.velocity = { x: 0, y: 1 };
    }

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    playerMovement() {
        if (this.position.y + this.velocity.y + this.height >= canvas.height + 20) {
            this.velocity.y = 0;
            alert("Game Over!!!")
            this.position.x = 100;
            this.position.y = 100;
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

const playerFigure = new Player();

const platformsArray = [];
let first = new Image();
let second = new Image();
first.src = "marioimages/platform.png";
second.src = "marioimages/platformSmallTall.png"
const platformFigure = new Platform(0, 500, 600, 150, first);
const platformFigure2 = new Platform(750, 450, 300, second.width, second);
const platformFigure3 = new Platform(1200, 500, 600, 150, first);

platformsArray.push(platformFigure);
platformsArray.push(platformFigure2);
platformsArray.push(platformFigure3);

//PLAYER MOVEMENT JUMP, LEFT, RIGHT
addEventListener("keydown", function (event) {
    if (event.key == "ArrowRight") {
        playerFigure.velocity.x = 5;
        if (playerFigure.position.x + playerFigure.width >= 300)
            moveOffset(-5);
    }


    if (event.key == "ArrowLeft") {
        playerFigure.velocity.x = -5;
        if (playerFigure.position.x + playerFigure.width <= 600)
            moveOffset(5);
    }

    if (event.key == "ArrowUp")
        playerFigure.velocity.y = -20;
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