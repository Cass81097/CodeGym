class Letter {

    constructor(keyObj,SvgVertices = null,x, y, fontSize,color,velocity,option,renderMode = "default") {

        // init
        this.id = null;
        this.bNeonRender = false;
        this.btouched = false;
        this.delayTouchTimer = null;

        //get data
        this.Bodies = Matter.Bodies;
        this.Body  = Matter.Body;
        this.Vertices = Matter.Vertices;
        this.x = x;
        this.y = y;
        this.offset = keyObj.offset;
        this.fontSize = fontSize;
        this.color = color;
        this.letter = keyObj.key;
        this.path = keyObj.path;

        this.angle = 0;

        if(this.letter == "ArrowUp"){
            this.letter = "↑";
        }else if (this.letter == "ArrowRight"){
            this.letter = "→";
        }else if (this.letter == "ArrowDown"){
            this.letter = "↓";
        }else if (this.letter == "ArrowLeft"){
            this.letter = "←";
        }

        // physic
        this.defaultDensity = 0.001;
        this.uppercaseDensity = 10;

        // neon light
        this.neonLightess = 70;

        if(renderMode == "neon"){
            this.bNeonRender = true;
        }

        if(SvgVertices == null){
            SvgVertices = Letter.loadSvgVertices(keyObj.path);
        }
        
        this.body = this.Bodies.fromVertices(x, y, SvgVertices ,option, true);
        this.body.label = "Letter "+ keyObj.key +" ["+ this.body.id + "]";
        this.Body.setVelocity(this.body, velocity);
        this.body.density = this.letter.isLowerCase() ? this.defaultDensity : this.defaultDensity * this.uppercaseDensity; // Default: 0.001
        //start angle
        // this.Body.setAngularVelocity( this.body,GetRandomInt(-1,1) * Math.PI/(GetRandomInt(3,9)));

        this.id = this.body.id;
        this.angle = this.body.angle;
    }

    static loadSvgVertices(path){
        // make body
        var pathElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        pathElement.setAttribute("d",path); 
        var SvgVertices = Matter.Svg.pathToVertices(pathElement, 5);
        pathElement.remove();
        return SvgVertices;
    }

    getBody(){
        return this.body;
    }

    setOffset(direction,offset){
        if(direction == "y"){
            this.offset.y = offset;
        }else if(direction == "x"){
            this.offset.x = offset;
        }
    }

    // Events
    wordEvent(event){
        if(event == 'collisionStart'){
            this.onCollisionStart();
        }else if(event ='collisionEnd'){
            this.onCollisionEnd();
        }
    }

    onCollisionStart(){
       
        this.bNeonRender = true;
        this.btouched = true;   
        if(this.delayTouchTimer != null){
            clearTimeout(this.delayTouchTimer);
            this.delayTouchTimer = null;
        }else{
            this.delayTouchTimer = setTimeout(()=>{
                 if(!this.btouched){
                     this.bNeonRender = false;
                 }
             },150);

        }
    }

    onCollisionActive(){
        
    }

    onCollisionEnd(){
        this.btouched = false;
    }



    show(){
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        textSize(100)
        colorMode(HSL);

        if(this.#isSingleChar(this.letter)){

            rectMode(CENTER);
            translate(pos.x, pos.y);
            rotate(angle);

            if(this.bNeonRender){

                noFill();
                stroke(this.color.H,this.color.S,this.neonLightess);
                strokeWeight(4);

                this.#glow(15);
                text(this.letter, this.offset.x, this.offset.y);
                text(this.letter, this.offset.x, this.offset.y);

            }else{
                fill(this.color.H,this.color.S,this.color.L);
                text(this.letter, this.offset.x, this.offset.y);
            }

        }else{

            translate(pos.x, pos.y);
            rotate(angle);

            if(this.bNeonRender){
                noFill();
                this.#glow(15);
                stroke(this.color.H,this.color.S,this.neonLightess);
                strokeWeight(4);
            }else{
                fill(this.color.H,this.color.S,this.color.L);
            }

            this.#drawFromPath(this.path);
        }
        
        pop();
    }
    
    #drawFromPath(path){
        drawnFormPath(path);
    }

    #glow(blur){
        drawingContext.shadowBlur = blur;
        drawingContext.shadowColor = color(this.color.H,this.color.S,this.neonLightess);
    }

    // common
    #isSingleChar(char){
        return char.length == 1;
    }
}