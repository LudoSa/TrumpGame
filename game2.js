// Create the canvas
//var canvas = document.createElement("canvas");
//var ctx = canvas.getContext("2d");

let mapHeroCanvas = document.getElementById("mapHerolayer");
let mexicanCanvas = document.getElementById("enemyLayer");

let mapHeroCtx = mapHeroCanvas.getContext("2d");
let mexicanCtx = mexicanCanvas.getContext("2d");

//start the timer
startTime = new Date();


document.body.appendChild(mapHeroCanvas);


// Background images
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "Ressources/Images/bg.png";

let bgWallCrush = new Image();
bgWallCrush.src ="Ressources/Images/bgWallCrush.png";

let bgWall = new Image();
bgWall.src = "Ressources/Images/bgWall.png";

let mapOrganisation = [bgWallCrush, bgWallCrush, bgImage, bgImage];

//Starting the game on the third map
//Use for change the map
let mapNumber = 2;

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
}
heroImage.src = "Ressources/Images/Trump.png";




// mexican image
var mexicanReady = false;
var mexicanImage = new Image();
mexicanImage.onload = function () {
	mexicanReady = true;
}
mexicanImage.src = "Ressources/Images/Mexican.png";


// mexican image DEAD
var mexicanDead = false ;
var mexicanImageDEAD = new Image();
mexicanImageDEAD.onload = function () {
	mexicanDead = true;
}
mexicanImageDEAD.src = "Ressources/Images/MexicanDown.png";

// mexican image FLIP
var mexicanFlipReady = false;
var mexicanFlipImage = new Image();
mexicanFlipImage.onload = function () {
	mexicanFlipReady = true;
}
mexicanFlipImage.src = "Ressources/Images/MexicanFlip.png";


// Brick image
let brickReady = false;
let brickImage = new Image();
brickImage.onload = function(){
    brickReady = true;
}
brickImage.src = "Ressources/Images/Brick.png";


// Bullet image
let bulletReady = false;
let bulletImage = new Image();
bulletImage.onload = function(){
    bulletReady = true;
}
bulletImage.src = "Ressources/Images/bulletSmall.png";

// Game objects *******************************************************v

let bricksCount = 0;
let totalMexicansKills = 0;

let spawnBrick = true;

let heroHealth = document.getElementById("health");

let shotAudio = new Audio("Ressources/audio/shot.mp3");


let bullets = [];
let mexicans = [];

let hero = {
	speed: 512, // movement in pixels per second
    size: 30,
    x: mapHeroCanvas.width / 2,
	y: mapHeroCanvas.height / 2,
    angle: 0,
    heroHealth: heroHealth
}


class Bullet{
    constructor(angle) {
        this.visible = true;
        this.x = hero.x;
        this.y = hero.y;
        this.angle = angle;
        this.height = 6;
        this.width = 6;
        this.speed = 7;
        this.velX = 0;
        this.velY = 0;
    }
    Update(){
        let radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }
    Draw(){
        ds.fillStyle = 'black';
        ds.fillRect(this.x,this.y,this.width,this.height);
    }
}

class mexican{
    constructor() {
        this.x= 32 + (Math.random() * (mapHeroCanvas.width - 64));
        this.y= 32 + (Math.random() * (mapHeroCanvas.width - 64));
        this.speed= 18;
        this.life= 2 ;
        this.dead = false;
        this.image = mexicanImage;
    }
}

let brick = {
}


// Handle keyboard controls
var keysDown = {};

addEventListener("key down", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
    if (e.keyCode === 70){
        bullets.push(new Bullet(hero.angle));
        //shotAudio.play();
    }
}, false);

// Reset the game when the player catches a mexican

var reset = function () {
	hero.x = mapHeroCanvas.width / 2;
	hero.y = mapHeroCanvas.height / 2;

    brick.x = 32 + (Math.random() * (mapHeroCanvas.width - 64));
	brick.y = 32 + (Math.random() * (mapHeroCanvas.height - 64));

	// Throw the mexican somewhere on the screen randomly
	mexican.x = 32 + (Math.random() * (mapHeroCanvas.width - 64));
	mexican.y = 32 + (Math.random() * (mapHeroCanvas.height - 64));
};


