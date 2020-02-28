

"use strict"

const bombimage = new Image();
var accel = 0.1;
bombimage.src = ("./img/bomb.png");

function bomb(x, y, xspeed){
    this.img = bombimage; 
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 7;
    this.rotrate = 0;
    this.rotation = 0;
    this.xspeed = xspeed;

}
bomb.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.translate(this / 2, this.height / 2);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
// ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}
bomb.prototype.update = function(){
    if(this.y < canvas.height - 20 && this.y > -150){
        this.y += 3 + accel;
        accel += .08;
        this.x += this.xspeed;
        this.rotation += 0.6;
    }else {
        blowup(this.x - 40, this.y - 30);
        this.y = -200;
        accel = 0.1;
        candrop = true;
    }
    

}
bomb.prototype.isColliding = function(bodyb){
    if (this.x < bodyb.x + bodyb.width && this.x + this.width > bodyb.x && this.y < bodyb.y + bodyb.height && this.y + this.height > bodyb.y) {
        // explosion2 = new explosion(canvasContext, this.x, this.y, 60, 60, 5, 5);
        return true;
    } else
        return false;
}