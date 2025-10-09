let x, y, size, choice;
x = 0;
y = 0;
size = 10;
function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
choice = random(0, 1);
if (choice < 0.5) {
  stroke(random(0,255),random(150,255),random(0,255))
  line(x + size, y, x, y + size);
} else {
  stroke(random(0,255),random(150,255),random(0,255))
  line(x, y, x + size, y + size)
}
x=x+size;
if (x>width){
  x=0
  y=y+size;
}
}