


function isColliding(bodya, bodyb){
    if (bodya.position.x < bodyb.position.x + bodyb.size.width &&
        bodya.position.x + bodya.size.width > bodyb.position.x &&
        bodya.position.y < bodyb.position.y + bodyb.size.height &&
        bodya.position.y + bodya.size.height > bodyb.position.y) {
        return true;
     }else return false;
}