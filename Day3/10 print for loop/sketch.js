let x, y, size, choice;

size = 25;
function setup() {
  createCanvas(400, 400);
  background(220);
  frameRate(10);

}

function draw() {

  background(220);
  for (let i = 0; i < width; i = i + 25) {
    for (let j = 0; j < height; j = j + 25) {
      choice = random(0, 1);
      if (choice < 0.5) {
        stroke(random(0, 255), random(150, 255), random(0, 255))
        line(i + size, j, i, j + size);
      }
      else {
        stroke(random(0, 255), random(150, 255), random(0, 255))
        line(i, j, i + size, j + size)
      }
    }

  }


}

