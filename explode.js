

const spritesheet = new Image();
spritesheet.src = "./img/explosion.png";
const spritesheet2 = new Image();
spritesheet2.src = "./img/3.png";

function explosion(ctx, x, y, width, height, columns, rows){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.columns = columns;
    this.row = 0;
    this.column = 0;
    this.complete = false;
}
explosion.prototype.draw = function(){
    if(!this.complete){
        this.ctx.drawImage(spritesheet2, this.column * this.width, this.row * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    if(this.column < this.columns) {
      this.column +=1;
    }else{
        this.column = 0;
        this.row += 1;
    }
    if(this.row === this.rows){
        this.row = 0;
        this.column = 0;
        this.complete = true;
    }
}
    
}



