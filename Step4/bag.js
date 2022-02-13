var cellLen = 70;
var cell;
var nextCell = 0;
var bagItem = [];

$(document).ready(function(){
    var content = $("#content");
    var limit = 20;
    var i = 0;
    var bagPos = [$("#bag").offset().left, $("#bag").offset().top]
    $("#bag").hide();
    while(i < limit){
        var div = $("<div class='cell'>");
        div.css({
           width:cellLen,
           height:cellLen    
        });
        div.append('<p></p>');
        content.append(div);
        //bagItem[i] = [0,-1,""];
        i++;
    }
    cell = $(".cell");
    
    $("#bag").draggable({
        scroll : false,
        containment : [0-bagPos[0] ,0-bagPos[1], $(window).width()-bagPos[0], $(window).height()-bagPos[1]]
    });
});
$(document).keydown(function(event){
    event.preventDefault();
    switch(event.which){
        case 65://A
            $("#bag").show();
        break;
        case 27://esc
            $("#bag").hide();
    }
});
function putToBag(item){
    var pos;
    var img = $("<img src=Step4/new_img/bagItems/food_"+item+".png>");
    img.css({
        width:cellLen,
        height:cellLen
    });
    pos = collect(item,nextCell);
    cell.eq(pos).empty();
    cell.eq(pos).append(img,"<p>"+bagItem[pos][0]+"</p>");
}
function collect(i,k){
    for(var x in bagItem){
        if(bagItem[x][1] == i){
            bagItem[x][0]++;
            return x;     
        }
    }
    bagItem[k]=[1,-1,""]
    bagItem[k][1] = i;
    console.log(bagItem);
    nextCell = bagItem.length    
    return k;    
}