function setup() {
  createCanvas(400, 400);
   background("#20BDFF");
}

function draw() {
  noStroke()
  fill(mouseX/2,mouseY/2,125)
  ellipse(mouseX,mouseY,25,25);
  ellipse(width-mouseX,height-mouseY,25,25)
  ellipse(mouseX,height-mouseY,25,25)
  ellipse(width-mouseX,mouseY,25,25)
  
  line
}
