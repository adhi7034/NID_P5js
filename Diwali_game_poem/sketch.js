let rockets = [];
let gravity;

// === SEPARATE IMAGE ARRAYS ===
let sparkSet1 = [];
let sparkSet2 = [];
let sparkSet3 = [];
let sparkSet4 = [];
let sparkSet5 = [];

let allSparkSets = []; // to access them easily

let poemLines = [
  "In the quiet after the crowd,",
  "I light the sky to remember.",
  "Each spark, a promise.",
  "Each burst, a heartbeat.",
  "One by one,",
  "lights bloom and fade,",
  "and the last,",
  "finds its way home."
];

let lineIndex = 0;
let lineAlpha = 0;
let launches = 0;
let maxLaunches = 10;

let poemLayer;
let bgLayer;

function preload() {
  // Firework 1 textures
  sparkSet1 = [
    loadImage("image/yash-yHHwg-NcHI0-unsplash.jpg")
    // loadImage("image/erwan-hesry-WPTHZkA-M4I-unsplash.jpg"),
    // loadImage("image/pratham-gupta-DksFIwoPLAA-unsplash.jpg")
  ];

  // Firework 2 textures
  sparkSet2 = [
    loadImage("image/udayaditya-barua-xisPXJqwQkA-unsplash.jpg")
    // loadImage("image/fire2_b.jpg"),
    // loadImage("image/fire2_c.jpg")
  ];

  // Firework 3 textures
  sparkSet3 = [
    loadImage("image/pratham-gupta-DksFIwoPLAA-unsplash.jpg")
    // loadImage("image/fire3_b.jpg"),
    // loadImage("image/fire3_c.jpg")
  ];

  // Firework 4 textures
  sparkSet4 = [
    loadImage("image/pratham-gupta-DksFIwoPLAA-unsplash.jpg")
    // loadImage("image/fire4_b.jpg"),
    // loadImage("image/fire4_c.jpg")
  ];

  // Firework 5 textures
  sparkSet5 = [
    loadImage("image/erwan-hesry-WPTHZkA-M4I-unsplash.jpg")
    // loadImage("image/fire5_b.jpg"),
    // loadImage("image/fire5_c.jpg")
  ];

  // Add all sets into one array for random selection
  allSparkSets = [sparkSet1, sparkSet2, sparkSet3, sparkSet4, sparkSet5];
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 255);
  gravity = createVector(0, 0.08, 0);

  poemLayer = createGraphics(windowWidth, windowHeight);
  poemLayer.colorMode(RGB);
  poemLayer.textFont("Georgia");
  poemLayer.textAlign(CENTER, CENTER);
  poemLayer.textSize(26);

  bgLayer = createGraphics(windowWidth, windowHeight);
  drawGradientBG();
}

function draw() {
  // Background gradient
  resetMatrix();
  camera();
  noLights();
  push();
  translate(0, 0, -1000);
  noStroke();
  texture(bgLayer);
  plane(width * 2, height * 2);
  pop();

  orbitControl();
  ambientLight(40);
  directionalLight(255, 255, 255, -0.4, -1, -0.3);

  // Fireworks
  blendMode(ADD);
  for (let i = rockets.length - 1; i >= 0; i--) {
    rockets[i].update();
    rockets[i].show();
    if (rockets[i].finished()) rockets.splice(i, 1);
  }
  blendMode(BLEND);

  // Poem
  drawPoemLayer();
  resetMatrix();
  camera();
  noLights();
  texture(poemLayer);
  push();
  translate(0, 0, 1);
  plane(width, height);
  pop();
}

function drawGradientBG() {
  bgLayer.clear();
  bgLayer.colorMode(HSB, 360, 100, 100, 255);
  bgLayer.noStroke();

  let cTop = bgLayer.color(220, 80, 6);
  let cBottom = bgLayer.color(280, 40, 12);

  for (let y = 0; y < bgLayer.height; y++) {
    let inter = map(y, 0, bgLayer.height, 0, 1);
    let c = bgLayer.lerpColor(cTop, cBottom, inter);
    bgLayer.fill(c);
    bgLayer.rect(0, y, bgLayer.width, 1);
  }
}

function drawPoemLayer() {
  poemLayer.clear();
  poemLayer.fill(255);
  poemLayer.textSize(18);
  poemLayer.text("Click anywhere to send a memory to the sky", poemLayer.width / 2, 40);

  if (lineIndex > 0 && lineIndex <= poemLines.length) {
    lineAlpha = lerp(lineAlpha, 255, 0.02);
    poemLayer.fill(255, lineAlpha);
    poemLayer.textSize(28);
    poemLayer.text(poemLines[lineIndex - 1], poemLayer.width / 2, poemLayer.height - 80);
  }

  if (launches >= maxLaunches && rockets.length === 0) {
    poemLayer.fill(255, 200);
    poemLayer.textSize(22);
    poemLayer.text("And in the end, every light returns home.", poemLayer.width / 2, poemLayer.height / 2);
  }
}

