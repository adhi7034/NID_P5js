class Flower{
  constructor(x,y,xSpeed,ySpeed){
    this.x =x;
    this.y =y;
    this.size=50;
    this.xSpeed=xSpeed;
    this.ySpeed=ySpeed;
    this.selected=false
  }
  drawFlower(){
    if (this.selected== true){
      fill(random(0,255),random(0,255),random(0,255))
    }
    else{
      fill("white")
    }
    ellipse(this.x,this.y,20,50);
    ellipse(this.x,this.y,50,20);
    ellipse(this.x,this.y,20);

  }
  moveFlower(){
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    if(this.y>height || this.y<0){
      this.ySpeed= -this.ySpeed*1.0001
    }
    if(this.x>height || this.x<0){
      this.xSpeed= -this.xSpeed*1.001
    }
  }
  
  changeColor(mX,mY){
    let distance = dist(mX,mY,this.x,this.y)
    if(distance < this.size/2){
      this.selected=true
    }
    // else{
    //   this.selected=false
    // }
  }
}