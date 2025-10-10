let colors = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();

  // define a color palette
  colors = [
    color(255, 100, 150),
    color(255, 180, 100),
    color(180, 255, 120),
    color(150, 200, 255),
    color(200, 150, 255)
  ];
}

function draw() {
  background(220);

  let spacingX = width / 10;
  let spacingY = height / 10;
  let boxSize = (spacingX, spacingY);

  for (let x = spacingX / 2; x < width; x += spacingX) {
    for (let y = spacingY / 2; y < height; y += spacingY) {
      fill(random(colors)); // choose random color from array
      rectMode(CENTER);
      rect(x, y, boxSize, boxSize);
    }
  }
}
