var friction = 0.98;
var canfire = true;

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
    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.animcount += .3;
    if (this.animcount > 3)
        this.animcount = 0;
    if (this.height == 33) {//     console.log(this.img);
    }

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
    // console.log(direction);
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
    if (keys[32] && canfire) {
        keys[32] = false;
        canfire = false;
        slug("bullet", this.x + 85, this.y + 30, 5, 3, 14, 0);
        setTimeout(function() {
            //your code to be executed after 1 second
            canfire = true;
        }, 100);
    }

    this.x += this.velx;
    this.y += this.vely;
    this.velx *= friction;
    this.vely *= friction;
}
Chopper.prototype.collision = function(bodyb) {
    if (this.x < bodyb.x + bodyb.width && this.x + this.width > bodyb.x && this.y < bodyb.y + bodyb.height && this.y + this.height > bodyb.y) {
        return true;
    } else
        return false;
}
