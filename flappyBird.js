
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 100;

var constant = pipeNorth.height+gap;

var bx = 10;

var by = 150;

var gravity = 1.7;

// audio files

    var fly = new Audio();
    var scor = new Audio();

    fly.src = "sounds/fly.mp3";


    //on key down

document.addEventListener("keydown", moveUp);

function moveUp() {

    by -= 25;

}

    //pipe coordinates

var pipe  = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

    function draw() {

    ctx.drawImage(bg, 0,0);


    for (var i = 0; i < pipe.length; i++){

        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;
        
        if (pipe[i].x == 125){
            pipe.push({
               x : cvs.width,
                y: Math.floor(Math.random()*pipeNorth.height)- pipeNorth.height
            });
        }

    //    detect collision

        if (bx + bird.width >=pipe[i].x && bx <= pipe[i].x +pipeNorth.width && (by <=pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+constant)|| by + bird.height >= cvs.height - fg.height){
            location.reload(); //reload page

        }

    }
    ctx.drawImage(fg, 0,cvs.height - fg.height);

    ctx.drawImage(bird, bx, by);

    by += gravity;

    fly.play();

    requestAnimationFrame(draw);

}

draw();






















