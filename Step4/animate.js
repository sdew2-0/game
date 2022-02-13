var map = []
var sdew, sdew2, sdew3;
var ctx2 = $("#item")[0].getContext("2d");
var img;
$(document).ready(function(){
    createMap()
    img = new Image();
    img.src ="Step4/new_img/bib.png";
    
    img.onload = function(){
        sdew = new Item(5);
        sdew.start(sdew);
        sdew2 = new Item(100)
        sdew2.start(sdew2)
        sdew3 = new Item(80)
        sdew3.start(sdew3)
    }
})


function createMap(){
    console.log(mapArray);
    for(var i=0;i<h;i++){
        var arr = [];
        for(var j=0;j<w;j++){
            arr.push(mapArray[i*w+j]);
        }
        map.push(arr);
    }
}
function Item(block){
    this.posX = block % w,
    this.posY = Math.floor(block / w),
    this.dir = this.out = this.updown = 1,
    this.err = 0,
    this.move = function(){
        var ox = this.posX, oy = this.posY;
        var nx = ox+this.dir*this.out;
        var ny = oy;
        if(ny == h || ny == -1){//final
            ctx2.fillRect(ox*baseLen, (oy-1)*baseLen, 1*baseLen, 1*baseLen)
            this.updown = -this.updown
            this.posY += this.updown
        }
        else if(nx == w || nx == -1){//wall
            this.posX = ox
            this.posY += this.updown;
            this.dir = -this.dir
            this.out = 0
            this.err = 1;
        }
        else if(map[ny][nx] != 0){//obs
            this.posX = ox
            this.out = 0
            this.posY +=this.updown;
            this.err = 1
        }
        else{
            this.out = 1
            this.posX = nx
            this.posY = ny
            
            if(this.err == 1){
                ctx2.clearRect(ox*baseLen, (oy-this.updown)*baseLen ,1*baseLen ,1*baseLen)
                this.err = 0
            }
            ctx2.clearRect(ox*baseLen, oy*baseLen ,1*baseLen ,1*baseLen)
            //ctx2.fillRect(nx*baseLen, ny*baseLen, 1*baseLen, 1*baseLen)
            ctx2.drawImage(img,0,0,212,159,nx*baseLen, ny*baseLen, 1*baseLen, 1*baseLen)
        }
    },
    this.start = function(item){
        console.log(map)
        this.life = setInterval(function(){
            item.move();
        },100)
    }    
}