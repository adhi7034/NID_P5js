let flowers = [];

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  

  // for (let i = 0; i < 5; i++) {
  //   flowers.push(new Flower((random(12, 20)), random(width), random(-500, 0)));
  // }
}

function draw() {
  background(220);
  for(let i=0; i<flowers.length;i++){
    flowers[i].changeColor(mouseX,mouseY)

    flowers[i].moveFlower();
    flowers[i].drawFlower();
  }

  // for (let f of flowers) {
  //   f.update();
  //   f.display();
  // }
}

function mousePressed(){
  let tempFlower = new Flower(random(width),random(height),random(0,5),random(-5,5));
  flowers.push(tempFlower);
}
