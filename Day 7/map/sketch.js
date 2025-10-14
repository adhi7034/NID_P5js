function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {

  let c = map(mouseX, 0, width, 255, 0);
  background(c);
}
