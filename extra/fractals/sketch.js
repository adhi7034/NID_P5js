let sponge = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  sponge.push(new Box(0, 0, 0, 200));
}

function draw() {
  background(10);
  orbitControl();
  rotateY(frameCount * 0.005);
  rotateX(frameCount * 0.003);

  lights();

  for (let b of sponge) {
    b.show();
  }
}

function mousePressed() {
  let next = [];
  for (let b of sponge) {
    next = next.concat(b.generate());
  }
  sponge = next;
}

// ---------- BOX CLASS ----------
class Box {
  constructor(x, y, z, s) {
    this.pos = createVector(x, y, z);
    this.size = s;
  }

  generate() {
    let boxes = [];
    let newSize = this.size / 3;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {

          let sum = abs(x) + abs(y) + abs(z);

          // remove center parts
          if (sum > 1) {
            boxes.push(
              new Box(
                this.pos.x + x * newSize,
                this.pos.y + y * newSize,
                this.pos.z + z * newSize,
                newSize
              )
            );
          }
        }
      }
    }
    return boxes;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    ambientMaterial(200);
    box(this.size);
    pop();
  }
}
