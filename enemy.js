"use strict"

// need to produce mechanism that changes graphix and behavior due to wave change
function enemy(imagename, x, y, width, height, speedx, speedy, rotrate = 0) {
    this.img = new Image();
    this.img.src = "./img/" + imagename + ".png";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
    this.speedx = speedx;
    this.speedy = speedy;
    this.rotation = 0;
    this.rotrate = rotrate;
}
enemy.prototype.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.translate(this / 2, this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}
enemy.prototype.update = function() {

    if (this.x > -this.width) {
        this.x += this.speedx;
    } else {
        wavecount += 1;
        // console.log(wavecount);
        this.x = 850;
        this.y = Math.random() * 470 + 20;
        if (wavecount > 10) {

            if (wave === 2) {
                wavechange = true;
            }
            if(wave === 3){
                wavechange = true;
            }
            if(wave === 4){
                wavechange = true;
            }
            if (wavechange) {
                screentext.show("Wave: " + wave, "#ffff00", "30px Tahoma", "center", canvas.width / 2, canvas.height / 2 - 200);
                setTimeout(timesup, 2000);
            }
            
            wave += 1;
            wavecount = 0;
        }
    }
    this.y += this.speedy;
    this.rotation += this.rotrate;
}
enemy.prototype.isColliding = function(bodyb) {
    if (this && bodyb) {
        if (this.x < bodyb.x + bodyb.width - 10 && this.x + this.width - 10 > bodyb.x && this.y < bodyb.y + bodyb.height + 10 && this.y + this.height - 10 > bodyb.y) {
            return true;
        } else {
            return false;
        }
    }

}
