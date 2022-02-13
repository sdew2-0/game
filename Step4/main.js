var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy, imgDes, key, imgFood, imgMaterial;
var targetBlock=-1;
//mapArray為地圖中每個格子元素
//ctx:HTML5 Canvas用



//character
var mainW=48, mainH=48, motion=1, motionLevel=0, hold_motion = motion; 
    
var baseLen=75, bgLen_W=1200, bgLen_H=600, w=16, h=8;

//image property
var siroW = 410, siroStat = 0;

//status
var keyNum=5, treaNum=0;
var hp=100, mp=100;




$(document).ready(function(){
    //設定地形
    //0:可走、1:障礙、2:終點、3:敵人 4:key
    //3為二維陣列(下面修改)
    mapArray=[0,0,0,0,0,4,3,0,3,0,0,0,0,3,0,0,
              0,0,3,1,0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,1,0,4,0,0,0,0,3,0,0,0,
              0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
              0,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,
              0,0,0,0,3,0,4,0,0,0,0,0,0,0,3,0,
              0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,0,
              1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,2];//canvas分成wxh的九宮格
    ctx=$("#myCanvas")[0].getContext("2d");
    imgMain=new Image();
    imgMain.src="Step4/new_img/mains/"+(mainRole+1)+".png";
    currentImgMainX=0;
    currentImgMainY=0;
    
    imgMain.onload=function(){
        ctx.drawImage(imgMain, motion*mainW, motionLevel*mainH, mainW, mainH, currentImgMainX, currentImgMainY, baseLen, baseLen);
    }
    
    imgMountain=new Image();
    imgMountain.src="Step4/new_img/box.png";
    imgEnemy=new Image();
    imgEnemy.src="Step4/new_img/siro.png";
    imgDes=new Image();
    imgDes.src="Step4/new_img/final.png";
    imgFood = new Image();
    imgFood.src = "Step4/new_img/food.png";
    imgMaterial = new Image();
    imgMaterial.src = "Step4/images/material.png";
    
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(var x in mapArray){
                if(mapArray[x]==1 || mapArray[x]==4){
                    //120,0,150,200 for open
                    ctx.drawImage(imgMountain,0,0,115,120,x%w*baseLen,Math.floor(x/w)*baseLen,baseLen,baseLen);
                }
                else if(mapArray[x]==3){
                    ctx.drawImage(imgEnemy,0,0,siroW,360,x%w*baseLen,Math.floor(x/w)*baseLen,baseLen,baseLen);
                    mapArray[x] = [3, 0, -1, -1]; //index 1 for siro status , index 2 and 3 for item property
                }
            }
        }
    }
    imgDes.onload = function(){
        ctx.drawImage(imgDes,0,0,1024,1024,bgLen_W-baseLen,bgLen_H-baseLen,baseLen,baseLen);
    }
    
    key=$("<img src='Step4/new_img/key.png' id='key'>");
    key.css({"width":baseLen+50,"height":baseLen+50,"marginLeft":(baseLen+50)/(-2)});
    $("body").append(key);
    
    $("#fin_yes").click(()=>{
        $("#dialogFin").hide();
        $("#gameOver").slideDown(2000);
        $("#gameOver").text("YOU WIN");
        $("#gameOver").fadeTo(3000,0.95);
    }); 
    $("#fin_no").click(()=>{
        $("#dialogFin").hide();
        $("#gameOver").slideDown(2000);
        $("#gameOver").text("YOU LOSE");
        $("#gameOver").fadeTo(3000,0.95);
    });
    
    
});

$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY;
    event.preventDefault();
    //避免點擊鍵盤出現瀏覽器其他行為，例如捲動、放大、換頁...
    switch(event.which){
            case 37://left
                targetImgMainX = currentImgMainX-baseLen;
                targetImgMainY = currentImgMainY;
                motionLevel = 1;
            break;
            case 38://up
                targetImgMainX = currentImgMainX;
                targetImgMainY = currentImgMainY-baseLen;
                motionLevel = 3;
            break;
            case 39://right
                targetImgMainX = currentImgMainX+baseLen;
                targetImgMainY = currentImgMainY;
                motionLevel = 2
            break;
            case 40://down
                targetImgMainX = currentImgMainX;
                targetImgMainY = currentImgMainY+baseLen;
                motionLevel = 0
            break;
           
        default:
            return;
    }
    //讓motion於 0、2間轉換
    hold_motion = (hold_motion+2) % 4 ;
    motion = hold_motion - 1;

    if(targetImgMainX<=bgLen_W-baseLen && targetImgMainX>=0 && targetImgMainY<=bgLen_H-baseLen && targetImgMainY>=0){
            targetBlock = targetImgMainX/baseLen + targetImgMainY/baseLen*w;
    }
    else{
        targetBlock=-1;
    }
    
    ctx.clearRect(currentImgMainX, currentImgMainY, baseLen, baseLen);//清除主角原本位置
