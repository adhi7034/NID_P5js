function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(220);

  let cx = width / 2;
  let cy = height / 2;

  // --- Cake Base ---
  fill(255, 204, 153); // light brown
  stroke(150, 100, 50);
  strokeWeight(2);
  ellipse(cx, cy, 200, 200);

  // --- Frosting Layer ---
  fill(255, 102, 178, 200); // pink frosting
  ellipse(cx, cy, 180, 180);

  // --- Icing swirls ---
  stroke(255);
  strokeWeight(3);
  noFill();
  for (let r = 60; r <= 80; r += 10) {
    ellipse(cx, cy, r * 2, r * 2);
  }

  // --- Cherries around the cake ---
  fill(255, 0, 0);
  noStroke();
  let numCherries = 8;
  for (let i = 0; i < numCherries; i++) {
    let angle = TWO_PI / numCherries * i;
    let x = cx + cos(angle) * 70;
    let y = cy + sin(angle) * 70;
    ellipse(x, y, 20, 20);
  }

  // --- Sprinkles ---
  let sprinkleColors = ["#FFEA00", "#00FFFF", "#FF00FF", "#00FF00", "#FFA500"];
  for (let i = 0; i < 100; i++) {
    let angle = random(TWO_PI);
    let radius = random(0, 80);
    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;
    fill(random(sprinkleColors));
    noStroke();
    ellipse(x, y, 5, 10);
  }

  // --- Center decoration (chocolate heart) ---
  fill(120, 40, 20);
  beginShape();
  vertex(cx, cy - 15);
  bezierVertex(cx - 15, cy - 40, cx - 50, cy + 10, cx, cy + 25);
  bezierVertex(cx + 50, cy + 10, cx + 15, cy - 40, cx, cy - 15);
  endShape(CLOSE);
}
