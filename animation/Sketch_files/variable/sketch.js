let x;
function setup() {
  createCanvas(400, 400);
  ellipse(mouseX,height-mouseY,25,25)
  x=0;
}

function draw() {
  background(220)
  fill("red")
  ellipse(x,height/2,20,20)
  x=x+5
}
