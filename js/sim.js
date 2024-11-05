// 100% OŻ

let tps = 45;
let tickCount = 0;
let elapsed = 0;
let dt = 1/tps;
let settings = ['grav', 'friction', 'bounce', 'strength', 'autobounce', 'size', 'imglink'];
const area = document.getElementById('playarea');
const image = document.getElementById('uzbekistan');
const button = document.getElementById('charbut');


let character = {
    size: {x: 120, y: 120},
    force: {x: 0, y: 0},
    position: {x: 0, y: 0},
    bounce: .8,
    friction: .005,
    grav: 11,
    autobounce: 150,
    strength: 1200,
    imglink: 'https://upload.wikimedia.org/wikipedia/en/8/84/In_the_Court_of_the_Crimson_King_-_40th_Anniversary_Box_Set_-_Front_cover.jpeg',
    element: document.getElementById('char'),
};

function maxPos(){return {x: area.offsetWidth-character.size.x, y: area.offsetHeight-character.size.y};}

function setStyle(property, value, unit = 'px', elem = character.element){
    elem.style[property] = value + unit;
    return true
}

function clampPos(){
    let mp = maxPos();
    if(character.position.x > mp.x){
        character.position.x = mp.x;
        character.force.x *= -character.bounce;
    }
    if(character.position.x < 0){
        character.position.x = 0;
        character.force.x *= -character.bounce;
    }
    if(character.position.y > mp.y){
        character.position.y = mp.y;
        character.force.y *= -character.bounce;
    }
    if(character.position.y < 0){
        character.position.y = 0;
        character.force.y *= -character.bounce;
    }
}


function gravity(){
    character.force.y -= character.grav;
}

function randomBounce(){
    character.force.x += ((Math.random()-.5)*3)*character.strength;
    character.force.y += (Math.random()*(character.strength/2))+(character.strength/2) * .7;
}

function updatePos(){
    gravity();
    character.force.x *= (1-character.friction);
    character.force.y *= (1-character.friction);

    character.position.y += character.force.y * dt;
    character.position.x += character.force.x * dt;

    clampPos();

    setStyle('bottom', character.position.y);
    setStyle('left', character.position.x);
}

function tick(){
    elapsed = tickCount * dt;

    if(Math.abs(character.force.x) + Math.abs(character.force.y) < character.autobounce){randomBounce();}

    //console.log(character.size, character.imglink);

    updatePos();
    
    displayStats();
    tickCount += 1;
}

function displayStats(){
    document.getElementById('time').innerHTML = 'Czas: ' + elapsed.toFixed(2);
    document.getElementById('posx').innerHTML = 'Pozycja X: ' + character.position.x.toFixed(2);
    document.getElementById('posy').innerHTML = 'Pozycja Y: ' + character.position.y.toFixed(2);
    document.getElementById('fx').innerHTML = 'Prędkość X: ' + character.force.x.toFixed(2);
    document.getElementById('fy').innerHTML = 'Prędkość Y: ' + character.force.y.toFixed(2);
}

function setupSettings(){
    for(i in settings){
        let key = settings[i]
        let elem = document.getElementById(key);
        let number = elem.getElementsByClassName("number")[0];
        let number2 = elem.getElementsByClassName("number")[1]; 
        let slider = elem.getElementsByClassName("slider")[0];
        let text = elem.getElementsByClassName("text")[0];

        if(key == 'size'){
            number.value = character[key].x;
            number2.value = character[key].y;

            number.onchange = function(){
                character[key].x = Math.abs(number.value);
                setStyle('width', character.size.x);
            };
            number2.onchange = function(){
                character[key].y = Math.abs(number2.value);
                setStyle('height', character.size.y);
            };

            continue
        }
        if(number){
            number.value = character[key];
            number.onchange = function(){
                slider.value = number.value;
                character[key] = number.value;
            };
        }
        if(slider){
            slider.value = character[key];
            slider.onchange = function(){
                number.value = slider.value;
                character[key] = slider.value;
            };
        }
        if(text){
            text.value = character[key];
            text.onchange = function(){
                character[key] = text.value;
            }

            if(key != 'imglink'){continue}

            text.onchange = function(){
                character[key] = text.value;
                image.src = character.imglink;
            }
        }
    }
}

window.onload = function(){
    character.position.x = Math.random() * maxPos().x;
    character.position.y = Math.random() * maxPos().y;
    setStyle('width', character.size.x);
    setStyle('height', character.size.y);
    image.src = character.imglink;

    randomBounce();

    setupSettings();

    setInterval(tick, dt * 1000);
}

button.onclick = function(){randomBounce()}

image.ondragstart = function(){return false;}