function mousePressed() {
  if (launches < maxLaunches) {
    let x = mouseX - width / 2;
    let y = mouseY - height / 2;
    let z = 0;

    let start = createVector(random(-100, 100), 350, random(-200, 200));
    let target = createVector(x, y, z);

    // Pick one complete image set per firework
    let chosenSet = random(allSparkSets);

    rockets.push(new Rocket(start, target, chosenSet));

    launches++;
    if (lineIndex < poemLines.length) {
      lineIndex++;
      lineAlpha = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  poemLayer = createGraphics(windowWidth, windowHeight);
  poemLayer.colorMode(RGB);
  poemLayer.textAlign(CENTER, CENTER);
  poemLayer.textSize(26);
  poemLayer.textFont("Georgia");

  bgLayer = createGraphics(windowWidth, windowHeight);
  drawGradientBG();
}

// === ROCKET CLASS ===
class Rocket {
  constructor(pos, target = createVector(0, 0, 0), textures = []) {
    this.pos = pos.copy();
    this.target = target.copy();
    this.vel = p5.Vector.sub(this.target, this.pos).normalize().mult(random(8, 10));
    this.exploded = false;
    this.particles = [];
    this.hue = random(0, 360);
    this.trail = [];
    this.type = random(["sphere", "ring", "spiral", "burst", "fountain"]);
    this.textures = textures; // fixed image set for this rocket
  }

  update() {
    if (!this.exploded) {
      this.trail.push(this.pos.copy());
      if (this.trail.length > 15) this.trail.shift();

      this.vel.add(gravity);
      this.pos.add(this.vel);

      if ((this.vel.y > 0 && this.pos.y > this.target.y) || p5.Vector.dist(this.pos, this.target) < 20) {
        this.explode();
      }
    } else {
      for (let p of this.particles) p.update();
      this.particles = this.particles.filter(p => !p.done());
    }
  }

  explode() {
    this.exploded = true;
    let count = floor(random(60, 90));
    for (let i = 0; i < count; i++) {
      let dir;
      let spread = random(3, 6);

      if (this.type === "sphere") dir = p5.Vector.random3D().mult(spread);
      else if (this.type === "ring") {
        let angle = random(TWO_PI);
        dir = createVector(cos(angle), 0, sin(angle)).mult(spread * 1.2);
      } else if (this.type === "spiral") {
        let angle = i * 0.25;
        dir = createVector(cos(angle), sin(angle) * 0.8, sin(angle)).mult(spread);
      } else if (this.type === "burst") {
        dir = createVector(random(-1, 1), random(-1, 1), random(-1, 1))
          .normalize()
          .mult(spread * 1.3);
      } else if (this.type === "fountain") {
        dir = createVector(random(-0.6, 0.6), random(-1.8, -0.8), random(-0.6, 0.6)).mult(spread);
      }

      let tex = random(this.textures); // texture only from this firework’s own set
      this.particles.push(new Particle3D(this.pos.copy(), dir, this.hue, tex));
    }
  }

  show() {
    push();
    if (!this.exploded) {
      push();
      translate(this.pos.x, this.pos.y, this.pos.z);
      fill(this.hue, 100, 100, 255);
      noStroke();
      sphere(6);
      pop();

      for (let i = 0; i < this.trail.length; i++) {
        let t = this.trail[i];
        push();
        translate(t.x, t.y, t.z);
        let a = map(i, 0, this.trail.length - 1, 50, 255);
        fill(this.hue, 100, 100, a);
        noStroke();
        sphere(2);
        pop();
      }
    } else {
      for (let p of this.particles) p.show();
    }
    pop();
  }

  finished() {
    return this.exploded && this.particles.length === 0;
  }
}

// === PARTICLE CLASS ===
class Particle3D {
  constructor(pos, vel, hue, img) {
    this.pos = pos.copy();
    this.vel = vel.copy();
    this.hue = hue;
    this.life = random(250, 350);
    this.age = 0;
    this.size = random(120, 180);
    this.img = img;
  }

  update() {
    this.vel.mult(0.97);
    this.vel.y += 0.02;
    this.pos.add(this.vel);
    this.age++;
  }

  done() {
    return this.age > this.life;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    if (this.img) texture(this.img);
    else fill(this.hue, 100, 100, 200);
    rotateY(frameCount * 0.01);
    plane(this.size, this.size);
    pop();
  }
}
