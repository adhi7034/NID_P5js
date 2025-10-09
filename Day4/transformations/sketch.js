// let noPetal = 0;
// let x = 0;
// let y = 0;
function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  
}

function draw() {
  background(220);
  drawFlower(14, 200, 200);
  drawFlower(14, 100, 500);
}
function drawFlower(noPetal, x, y) {
  push();
  translate(x, y);
  rotate(frameCount);

  for (let i = 0; i < noPetal; i=i+1) {
    
    //console.log(i);
    fill(255, 0, 0, 100);
    ellipse(20, 0, 200, 25);
    rotate(360 / noPetal);
    
  }
  fill(0, 255, 255);
  ellipse(0, 0, 50);
  pop();
}
