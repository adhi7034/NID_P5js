let flowers = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);

  for (let i = 0; i < 5; i++) {
    flowers.push(new Flower((random(0, 20)), random(width), random(-500, 0)));
  }
}

function draw() {
  background(220);

  for (let f of flowers) {
    f.update();
    f.display();
  }
}
