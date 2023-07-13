let alataFont;
let world;

// test sprite
let spritesheet;
let spritedata;
let animation = [];
let explosion;

function preload() {
    alataFont = loadFont('./data/font/Alata-Regular.ttf');
    spritedata = loadJSON('./data/sprite/explosion/smoke.json');
    // spritesheet = loadImage('data/sprite/explosion/smoke.png');
}
function setup(){
    // canvas
    let screenWidth = document.body.clientWidth,
    screenHeight = document.body.clientHeight;
    
    world = new World(screenWidth,screenHeight);
    world.init();
    
    // font 
    textFont(alataFont);
    textSize(100);
    textAlign(CENTER);

    // world.setRanbowColor(true);
    // world.setLetterCollision(false);
    world.setRanbowColor(true);
    // world.setDebug(true);
    
    // create sprite
    // let frames = spritedata.frames;
    // for (let i = 1; i < frames; i++) {
    //   let x = i * spritedata.w;
    //   let y = 0;
    //   let img = spritesheet.get(x, y, spritedata.w, spritedata.h);
    //   animation.push(img);
    // }
    // explosion = new Sprite(animation,spritedata.w, spritedata.h, screenWidth/2, screenHeight/2, 1.0);

    world.setHomeLink("http://localhost:3000/sign-in");

}

function draw(){
    background("#222");
    world.show();
    // if(explosion){
    //     explosion.show();
    //     explosion.animate();
    // }
}

function mousePressed(){
    // if(explosion){
    //    explosion.play(mouseX,mouseY);
    // }
}

//  debug function
function setDebug(debug){
    world.setDebug(debug);
    world.setLetterLiveTime(debug ? 0 : 5000);
}

function setXOffset(offsetX){
    world.setLetterOffset("x",offsetX);
}

function setYOffset(offsetY){
    world.setLetterOffset("y",offsetY);
}

function setPath(path){
    world.setLastLetterPath(path);
}

function downloadKeyData(){
    world.downloadKeyData();
}

function getCurrLetter(){
    return world.getCurrLetter();
}

let offsetPathX = 61.44;
let offsetPathY = 62.3;
function setPathOffsetX(x){
    offsetPathX = x;
}

function setPathOffsetY(y){
    offsetPathY = y;
}