//-------------------------------------------------------------------------------------    
    
    switch(mapArray[targetBlock]){
        case 1:
            break;
        case 4:
            break; 
        case 5:
            break;    
        case 3:
            break;
        case 2:
            if(treaNum >= 3){
                $("#dialogFin").show();
            }
            break;    
        case undefined:
            break;
        case 0:
            currentImgMainX=targetImgMainX;
            currentImgMainY=targetImgMainY;
            break;
        default:
    }
    
    /*修正targetBlock************************************/
    if(mapArray[targetBlock] != 0 && targetBlock != -1){
        switch(motionLevel){
            case 1: //left
                targetBlock++;
                break;
            case 2: //right
                targetBlock--;
                break;
            case 3: // up
                targetBlock += w;
                break;
            case 0: //down
                targetBlock -= w;
                break;
        }
    }
    
    ctx.drawImage(imgMain, motion*mainW, motionLevel*mainH, mainW, mainH, currentImgMainX, currentImgMainY, baseLen, baseLen);
    
});
$(document).keydown(event => {
    var ajustedPosition = targetBlock;
   
    event.preventDefault();
    
    if(event.which != 90 && event.which != 88){
        return false;    
    }
    
    switch(motionLevel){
        case 1: //left
            ajustedPosition--;
        break;
        case 2: //right
            ajustedPosition++;
        break;
        case 3: // up
            ajustedPosition -= w;
        break;
        case 0: //down
            ajustedPosition += w;
        break;
    }
    
    switch(event.which){
        case 90://Z
            if(mapArray[ajustedPosition] == 4 || mapArray[ajustedPosition] == 1){
                openBox(ajustedPosition);
                energy(ajustedPosition);
                mapArray[ajustedPosition] = 5;
            }
        break;
        case 88://X
            try{
                if(mapArray[ajustedPosition][0] == 3){
                    kill(ajustedPosition);
                    strike();
                    energy(ajustedPosition);
                }
                else if(mapArray[ajustedPosition] == 5){
                    killBox(ajustedPosition);
                }    
            }
            catch(msg){
                //**********************//
            }
            break;
        default:
            return;
    }
    
});
function openBox(position){
    ctx.clearRect(position%w * baseLen, Math.floor(position/w) * baseLen, baseLen, baseLen);
    ctx.drawImage(imgMountain, 120, 0, 150, 200,position%w * baseLen, Math.floor(position/w) * baseLen, baseLen, baseLen);
        
    keyNum--;
    if(keyNum >= 0){
        $("#status .num").eq(0).text("X"+keyNum);
        if(mapArray[position] == 1){
            $("#line").append("箱子是空的QQ<br>");
        }
        else{
            $("#key").show();
            $("#key").animate({top:'300px'},1500);
            $("#key").fadeOut(1000);
            $("#key").animate({top:'-100px'},1);
            $("#line").append("獲得小餅乾!<br>");
            treaNum++;
            $("#status .num").eq(1).text("X"+treaNum);
        }
    }
    else{
         $("#gameOver").slideDown(2000);
        $("#gameOver").text("YOU LOSE");
        $("#gameOver").fadeTo(3000,0.95);
    }
}
function kill(position){
    siroStat = mapArray[position][1]+1;
    
    ctx.clearRect(position%w * baseLen, Math.floor(position/w) * baseLen, baseLen, baseLen);
    ctx.drawImage(imgEnemy, siroW*siroStat, 0, siroW, 360, position%w * baseLen, Math.floor(position/w) * baseLen, baseLen, baseLen);
    
    mapArray[position][1] = siroStat;
   
    if(siroStat == 4){
        var x = rand(4), y = rand(1);  
        ctx.drawImage(imgFood, x*260, y*260, 260, 260,position%w * baseLen, Math.floor(position/w) * baseLen, baseLen, baseLen);
        mapArray[position][2] = x;
        mapArray[position][3] = y;
    }
    else if(siroStat == 5){
        pick(mapArray[position][2],mapArray[position][3],position);
    }
}
function strike(){
    hp-=10;
    $("#hp-inner").css({width:'-=10px'});
    $("#hp").text(hp+"/100");
}
function energy(position){
    if(mapArray[position] == 4){
        mp+=10;
        $("#mp-inner").css({width:'+=10px'});
        $("#mp").text(mp+"/100");
    }
    else{
        mp-=10;
        $("#mp-inner").css({width:'-=10px'})
        $("#mp").text(mp+"/100");
    }
}
function killBox(position){
    ctx.clearRect(position%w * baseLen, Math.floor(position/w) * baseLen, baseLen, baseLen);
    ctx.drawImage(imgMaterial, 0, 28*6, 28, 28, position%w * baseLen, Math.floor(position/w) * baseLen, baseLen, baseLen);
}
function pick(x, y, position){
    var painting = $("<canvas id='smallItem' width=75 height=75>");
    $("#canvas").append(painting);
    painting.css({
        left : position%w * baseLen,
        top : Math.floor(position/w) * baseLen
    });
    var ctx2 = painting[0].getContext("2d");
    ctx2.drawImage(imgFood, x*260, y*260, 260, 260, 0, 0, 75, 75);
    mapArray[position] = 0;
    painting.animate(
        {top:'-=75px',opacity:0.0},1800,
        function(){
            painting.remove();
        }
    )
    
    putToBag(x+1);
}
function rand(limit){
    return Math.floor(Math.random() * 1000) % limit;
}