function deleteAllEnemies(){

    /*
    mexicans.forEach(function(mexican, i){
            mexican.dead = true;
    });

   mexicanCtx.globalAlpha = 0;
    */

    //mexicanCtx.restore();
};

// Update game objects
var update = function (modifier) {

	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
        hero.angle = 44;
        if(hero.y < 0){

         switch(mapNumber){


            //position in map: [X|0
            //                  0|0]
            case 0:
                hero.y = 0;
                break;
            //position in map: [0|X
            //                  0|0]
            case 1:
                hero.y = 0;
                break;
            //position in map: [0|0
            //                  X|0]
            case 2:
                mapNumber=0;
                //deleteAllEnemies();
                hero.y = mapHeroCtx.canvas.height + hero.size;
                break;
            //position in map: [0|0
            //                  0|X]
            case 3:
                mapNumber=1;
                hero.y = mapHeroCtx.canvas.height + hero.size;
                break;

            }
        }
	}

	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
        hero.angle = 250;
        if (hero.y + hero.size > mapHeroCtx.canvas.height){


        switch(mapNumber){
            //position in map: [X|0
            //                  0|0]
            case 0:
                mapNumber=2;
                hero.y = 0;
                break;
            //position in map: [0|X
            //                  0|0]
            case 1:
                mapNumber=3;
                hero.y = 0;
                break;
            //position in map: [0|0
            //                  X|0]
            case 2:
                hero.y = mapHeroCtx.canvas.height + hero.size;
                break;
            //position in map: [0|0
            //                  0|X]
            case 3:
                hero.y = mapHeroCtx.canvas.height + hero.size;
                break;

        }
      }

	}

	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
        hero.angle = 0;

         //Change the image if the player changes direction
        heroReady = false;
        heroImage = new Image();
        heroImage.onload = function () {
	       heroReady = true;
        }
        heroImage.src = "Ressources/Images/Trump.png";

        if (hero.x < 0){


     switch(mapNumber){
            //position in map: [X|0
            //                  0|0]
            case 0:
                hero.x = 0;
                break;
            //position in map: [0|X
            //                  0|0]
            case 1:
                mapNumber=0;
                hero.x = 1850;
                break;
            //position in map: [0|0
            //                  X|0]
            case 2:
                hero.x = 0;
                break;
            //position in map: [0|0
            //                  0|X]
            case 3:
                mapNumber=2;
                hero.x = 1850;
                break;

        }
      }
	}

	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
        hero.angle = 181;

        //Change the image if the player changes direction
        heroReady = false;
        heroImage = new Image();
        heroImage.onload = function () {
	       heroReady = true;
        }
        heroImage.src = "Ressources/Images/TrumpFlip.png";



        if (hero.x + hero.size > mapHeroCtx.canvas.width){



       switch(mapNumber){
            //position in map: [X|0
            //                  0|0]
            case 0:
                mapNumber=1;
                hero.x = 0;
                break;
            //position in map: [0|X
            //                  0|0]
            case 1:
                hero.x = 1850;
                break;
            //position in map: [0|0
            //                  X|0]
            case 2:
                mapNumber=3;
                hero.x = 0;
                break;
            //position in map: [0|0
            //                  0|X]
            case 3:
                hero.x = 1850;
                break;

        }
      }
	}



    //Brick count
    if (
		hero.x <= (brick.x + 32)
		&& brick.x <= (hero.x + 32)
		&& hero.y <= (brick.y + 32)
		&& brick.y <= (hero.y + 32)
	) {

        bricksCount++;
        resetBrick();

	}


};


function drawMexicans(){

    mexicans.forEach(function(mexican, i){
            if(mexicanReady){
                mexicanCtx.drawImage(mexican.image, mexican.x, mexican.y);
            }
    });
}

