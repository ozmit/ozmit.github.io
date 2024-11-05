const clicksound =  new Audio('foty/honk.mp3');
var but = document.getElementById("fumo").children[0];
//var init = false;

but.onclick = function(){
    /*if(init==true) {return;}
    init = true;
    but.style.cursor = 'default';*/

    clicksound.play();
}