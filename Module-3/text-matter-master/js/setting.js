class Setting {
    // button name
    #BTN_SETTING = "btn-setting";
    #BTN_FORCEANGLE = "btn-force-angle";

    // event name
    EVENT = {
        ON_FORCE_CHANGE :"onForceChange",
        ON_CLICK_LETTER :"clickletter"
    }
    
    // on setting : draw other control, control event on
    #bOnSetting = false;

    // controls state
    #setForceAngleOn = false;
    #forceData = {
        angle:0,
        force:200,
        pos:{
            x:0,
            y:0
        }
    }

    // controls list
    #controls = []

    // color
    #activeColor = {
        R:237,
        G:156,
        B:33,
        A:1
    }

    #color = {
        R:153,
        G:153,
        B:153
    }

    // event
    #eventHandle;

    // mouse
    #mouse = {
        clickPos:false,
        isHold:false
    }

    constructor(w,h,controlsData){
       this.#initControls(w,h,controlsData);
       this.#eventHandle = new Event();
    }

    #initControls(w,h){
        this.x, this.y;
    }

    addControl(name,path,worldSize,SvgVertices){
        let pos = this.#getControlPos(name,worldSize);
        let body = Matter.Bodies.fromVertices(pos.x,pos.y, SvgVertices ,{
            collisionFilter:{
                category:4
            },
            isStatic:true,
            label:name
        }, true);

        this.#controls.push({
            name: name,
            path:path,
            hover:false,
            active:false,
            x:pos.x,
            y:pos.y
        })
        return body;
    }

    addEvent(name,callback){
        this.#eventHandle.addHandler(name,callback);
    }

    #fireEvent(name,playload){
        if(!playload){
            playload = null;
        }
        if(name == this.EVENT.ON_FORCE_CHANGE){
            playload = this.#forceData;
        }
        this.#eventHandle.execute(name,playload);
    }
    

    // mouse Event
    mouseMoved(body = null){
        cursor(ARROW)
        for (let i = 0; i < this.#controls.length; i++) {
            const control = this.#controls[i];
            control.hover = false;
            if(body && control.name == body.label){
                if(this.#bOnSetting){
                    control.hover = true;
                    cursor(HAND)
                }else if (control.name == this.#BTN_SETTING){
                    control.hover = true;
                    cursor(HAND);
                    break;
                }
            }
        }
    }

    mouseDown(body){
        this.#mouse.isHold = true;
        let clickButton = false;
        for (let i = 0; i < this.#controls.length; i++) {
            const control = this.#controls[i];
            if(body && control.name == body.label){
                this.#onCLickControl(control);
                clickButton = true;
            }
        }
        if(!clickButton){
            this.#mouse.clickPos = {
                x:mouseX,
                y:mouseY
            }
        }
    }
    mouseUp(body){
        this.#mouse.clickPos = false;
        this.#mouse.isHold = false;

        if(this.#setForceAngleOn){
            this.#fireEvent(this.EVENT.ON_FORCE_CHANGE);
        }else{
            if (body){
                if(body.label){
                    this.#fireEvent(this.EVENT.ON_CLICK_LETTER,body.label);
                }
            }
        }
    }

    #onCLickControl(control){
        let active = false;
        switch(control.name){

            case this.#BTN_SETTING:
                this.#bOnSetting = !this.#bOnSetting;
                if(!this.#bOnSetting){
                    this.#resetControls();
                }
                active = this.#bOnSetting;
                break;

            case this.#BTN_FORCEANGLE:
                if(this.#bOnSetting){
                    this.#setForceAngleOn = !this.#setForceAngleOn;
                    active = this.#setForceAngleOn;
                }
                break;
            default:
                break;
        }
        control.active = active;
    }

    #resetControls(){
        // controls effect
        for (let i = 0; i < this.#controls.length; i++) {
            const control = this.#controls[i];
            control.active = false;
        }

        // controls status
        this.#setForceAngleOn = false;
    }

    #getControlPos(name,worldSize){
        let pos = {x:0,y:0};
        switch (name){
            case this.#BTN_SETTING:
                pos.x = worldSize.width - 50;
                pos.y = 50;
                break;
            case this.#BTN_FORCEANGLE:
                pos.x = worldSize.width - 50;
                pos.y = 110;
            default:
                break;
        }

        return pos;
    }

    #drawIcon(control){
        push();
        colorMode(RGB, 255, 255, 255, 1);
        translate(control.x, control.y);
        noStroke();
        if(control.active){
            if(control.name == this.#BTN_SETTING){
                fill(this.#color.R,this.#color.G,this.#color.B,0.8);
            }else{
                fill(this.#activeColor.R,this.#activeColor.G,this.#activeColor.B,this.#activeColor.A);
            }
        }else{
            fill(this.#color.R,this.#color.G,this.#color.B,control.hover ? 0.8 : 0.4);
        }
        drawnFormPath(control.path);
        pop();
    }

    #drawFuture(){
        if(this.#setForceAngleOn){
            this.#drawForceAngle();
        }
    }

    #drawForceAngle(){
        if(this.#mouse.clickPos){

            let rootPos = this.#mouse.clickPos;
            // store value: pos
            this.#forceData.pos = rootPos;
            let RootVector = createVector(rootPos.x, rootPos.y);

            let tempVector = createVector((rootPos.x - 50) - rootPos.x, 0);
            // this.#drawArrow(RootVector, tempVector, 'red');

            let forceVector = createVector(mouseX - rootPos.x, mouseY - rootPos.y);
            this.#drawArrow(RootVector, forceVector , 'gray');
            
            let angleBetween = tempVector.angleBetween(forceVector);
            if(isNaN(angleBetween)){
                angleBetween = 0;
            }
            let degreesAngle = degrees(angleBetween).toFixed(1);
            
            // store values: angle
            this.#forceData.angle = parseFloat(degreesAngle);

            // force calc
            this.#forceData.force = GetForceFormXY(mouseX - rootPos.x,mouseY - rootPos.y).toFixed(1);
            
            // angle text pos
            let angleTextOffsetY = this.#forceData.angle >= 0 ? 20 : -20;
            //  text
            push()
            noStroke();
            textSize(15);
            fill(255,225,255);
            text(degreesAngle + "°",rootPos.x,rootPos.y +  angleTextOffsetY);
            textSize(15 + (this.#forceData.force/20));
            text(this.#forceData.force + "",mouseX + 20,mouseY - 10);
            pop()
        }
    }
    #drawArrow(base, vec, myColor) {
        push();

        //  arrow
        stroke(myColor);
        strokeWeight(2);
        fill(myColor);
        translate(base.x, base.y);
        // point
        circle(0, 0, 10);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        let arrowSize = 7;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();

      }

    getSettingState(){
        let state = "settingOff";
        if(this.#bOnSetting){
            state = "settingOn";
        }else{
            return state;
        }
        if(this.#setForceAngleOn){
            state = "forceAngleOn";
        }
        return state;
    }

    // state
    isOnSetting(){
        return this.#bOnSetting;
    }

    show(){
        for (let i = 0; i < this.#controls.length; i++) {
            const control = this.#controls[i];
            if(this.#bOnSetting){
                this.#drawIcon(control);
            }else if(control.name == "btn-setting"){
                this.#drawIcon(control);
                break;
            }
        }
        this.#drawFuture();
    }

}