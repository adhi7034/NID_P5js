function setup() {
  createCanvas(400, 400)
  background(220);;
}
  function mousePressed() {
    if (mouseX < height/2){
      fill ("yellow");
      ellipse(mouseX,mouseY,20);}
    else{
      fill("red");
      ellipse(mouseX,mouseY,20);}
  }

function draw() {
  }


