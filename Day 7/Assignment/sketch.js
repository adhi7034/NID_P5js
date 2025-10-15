let flowers = [];

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].grow();

    for (let j = 0; j < flowers.length; j++) {
      if (i != j) {
        flowers[i].collision(flowers[j]);
      }
    }

    flowers[i].changeColor(mouseX, mouseY);
    flowers[i].moveFlower();
    flowers[i].drawFlower();
  }
}

function mousePressed() {
  let tempFlower = new Flower(
    random(width), random(height), random(-2, 2), random(-2, 2)
  );
  flowers.push(tempFlower);
}
