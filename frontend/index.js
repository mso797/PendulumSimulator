//define pendulum class
class Pendulum{
    constructor(pivotX, pivotY, x, y, mass){
        this.pivotX=pivotX;
        this.pivotY=pivotY;
        this.x=x;
        this.y=y;
        this.mass=mass;
    }
}

//add container for canvas
var canvasContainer=document.body.appendChild(document.createElement('div'));
canvasContainer.classList.add('container');

//create canvas for rendering pendulums
var canvas=canvasContainer.appendChild(document.createElement('canvas'));
canvas.setAttribute("id", "canvasMain");
canvas.classList.add('center');
canvas.width = window.innerWidth-100;
canvas.height = 300;

pendulums={};

for(let i=1; i<=5; i++){
    pendulums[i] = new Pendulum(canvas.width/6*i, 0, canvas.width/6*i, 100, 1);
}

function getPendulumData(url, id){
    const http = new XMLHttpRequest()
    http.responseType = 'json';
    http.open("GET", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        new_data=http.response;
        if(new_data["x"]){
            pendulums[id].x=pendulums[id].pivotX+parseFloat(new_data["x"])*200;
        }
        if(new_data["y"]){
            pendulums[id].y=parseFloat(new_data["y"])*200;
        }
        if(new_data["mass"]){
            pendulums[id].mass=new_data["mass"];
        }
    };
}

var ctx = canvas.getContext('2d');

//draw pendulums
function drawPendulums(){
    for(let i=1; i<=5; i++){
        getPendulumData("http://127.0.0.1:811"+i+"/?x&y&mass", i)
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=1; i<=5; i++){
        //draw pendulum line       
        ctx.beginPath();
        ctx.moveTo(pendulums[i].pivotX, pendulums[i].pivotY);
        ctx.lineTo(pendulums[i].x, pendulums[i].y);
        ctx.stroke();
        //console.log(pendulums[i].x, pendulums[i].y);

        //draw pendulum circle
        ctx.beginPath();
        ctx.moveTo(pendulums[i].x, pendulums[i].y);
        ctx.arc(pendulums[i].x, pendulums[i].y, 25*pendulums[i].mass, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

//refresh pendulum positions
var timestep=100;
setInterval(function(){
    drawPendulums();
}, timestep);

/*
const userAction = async () => {
    const response = await fetch('http://example.com/movies.json');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
}

function CreateUI() {
    const node = document.createElement('div');
    node.classList.add('card');

    function applyRandomColor() {
        node.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
    }
    
    // to support older browsers, use appendChild() for every child instead
    node.append(
        CardContent(),
        CardButton({pressHandler: applyRandomColor})
        )
    
    return node
}

function CardContent() {
    const node = document.createElement('div');
    node.classList.add('card__content'); // to support older browsers, use node.setAttribute('class', 'card__content') instead
    node.textContent = 'Text text text text text text text text text text text text';
    
    return node
}

function CardButton({pressHandler}) {
    const node = document.createElement('div');
    node.textContent = 'Press me';
    node.classList.add('card__button');
    
    node.addEventListener('click', pressHandler);

    return node
}*/
