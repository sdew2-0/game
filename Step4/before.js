var lists = $("#select-role li");
var mainRole = 0, role_before = -1;
var roleNum = lists.length;
$(document).ready(function(){
    roleStyle(mainRole);
    showRole(mainRole);
});
$(document).keydown(function(event){
    if(currentScript != 0)
        return false;
    
    event.preventDefault();
    switch(event.which){
        case 37://left
            mainRole = (mainRole-1) % roleNum;
        break;    
        case 39://right
            mainRole = (mainRole+1) % roleNum;
        break;
        case 32://space
            start(mainRole);
        break; 
        default:
            return;
    }
    
    if(mainRole < 0)
        mainRole = roleNum-1;
    roleStyle(mainRole);
    showRole(mainRole);
});
function roleStyle(index){
    lists.eq(index).css({borderColor:"tomato"});
    lists.eq(role_before).css({borderColor:"rgba(100,100,100,0.2)"});
    role_before = index;
}
function showRole(index){
    $("#show").empty();
    var img = $("<img>");
    img.attr("src","Step4/new_img/roles/"+(index+1)+".png");
    $("#show").append(img,`<p>人物資料<br>無</p>`);
}
function start(index){
    $("#game").slideDown(1500,()=>{$("#all").hide()});
    finalRole = index + 1;
    currentScript = 1;
    $.ajax({
        type:'GET',
        url:'Step4/main.js',
        datatype:'script',
        success: ()=>{
            $.ajax({
                type:'GET',
                url:'Step4/animate.js',
                datatype:'script'
            });
        }
    });
    $.ajax({
        type:'GET',
        url:'Step4/bag.js',
        datatype:'script'
    });
}