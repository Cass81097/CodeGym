class World{
    // matter
    #Engine;
    #engine;
    
    #Render;
    #render;

    #Events;
    #Composite;

    #mouseConstraint;
    
    // state
    #debug = false

    #bInit = false;
    #gravity_y = 2;
    #worldSize = {
        height:0,
        width:0
    }
    
    // letter
    #ranbowColor = false;
    #timeLive = 5000;
    #defaultFontSize = 100;
    #letterRenderMode = "default";
    #letterCollision = true;
    #defaultColorLightess = 35;
    #defaultColor = {
        H:0,
        S:0,
        L:this.#defaultColorLightess
    };
    #currLetter = "a";
    #letterOption = {
        restitution:0.8,
        friction: 0,
        render : {
            fillStyle: 'black',
            strokeStyle: "#red",
            lineWidth: 1
        }
    }
    #LetterGroup =  2;
    #GroundGroup =  1;
    #SvgVerticesStore = [];

    //ground
    #ground;

    // letter list
    #enityList = [];

    // data
    #KeyList;

    // setting
    #setting;
    #settingControls = [];

    // world setting value
    #throwInfo = {
        angle:90,
        force:200,
        pos:{
            x:0,
            y:0
        }
    }

    #homeLink = null


    constructor(w,h){

        this.#worldSize.height = h;
        this.#worldSize.width = w;

        this.#Engine = Matter.Engine;

        this.#Render = Matter.Render;
        this.#Composite = Matter.Composite;

        this.#Events = Matter.Events,
        
        this.#engine  = this.#Engine.create();
        this.#engine.gravity.y = this.#gravity_y;

        let p5Render = createCanvas(w,h);
        this.#render = this.#Render.create({
            element : document.getElementById(p5Render.canvas.id).parentElement,
            // canvas: document.getElementById(p5Render.canvas.id),
            engine:this.#engine,
            options:{
                background: '#000000',
                wireframes: false
            }
        });

        this.#render.canvas.width = this.#worldSize.width;
        this.#render.canvas.height = this.#worldSize.height;

        this.#mouseConstraint = Matter.MouseConstraint.create(
            this.#engine, {element: document.body}
        );

        addEventListener('resize', (event) => {
            let w = document.body.clientWidth,h = document.body.clientHeight;
            if(this.#worldSize.height != h && this.#worldSize.width != w){

                this.#worldSize.height = h;
                this.#worldSize.width = w;
                this.#render.canvas.width = w;
                this.#render.canvas.height = h;
                resizeCanvas(w, h);
                this.#updateGround(w,h);
            }
        });

        // default value
        this.#throwInfo.pos.x = w/2;
        this.#throwInfo.pos.y = h/2;
    }
    
    async init(){

        // data
        this.#KeyList = await $.getJSON( "/data/keys.json");

        // load Svg Vertices
        setTimeout(this.#initSvgVertices(this.#KeyList),5);

        // map
        this.#initGround(this.#worldSize.width,this.#worldSize.height);
        
        // setting
        this.#setting = new Setting(this.#worldSize.width,this.#worldSize.height);
        this.#initSettingControls();

        // event
        this.#initEvents(this);
    }

    #initSettingControls(){

        // setting button
        for (let i = 0; i < this.#SvgVerticesStore.length; i++) {
            const data = this.#SvgVerticesStore[i];
            if(data.desc == "controls"){
                let controlBody = this.#setting.addControl(data.key,data.path,this.#worldSize,data.svgVertices);
                this.#Composite.add(this.#engine.world, controlBody);
                this.#settingControls.push(controlBody);
            }
        }

        // event
        this.#setting.addEvent(this.#setting.EVENT.ON_FORCE_CHANGE,(data)=>{
            this.#throwInfo = data;
            let currLetter = this.#currLetter ? this.#currLetter : "a";
            this.addLetter(this.getCurrLetter(currLetter));
        })

        this.#setting.addEvent(this.#setting.EVENT.ON_CLICK_LETTER,(data)=>{
            if (data.includes("Letter Home")){
                // goto page
                window.location.replace(this.#homeLink);
            }
        })

    }

    #initSvgVertices(keylist){

        for (let i = 0; i < keylist.length; i++) {
            const keyObj = keylist[i];
            if(keyObj.path.length > 6){
                let borderPath = getFirstEndOfPath(keyObj.border ? keyObj.border : keyObj.path);
                let svgVertices = Letter.loadSvgVertices(borderPath);
                this.#SvgVerticesStore.push({
                    key : keyObj.key,
                    svgVertices:svgVertices,
                    desc:keyObj.desc,
                    path:keyObj.path,
                    offset:keyObj.offset
                })
            }
        }
        document.addEventListener("keyup", event => {
            let key = event.key;
            if(key == "Delete" && this.#debug){
                this.clearEntity();
                return;
            }
            this.addLetter(key);
        });
        this.#bInit = true;
    }

    #initGround(screenW,sceenH){
        let w = 1920;
        let h = 50;
        let x = screenW/2;
        let y = sceenH + h/2;
        this.#ground = new Box(x,y,w,h,{
            render : {
                illStyle: 'black',
                strokeStyle: "white",
                lineWidth: 1
            },
            collisionFilter: {
                category:this.#GroundGroup,
                // mask: 1
            },
        });
        this.#ground.body.isStatic = true;
        this.#Composite.add(this.#engine.world,this.#ground.body);
    }

    #updateGround(screenW,screenH){
        let x = screenW/2;
        let y = screenH - 75;
        Matter.Body.setPosition(this.#ground.body,{x, y});
    }

    // WORD EVENT
    #initEvents(world){

        // START TOUCH
        this.#Events.on(this.#engine, 'collisionStart', function(event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                // var bodyA = null,bodyB = null;
                world.#enityList.forEach(letter=>{
                    if(pair.bodyA.parent.id == letter.id){
                        // bodyA = pair.bodyA.parent.id;
                        letter.wordEvent(event.name);
                    }
                    if(pair.bodyB.parent.id == letter.id){
                        // bodyB = pair.bodyB.parent.id;
                        letter.wordEvent(event.name);
                    }
                });
            }
        });
        this.#Events.on(this.#engine, 'collisionEnd', function(event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                // var bodyA = null,bodyB = null;
                world.#enityList.forEach(letter=>{
                    if(pair.bodyA.parent.id == letter.id){
                        // bodyA = pair.bodyA.parent.id;
                        letter.wordEvent(event.name);
                    }
                    if(pair.bodyB.parent.id == letter.id){
                        // bodyB = pair.bodyB.parent.id;
                        letter.wordEvent(event.name);
                    }
                });
            }
        });

        this.#Events.on(world.#mouseConstraint, 'mousemove', function (event) {
            var foundPhysics = Matter.Query.point(world.#settingControls, event.mouse.position);
            if(foundPhysics.length > 0){
                world.#setting.mouseMoved(foundPhysics[0]);
            }else{
                world.#setting.mouseMoved();
            }
        });

        this.#Events.on(this.#mouseConstraint, 'mousedown', function (event) {
            var foundPhysics = Matter.Query.point(world.#settingControls, event.mouse.position);
            if(foundPhysics.length > 0){
                world.#setting.mouseDown(foundPhysics[0]);
            }else{
                world.#setting.mouseDown();
            }
        });

        this.#Events.on(this.#mouseConstraint, 'mouseup', function (event) {
            var foundPhysics = Matter.Query.point(world.#settingControls, event.mouse.position);
            if(foundPhysics.length > 0){
                world.#setting.mouseUp(foundPhysics[0]);
            }else{
                world.#setting.mouseUp();
            }
        });

    }
    //  ADD LETETER
    addLetter(char){

        if(!this.#bInit){
            if(this.#debug){
                logError("World not init yet!");
            }
            return;
        }

        if(this.#debug && !["Shift","Control"].includes(char)){
            this.clearEntity();
        }
        let keyObj = this.#CharObjFromLetter(char);
        if(keyObj == null){
            return;
        }

        // Position
        let posX = this.#throwInfo.pos.x;
        let posY = this.#throwInfo.pos.y;
        // Velocity
        let velociy = GetXYVelocity(this.#throwInfo.angle,this.#throwInfo.force);


        // Color
        let letterColor = this.#defaultColor;
        // ranbow color setting
        if(this.#ranbowColor){
            letterColor = {
                H: GetRandomInt(0,359),
                S: 65,
                L:this.#defaultColorLightess
            }
        }

        // font size
        let letterFontSize = this.#defaultFontSize;

        // Collision
        let collisionFilter = {
                category : this.#LetterGroup,
                mask: this.#GroundGroup | this.#LetterGroup
        }
        
        if(!this.#letterCollision){
            collisionFilter.mask = this.#GroundGroup;
        }

        // Svg vertices
        let svgVertices = this.#getVerticesStore(keyObj.key);

        let letter = new Letter(keyObj,svgVertices,posX,posY,letterFontSize,letterColor,velociy,{...this.#letterOption,collisionFilter},this.#letterRenderMode);
        if(this.#debug){
            // letter.body.isStatic = true;
        }
        this.#Composite.add(this.#engine.world, letter.body);
        this.#enityList.push(letter);
        if(this.#timeLive > 0){
            // remove letter
            setTimeout(() => {
                this.#removeLetter(letter.id);
            }, this.#timeLive);
        }
        this.#settingControls.push(letter.body);
    }

    #removeLetter(id){

        try {
            
            for (let i = 0; i < this.#enityList.length; i++) {
                let entity = this.#enityList[i];
                if(entity == null){
                    continue;
                }
                if(entity.id == id){
                    let body = entity.body;
                    this.#Composite.remove(this.#engine.world,body);
                    this.#enityList[i] = null;
                    this.#enityList.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    #getVerticesStore(key){

        for (let i = 0; i < this.#SvgVerticesStore.length; i++) {
            const element = this.#SvgVerticesStore[i];
            if(element.key == key){
                return element.svgVertices;
            }
        }
        return null;
    }

    #CharObjFromLetter(char){

        // skip Shift key
        if(char == "Shift"){
            return null;
        }
        this.#currLetter = char;
        var [keyObj] = this.#KeyList.filter(item => item.key == char);
        if(keyObj == undefined || keyObj == null){
            if(this.#debug){
                console.log(`Key [${char}] not in data!`);
            }
            this.#currLetter = null;
          return null;
      }
      
        if(keyObj.path.length < 6){
            if(this.#debug){
                console.log(`Key[${char}] No path `);
                this.#currLetter = char;
            }
            return null;
        }
      
        if(keyObj.desc.length > 0){
            if(this.#debug){
                console.log(`Key[${char}]: ${keyObj.desc}`);
            }
        }
      
        return keyObj;
    }

    // Setting running world

    /**
     *  Đặt thời gian chữ cái biến mất. 1000 = 1 giây
     * @param {time} Number  
     */
    setLetterLiveTime(time){
        if(time == undefined || time == null || typeof(time) !== "number"){
            this.#timeLive = 5000;
            console.log("Letter live time set to: "+5000);
            return;
        }
        
        this.#timeLive = time;
        console.log("Letter live time set to: "+time);
        return;

    }

    setLetterRenderMode(mode){
        this.#letterRenderMode = mode ? mode : "default";
    }

    setRanbowColor(ranbow){
        this.#ranbowColor = ranbow;
    }

    setLetterCollision(bCollision){
        this.#letterCollision = bCollision;
    }

    // DEBUG

    setDebug(bDebug){
        if(bDebug == null || bDebug == undefined){
            return;
        }
        this.#debug = bDebug;

        if(bDebug){
            this.#Render.run(this.#render);
        }else{
            this.#Render.stop(this.#render);
        }
        document.querySelector(".p5Canvas").classList.toggle("debug",bDebug);
        console.log("Debug set to: "+ bDebug + "\r\n" + " - Press Delete key to clean all char");
    }
    isDebug(){
        return this.#debug;
    }

    clearEntity(){
        for (let i = 0; i < this.#enityList.length; i++) {
            let entity = this.#enityList[i];
            if(entity == null){
                continue;
            }
            this.#Composite.remove(this.#engine.world,entity.body);
            this.#enityList[i] = null;
        }
        this.#enityList = [];
    }

    setLetterOffset(direction,offset){
        if(this.#debug){
            if( !["x","y"].includes(direction) || typeof(offset) != "number"){
                return false;
            }
            for (let i = 0; i < this.#enityList.length; i++) {
                let entity = this.#enityList[i];
                if(entity != null){
                    entity.setOffset(direction,offset);
                    
                    for (let y = 0; y < this.#KeyList.length; y++) {
                        const element = this.#KeyList[y];
                        if(element.key == entity.letter){
                            element.offset[direction] = offset;
                            break;
                        }
                    }
                    return entity.letter + " "+direction + ":"+offset ;
                }
            }
            return false;
        }else{
            console.log("Debug must set to true");
        }
    }

    downloadKeyData(){
       if(this.#debug){
        var json = JSON.stringify(this.#KeyList);
        var a = document.createElement("a");
        var file = new Blob([json], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = "keys.json";
        a.click();
        return true;
       }
       return false;
    }
    getCurrLetter(){
        return this.#currLetter;
    }
    getSize(){
        return this.#worldSize;
    }
    setThrowAngle(angle){
        this.#throwInfo.angle = angle;
    }
    setThrowForce(force){
        this.#throwInfo.force = force;
    }

    setLastLetterPath(path){
        if(this.#debug){
            let letter = this.#currLetter;
            for (let y = 0; y < this.#KeyList.length; y++) {
                const element = this.#KeyList[y];
                if(element.key == letter){
                    element.path = path;

                    // restore SvgVertices
                    let svgVertices = Letter.loadSvgVertices(element.path);
                    for (let i = 0; i < this.#SvgVerticesStore.length; i++) {
                        let item = this.#SvgVerticesStore[i];
                        if(item.key == letter){
                            item.svgVertices = svgVertices;
                            break;
                        }
                    }

                    this.addLetter(letter);
                    console.log("Set letter "+letter + " path to: "+ this.#KeyList[y].path);
                }
            }
        }else{
            console.log("Debug must set to true");
        }
    }

    show(){
        if(!this.#bInit){
            return;
        }
        this.#Engine.update(this.#engine);
        for (let i = 0; i < this.#enityList.length; i++) {
            const entity = this.#enityList[i];
            if(entity != null){
                entity.show();
            }
        }
        this.#setting.show();
    }

    setHomeLink(link){
        this.#homeLink = link;
    }
}