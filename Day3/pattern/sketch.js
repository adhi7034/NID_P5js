let size = 30;
let choice;

function setup() {
  createCanvas(800, 800, WEBGL);  
  frameRate(10);
  noStroke();
}

function draw() {
  background(250);

  let rotY = map(mouseX, 0, width, -PI / 4, PI / 4);
  let rotX = map(mouseY, 0, height, -PI / 4, PI / 4);
  rotateX(rotX);
  rotateY(rotY);
  let lx = map(mouseX, 0, width, -200, 200);
  let ly = map(mouseY, 0, height, -200, 200);
  let lz = 200;

  ambientLight(155);
  directionalLight(200, 0, 60, lx, ly, lz);

  for (let i = -width / 2; i < width / 2; i += size) {
    for (let j = -height / 2; j < height / 2; j += size) {
      push();
      translate(i, j, 0);
      choice = random(1);

      emissiveMaterial(0, random(50, 255), random(50, 255));

      if (choice < 0.5) {
        push();
        //rotateX((180 * random()) / 10);
       // rotateY((180 * random()) / 10);
        box(size * 0.5);
        pop();
      } else {
        push();
       // rotateX((180 * random()) / 10);
        //rotateY((180 * random()) / 10);
        cone(size * 0.4, size * 0.8);
        pop();
      }

      pop();
    }
  }
}

