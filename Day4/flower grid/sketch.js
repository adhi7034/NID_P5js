let cols = 10;
let rows = 6;

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  noStroke();
  frameRate(10)
}

function draw() {
  background(230);

  let spacingX = width / (cols + 1);
  let spacingY = height / (rows + 1);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      push();
      let x = (i + 1) * spacingX;
      let y = (j + 1) * spacingY;
      translate(x, y);
      rotate(frameCount);
      let petals = int(random(8, 16));
      let size = random(0.3, 0.6);
      drawFlower(petals, size);
      pop();
    }
  }
}

function drawFlower(n, s) {
  push();
  scale(s);
  fill(255, 100, 150, 150);
  for (let i = 0; i < n; i++) {
    ellipse(20, 0, 200, 25);
    rotate(360 / n);
  }
  fill(255, 200, 0);
  ellipse(0, 0, 50);
  pop();
}