function mexicanMove(modifier){

    mexicans.forEach(function(mexican){

    if(!(mexican.dead))
    {

        var diffx = Math.floor(hero.x - mexican.x);
        var diffy = Math.floor(hero.y - mexican.y);

        //Distance min between trump and mexicans
        let gap = 20;


        if (diffy < -gap) { // Player holding up
        mexicanCtx.clearRect(0, 0, mexicanCanvas.width, mexicanCanvas.height);
		  mexican.y -= mexican.y * modifier;
	   }
	   if (diffy > gap) { // Player holding down
           mexicanCtx.clearRect(0, 0, mexicanCanvas.width, mexicanCanvas.height);
		mexican.y += mexican.y * modifier;
	   }
	   if (diffx < -gap) { // Player holding left
           mexicanCtx.clearRect(0, 0, mexicanCanvas.width, mexicanCanvas.height);
		mexican.x -= mexican.x * modifier;



        //Mexican changes direction
        mexican.image = mexicanFlipImage;

	   }
	if (diffx > gap) { // Player holding right
        mexicanCtx.clearRect(0, 0, mexicanCanvas.width, mexicanCanvas.height);
		mexican.x += mexican.x * modifier;

        //Mexican changes direction
        mexican.image = mexicanImage;

	}

        //when mexicans touch our precious President
        if (
		  hero.x <= (mexican.x + 32)
		  && mexican.x <= (hero.x + 32)
		  && hero.y <= (mexican.y + 32)
		  && mexican.y <= (hero.y + 32)
	       )
        {

        //Decrease life of our Trump
        heroHealth.value -= 1;
        if(heroHealth.value <= 0)
            {

              //when Trump dies, go to the hall of fame

              endTime = new Date();
              var timeDiff = endTime - startTime; //in miliseconds
              timeDiff /= 1000;

              // get seconds
              var seconds = Math.round(timeDiff);

                //store in local storage
              localStorage.setItem("Chrono", seconds);
                //start new window
               window.open("halloffame.html", "_self")
               localStorage.setItem('winner', false);
            }


	}

        //when bullets touch a mexican

       for(let i=0; i < bullets.length;i++)
           {

            if(
                mexican.x <= (bullets[i].x + 32)
                && bullets[i].x <= (mexican.x + 32)
		        && mexican.y <= (bullets[i].y + 32)
		        && bullets[i].y <= (mexican.y + 32)
	           )
            {
                mexican.life -= 1;
                if(mexican.life <= 0)
                {
                    mexican.dead = true;
                    totalMexicansKills++;
                    mexican.image = mexicanImageDEAD;
                }
            }
           }
        }
    });
}


function resetBrick(){

    brick.x = 32 + (Math.random() * (mapHeroCanvas.width - 64));
	brick.y = 32 + (Math.random() * (mapHeroCanvas.height - 64));

}


function background(number){

        mapHeroCtx.drawImage(mapOrganisation[number], 0, 0);

};

// Draw everything
var render = function () {

	if (heroReady) {
		mapHeroCtx.drawImage(heroImage, hero.x, hero.y);
	}

    if (brickReady) {
		mapHeroCtx.drawImage(brickImage, brick.x, brick.y);
	}



     if (bullets.length !== 0) {
        for(let i = 0; i < bullets.length; i++){
            bullets[i].Update();
            bullets[i].Draw();
            mapHeroCtx.drawImage(bulletImage, bullets[i].x, bullets[i].y);
        }
    }

	// bricks count
    document.getElementById("bricks").innerHTML = bricksCount;
    // Mexican's kills count
    document.getElementById("kills").innerHTML = totalMexicansKills;
};

//After 100 frame refresh, a new enemy spawn
let spawnRate = 100;
let spawnRateCountdown = spawnRate;


let started = true;

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;


    //mexicanCtx.save();

    background(mapNumber);

    render();

    /*
    if(started){
        ds.globalAlpha = 1.0;
        ds.save();

        started = false;
    }*/


    //Enemy spawn loop based on frame refresh
    spawnRateCountdown--;

    if(spawnRateCountdown == 0)
        {
            spawnRateCountdown = spawnRate;
            mexicans.push(new mexican());
        }


    then = now;

    // Trump moves
    update(delta / 1000);

    // Mexicans moves
    mexicanMove(delta / 8000);

    //Draw new mexicans of the array "mexicans"
    drawMexicans();

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
