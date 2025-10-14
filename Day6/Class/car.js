// this is only a blueprint
class Car {
    constructor(x,y,size,speed){
        this.x=x;
        this.y=y;
        this.size=size;
        this.color=color(random(0,200),random(0,200),random(0,200))
        this.speed=speed;
    }

    show() {
        fill(this.color)
        rect(this.x,this.y,this.size,20);
        ellipse(this.x+10,this.y+20,10)
        ellipse(this.x+this.size-10,this.y+20,10)
    }
    move(){
        if (this.x>400){
            this.x=0;
        }
        this.x=this.x+this.speed;
    }
}   
