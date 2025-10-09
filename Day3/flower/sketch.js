function setup() {
  createCanvas(400, 400);
   background(50);
}


function draw(){

}
function mousePressed(){
  let petalSize= random(20,50)
  drawFlower(mouseX,mouseY,petalSize);
}

function drawFlower(x,y,z) {
  
  fill(random(0,255),0,0);
  circle (x,y-50,z);
  fill("green");
  rectangle(x-50,y+25,x-25,y-25);

}
