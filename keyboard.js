
"use strict"

var keyboard = {};
var keys = [];
keyboard.listen = function (doc) {
    doc.addEventListener('keydown', function(e) {
        keys[e.which] = true;
        e.preventDefault();
        // console.log(e);
    });
    doc.addEventListener('keyup', function(e) {
        keys[e.which] = false;
    }); 
}

keyboard.whichkey = function () {
    // if(keys[68]){
    //     console.log("bomb");
    // }
    if (keys[37]) {
        if(keys[38])return "upleft";
        if(keys[40])return "downleft";
        return "left";
    }
    if (keys[39]) {
        if(keys[38])return "upright";
        if(keys[40])return "downright";
        
        return "right";
    }
    if (keys[38]) {
      return "up";
    }
    if (keys[40]) {
        return "down";
    }
    if (keys[32]) {
        return "space";
//         console.log("space");
    }

}
