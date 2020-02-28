var canvas = undefined;
var canvasContext = undefined;

var player, score;
let bullets = [];
let enemies = [];
let biplanes = [];
var oneenemy, twoenemy, threeenemy, fourenemy, fiveenemy, sixenemy;
var ground1, ground2, ground3, ground4, bullet, wall1, wall2, wall3, fuel, building;
var screenarea, dialogue;
let state = "play";
let wave = 1;
let wavecount = 0;
let wavechange = false;
let explosion1;
let explosions = [];

var images = {
    biplane: new Image(),
    plane: new Image(),
    fuel: new Image(),
    aslug: new Image(),
}

function start() {
    score = 0;
    // this may be where the problem lies
    images.biplane.src = ("./img/plane.png");
    images.plane.src = ("./img/plane30.png");
    images.fuel.src = ("./img/fuel.png");
    images.aslug.src = ("./img/bullet.png");
    canvas = document.getElementById("myCanvas");
    canvasContext = canvas.getContext("2d");
    screentext.show("Click to start!!", "#ff9900", "bold 60px Tahoma", "center", canvas.width / 2, canvas.height / 3);
    screentext.show("Wave: " + wave, "#ffff00", "bold 40px Tahoma", "center", canvas.width / 2, canvas.height / 3 + 100);
    screenarea = document.getElementById("gameArea");

    chopper = new Chopper("",300,150,104,33,.15,.15);
    chopper.addimage("heli-1a");

    ground1 = new ground("mountain",900,330,498,277,-0.5);
    ground2 = new ground("mountain",1300,360,498,277,-0.5);
    ground3 = new ground("mountain",1600,320,498,277,-0.5);
    ground4 = new ground("mountain",2100,310,498,277,-0.5);

    wall1 = new ground("wallmine",1050,493,100,100,-0.8);
    // wall2 = new ground("wallmine",1150,493,100,100,-0.8);
    fuel = new ground("fuel2",850,545,57,37,-0.8);
    building = new ground("building",550,535,120,44,-0.8);

    explosion1 = new explosion(canvasContext,200,200,128,128,8,5);

    if (wave === 1) {
        for (let i = 0; i < 5; i++) {
            let thisplane = new biplane(images.biplane,800 + i * 200,Math.random() * 400 + 50,100,34,-4,0);
        }
    }
    screenarea.addEventListener('click', init);
}
const init = e=>{
    screenarea.removeEventListener('click', init);
    chopper.startkeyboard();
    gameLoop();
}
// document.addEventListener( 'DOMContentLoaded', start);
function update() {
    for (let i = 0; i < biplanes.length; i++) {
        let thisbiplane = biplanes[i];
        if (thisbiplane.x < 0 - thisbiplane.width) {
            thisbiplane.x = 1000;
            thisbiplane.y = Math.random() * 400;
            if (wave === 2) {
                biplanes.splice(i, 1);
            } else {
                wavecount += 1;
            }
        }
        if (wavecount > 5) {
            // wavechange from within biplanes only! below start wave 2
            wave += 1;
            wavecount = 0;
            wavechange = true;
            if (wavechange && wave === 2) {
                setTimeout(timesup, 2000);
                oneenemy = new enemy("fireball",2000,200,66,18,-6,0);
                twoenemy = new enemy("fireball",2200,100,66,18,-6,0);
                threeenemy = new enemy("fireball",2400,300,66,18,-6,0);
                fourenemy = new enemy("fireball",2600,400,66,18,-6,0);
                fiveenemy = new enemy("fireball",2800,300,66,18,-6,0);
                sixenemy = new enemy("fireball",3000,300,66,18,-6,0);
            }

        }
        // after crash and burn, recycle plane
        if (thisbiplane.y > canvas.height + thisbiplane.height) {
            if (wave === 1) {
                thisbiplane.x = 900;
                thisbiplane.y = Math.random() * 400 + 50;
                thisbiplane.rotation = thisbiplane.rotrate = 0;
                thisbiplane.speedx = -4;
                thisbiplane.speedy = 0;
                wavecount += 1;
            } else if (wave === 2) {
                biplanes.splice(i, 1);
            }
        }
        thisbiplane.x += thisbiplane.speedx;
        thisbiplane.y += thisbiplane.speedy;
        // check bullets in wave one
        for (let j = 0; j < bullets.length; j++) {
            let thisslug = bullets[j];
            if (checkCollision(thisslug, thisbiplane)) {
                score += 10;
                bullets.splice(j, 1);
                biplanes[i].speedy = 6;
                biplanes[i].speedx = 1;
                biplanes[i].rotrate = Math.random() * 3 - 6;
                explosion1 = new explosion(canvasContext,biplanes[i].x - 130,biplanes[i].y - 94,256,256,8,8);
                explosions.push(explosion1);
            }
        }
    }
    if(abomb){
        abomb.update();
        if(abomb.isColliding(fuel)){
            fuel.x += 800;
            chopper.fuel += 30;
        }
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].speedx;
        bullets[i].y += bullets[i].speedy;
        if (bullets[i].x > canvas.width + bullets[i].width)
            bullets.splice(i, 1);
    }
    if (wave === 2) {
        oneenemy.update();
        twoenemy.update();
        threeenemy.update();
        fourenemy.update();
        fiveenemy.update();
        if (oneenemy.isColliding(chopper) || twoenemy.isColliding(chopper) || threeenemy.isColliding(chopper) || fourenemy.isColliding(chopper) || fiveenemy.isColliding(chopper)) {
            state = "gover";
            screentext.show("Game Over", "#ffff00", "bold 30px Tahoma", "center", canvas.width / 2, canvas.height / 2 - 200);
            setTimeout(gameover, 3000);
        }
    }
    if (wave === 3) {
        oneenemy.update();
        twoenemy.update();
        threeenemy.update();
        recycle_enemy(oneenemy);
        recycle_enemy(twoenemy);
        recycle_enemy(threeenemy);
        if (oneenemy.isColliding(chopper) || twoenemy.isColliding(chopper) || threeenemy.isColliding(chopper)) {
            state = "gover";
            screentext.show("Game Over", "#ffff00", "bold 30px Tahoma", "center", canvas.width / 2, canvas.height / 2 - 200);
            setTimeout(gameover, 3000);
        }
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i]) {
                // below is very innefficient, must contain enemies within an array
                if (oneenemy.isColliding(bullets[i])) {
                    score += 10;
                    blowup(bullets[i].x - 30, bullets[i].y);
                    bullets.splice(i, 1);
                    oneenemy.speedy = 6;
                    oneenemy.speedx = 0;
                    oneenemy.rotrate = -1.4;
                }
                if (twoenemy.isColliding(bullets[i])) {
                    blowup(bullets[i].x - 30, bullets[i].y);
                    score += 10;
                    bullets.splice(i, 1);
                    twoenemy.speedy = 6;
                    twoenemy.speedx = 0;
                    twoenemy.rotrate = -1.4;
                }
                if (threeenemy.isColliding(bullets[i])) {
                    blowup(bullets[i].x - 30, bullets[i].y);
                    score += 10;
                    bullets.splice(i, 1);
                    threeenemy.speedy = 6;
                    threeenemy.speedx = 0;
                    threeenemy.rotrate = -1.4;
                }
            }
        }
    }
    if (wave === 4) {
        oneenemy.update();
        twoenemy.update();
        threeenemy.update();
        recycle_enemy(oneenemy);
        recycle_enemy(twoenemy);
        recycle_enemy(threeenemy);
        // recycle_enemy(threeenemy);
        if (oneenemy.isColliding(chopper) || twoenemy.isColliding(chopper)|| twoenemy.isColliding(chopper)) {
            state = "gover";
            screentext.show("Game Over", "#ffff00", "bold 30px Tahoma", "center", canvas.width / 2, canvas.height / 2 - 200);
            setTimeout(gameover, 3000);
        }
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i]) {
                // below is very innefficient, must contain enemies within an array
                if (oneenemy.isColliding(bullets[i])) {
                    score += 10;
                    blowup(bullets[i].x - 30, bullets[i].y);
                    bullets.splice(i, 1);
                    oneenemy.speedy = 6;
                    oneenemy.speedx = 0;
                    oneenemy.rotrate = -1.4;
                }
                if (twoenemy.isColliding(bullets[i])) {
                    blowup(bullets[i].x - 30, bullets[i].y);
                    score += 10;
                    bullets.splice(i, 1);
                    twoenemy.speedy = 6;
                    twoenemy.speedx = 0;
                    twoenemy.rotrate = -1.4;
                }
                if (threeenemy.isColliding(bullets[i])) {
                    blowup(bullets[i].x - 30, bullets[i].y);
                    score += 10;
                    bullets.splice(i, 1);
                    threeenemy.speedy = 6;
                    threeenemy.speedx = 0;
                    threeenemy.rotrate = -1.4;
                }
            }
        }
    }
    ground1.move();
    ground2.move();
    ground3.move();
    ground4.move();
    wall1.move();
    fuel.move();
    building.move();

    if (chopper.collision(wall1) || chopper.collision(building)) {
        state = "gover";
        screentext.show("Game Over", "#ffff00", "bold 30px Tahoma", "center", canvas.width / 2, canvas.height / 2 - 200);
        setTimeout(gameover, 3000);
    }
    if(chopper.collision(fuel)){
        // todo
    }
    chopper.checkborder();
    chopper.fly();
}
function recycle_enemy(itema) {
    if (itema.y + itema.height > canvas.height && wavechange === false) {
        blowup(itema.x, itema.y);
        itema.x = 1000;
        itema.y = Math.random() * 400 + 50;
        itema.speedx = -5;
        itema.speedy = 0;
        itema.rotrate = 0;
        itema.rotation = 0;
    }
}
function blowup(x, y) {
    explosion1 = new explosion(canvasContext, x - 90, y - 114, 256, 256, 8, 8);
    explosions.push(explosion1);
}
function gameover() {
    screenarea.style.display = "none";
    dialogue = document.getElementById("gameDialogue");
    dialogue.style.visibility = "visible";
    dialogue.addEventListener('click', newgame);

}
function newgame() {
    state = "play";
    window.location.reload();
}
function timesup() {
    wavechange = false;
    // start wave 3 after pause
    if (wave === 3) {
        oneenemy = new enemy("biplane",800,200,73,37,-5,0);
        twoenemy = new enemy("biplane",1200,400,73,37,-5,0);
        threeenemy = new enemy("biplane",1400,600,73,37,-5,0);
        fourenemy = new enemy("biplane",1600,200,73,37,-5,0);
    }
    if(wave === 4){
        oneenemy = new enemy("plane30", 1200, 400, 90, 34, -4, 0);
        twoenemy = new enemy("plane30", 1400, 600, 90, 34, -4, 0);
        threeenemy = new enemy("plane30", 1000, 200, 90, 34, -4, 0);
    }
    // draw new wave
}
function draw() {
    screentext.show("Score: " + score, "yellow","bold 14px Arial", "left", 712, 16);

    ground1.draw(canvasContext);
    ground2.draw(canvasContext);
    ground3.draw(canvasContext);
    ground4.draw(canvasContext);
    wall1.draw(canvasContext);
    fuel.draw(canvasContext);
    building.draw(canvasContext);
    if (wave === 2) {
        oneenemy.draw(canvasContext);
        twoenemy.draw(canvasContext);
        threeenemy.draw(canvasContext);
        fourenemy.draw(canvasContext);
        fiveenemy.draw(canvasContext);
    }
    if (wave === 3) {
        oneenemy.draw(canvasContext);
        twoenemy.draw(canvasContext);
        threeenemy.draw(canvasContext);
    }
    if(wave === 4){
        oneenemy.draw(canvasContext);
        twoenemy.draw(canvasContext);
        threeenemy.draw(canvasContext);
    }
    chopper.draw(canvasContext);

    if (wavechange)
        screentext.show("Wave: " + wave, "#ffff00", "bold 30px Tahoma", "center", canvas.width / 2, canvas.height / 2 - 200);

    for (let i = 0; i < bullets.length; i++) {
        canvasContext.drawImage(images.aslug, bullets[i].x, bullets[i].y);
    }
    
    for (let i = 0; i < biplanes.length; i++) {
        // below in preparation for rotating crash >>>>>>>> looks like I swapped biplane with the ww2 plane
        biplanes[i].rotation += biplanes[i].rotrate;
        canvasContext.save();
        canvasContext.translate(biplanes[i].x, biplanes[i].y);
        // actual x and y
        canvasContext.translate(biplanes[i] / 2, biplanes[i].height / 2);
        canvasContext.rotate(biplanes[i].rotation * Math.PI / 180);
        canvasContext.drawImage(images.biplane, -biplanes[i].width / 2, -biplanes[i].height / 2, biplanes[i].width, biplanes[i].height);
        canvasContext.restore();
    }
    if(abomb)abomb.draw(canvasContext);
    for (let i = 0; i < explosions.length; i++) {
        if (!explosions[i].complete) {
            let thisexplosion = explosions[i];
            thisexplosion.draw();
        }
    }
}
function gameLoop() {
    canvasContext.fillStyle = "#336699";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    if (state === "play")
        requestAnimationFrame(gameLoop);
}
// set up firing timer
function slug(img, x, y, width, height, speedx, speedy) {
    let thisslug = {
        img: img,
        x: x,
        y: y,
        width: width,
        height: height,
        speedx: speedx,
        speedy: speedy,
    }
    bullets.push(thisslug);
}
function checkCollision(bodya, bodyb) {
    if (bodya.x < bodyb.x + bodyb.width && bodya.x + bodya.width > bodyb.x && bodya.y - 10 < bodyb.y + bodyb.height - 10 && bodya.y + bodya.height > bodyb.y) {
        return true;
    } else
        return false;
}
function biplane(img, x, y, width, height, speedx, speedy) {
    let thisplane = {
        img: img,
        x: x,
        y: y,
        width: width,
        height: height,
        speedx: speedx,
        speedy: speedy,
        rotrate: 0,
        rotation: 0,
    }
    biplanes.push(thisplane);
}
