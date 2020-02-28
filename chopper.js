var friction = 0.98;
var canfire = true;
var candrop = true;
var abomb;

function Chopper(img, x, y, width, height, speedx, speedy) {
    this.img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedx = speedx;
    this.speedy = speedy;
    this.velx = 0;
    this.vely = 0;
    this.animcount = 0;
    this.fuel = 100;
}
Chopper.prototype.addimage = function(imagename) {
    this.img = new Image();
    let thissrc = ("./img/" + imagename + ".png")
    this.img.src = (thissrc);
    // this.img = imagename;
}
Chopper.prototype.draw = function(ctx) {
    let frame = Math.floor(this.animcount);
    let chopx = frame * 237;
    ctx.drawImage(this.img, chopx, 0, 237, 75, this.x, this.y, 104, 33);
    this.animcount += .3;
    if (this.animcount > 3)this.animcount = 0;
    screentext.fuel(this.fuel);
    this.fuel -= .04;
}
Chopper.prototype.checkborder = function() {
    if (this.x + this.width > canvas.width) {
        this.velx *= -.8;
    } else if (this.x < 0) {
        this.velx *= -1;
    }
    if (this.y + this.height > canvas.height) {
        this.vely *= -.8;
    } else if (this.y < 0) {
        this.vely *= -1;
    }
    
}
Chopper.prototype.startkeyboard = function() {
    keyboard.listen(document);
}
Chopper.prototype.fly = function() {

    let direction = keyboard.whichkey();
    if (direction === "left") {
        this.velx -= this.speedx;
        this.velx /= friction;
    }
    if (direction === "right") {
        this.velx += this.speedx;
        this.velx /= friction;
    }
    if (direction === "up") {
        this.vely -= this.speedy;
        this.vely /= friction;
    }
    if (direction === "down") {
        this.vely += this.speedy;
        this.vely /= friction;
    }
    if (direction == "upleft") {
        this.velx -= this.speedx;
        this.vely -= this.speedy;
        this.velx /= friction;
    }
    if (direction == "downleft") {
        this.velx -= this.speedx;
        this.vely += this.speedy;
        this.vely /= friction;
        this.velx /= friction;
    }
    if (direction == "upright") {
        this.velx += this.speedx;
        this.vely -= this.speedy;
        this.vely /= friction;
        this.velx /= friction;
    }
    if (direction == "downright") {
        this.velx += this.speedx;
        this.vely += this.speedy;
        this.vely /= friction;
        this.velx /= friction;
    }
    if (keys[65] && canfire) {
        keys[65] = false;
        canfire = false;
        slug("bullet", this.x + 85, this.y + 30, 5, 3, 14, 0);
        setTimeout(function() {
            canfire = true;
        }, 100);
    }
    if(keys[90] && candrop){
        keys[90]= false;
        candrop = false;
        abomb = new bomb(this.x + this.width/2, this.y + this.height, this.velx);
    }
    // var Keys = {
    //     A: 65, B: 66, C: 67, D: 68, E: 69, F: 70,
    //     G: 71, H: 72, I: 73, J: 74, K: 75, L: 76,
    //     M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82,
    //     S: 83, T: 84, U: 85, V: 86, W: 87, X: 88,
    //     Y: 89, Z: 90
    //     };
    this.x += this.velx;
    this.y += this.vely;
    this.velx *= friction;
    this.vely *= friction;
}
Chopper.prototype.collision = function(bodyb) {
    if (this.x < bodyb.x + bodyb.width - 10 && this.x + this.width + 10 > bodyb.x && this.y < bodyb.y + bodyb.height && this.y + this.height > bodyb.y) {
        // explosion2 = new explosion(canvasContext, this.x, this.y, 60, 60, 5, 5);
        return true;
    } else
        return false;
}
