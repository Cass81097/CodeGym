class Box{
    constructor(x,y,w,h,option){

        this.body = Matter.Bodies.rectangle(x,y,w,h,option);
        this.w = w;
        this.h = h;
        this.id = this.body.id;
    }
    
    show(){
        // let pos = this.body.position;
        // fill(255);
        // color(red)
        // rect(pos.x,pos.y,this.w,this.h);
    }
}