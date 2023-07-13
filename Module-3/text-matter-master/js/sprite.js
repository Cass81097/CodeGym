class Sprite {
    constructor(animation,w,h, x, y,speed) {
      this.x = x;
      this.y = y;
      this.animation = animation;
      this.w = w;
      this.h = h;
      this.len = this.animation.length;

      this.speed = speed;
      this.index = 0;
      this.stop = true;
    }
  
    show() {
      if(!this.stop){
        let index = floor(this.index) % this.len;
        image(this.animation[index], this.x, this.y);
        this.stop = index >= this.len -1;
        if(this.stop){
            this.index = 0;
        }
      }
    }

    play(x,y){
        this.x = x - this.w/2;
        this.y = y - this.h/2;
        this.stop = false;
        this.index = 0;
    }
  
    animate() {
        if(!this.stop){
            this.index += this.speed;
            
        }
    }
  }