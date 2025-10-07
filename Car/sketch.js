let xPos;
function setup() {
  xPos=0;
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawCar(xPos,100)
  xPos=xPos+1
}

function drawCar(x,y) {
  rect(x,y,40,30);
  ellipse(x+5,y+35,10,10);
  ellipse(x+35,y+35,10,10);

}