"use strict"

// var chopr = new Image();
// chopr.src = "./img/heli-1.png";

var screentext = {};

screentext.show = function(text, color, fntsiz, txtalign, x, y) {
    canvasContext.font = fntsiz;
    canvasContext.fillStyle = color;
    canvasContext.textAlign = txtalign;
    canvasContext.fillText(text, x, y);
};

screentext.fuel = function(percent){
    let barwidth = percent;
    if(percent > 100)barwidth = 100;
    if(percent <= 0){
        barwidth = 0;
        state = "gover";
        screentext.show("Out of Fuel", "#ffff00", "bold 20px Tahoma", "center", canvas.width / 2, canvas.height / 2 - 200);
        setTimeout(gameover, 3000);
    }

    canvasContext.font = "bold, 12px, Arial";
    canvasContext.fillStyle = "yellow";
    canvasContext.textAlign = "left";
    canvasContext.fillText("Fuel: ", 66, 15);
    canvasContext.fillStyle = "#ff0000";
    canvasContext.beginPath();
    canvasContext.fillRect(100, 5, 100, 10);
    canvasContext.stroke();
    canvasContext.fillStyle = "#00ff00";
    canvasContext.beginPath();
    canvasContext.fillRect(100, 5, barwidth, 10);
    canvasContext.stroke();
}

screentext.showpic = function() {// todo
}
