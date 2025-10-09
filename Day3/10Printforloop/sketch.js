
function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  for (let i=0; i<width; i=i+25){
    for (let y=0; y<height; y=y+25)
      ellipse(i+5,y+5,5)
  }
    
}