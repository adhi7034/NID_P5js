let rockets = [];
let gravity;
let bgMusic;

// === SEPARATE IMAGE ARRAYS ===
let sparkSet1 = [];
let sparkSet2 = [];
let sparkSet3 = [];
let sparkSet4 = [];
let sparkSet5 = [];
let allSparkSets = [];
let combinedSet = [];

let poemLines = [
  "In the quiet after the crowd,",
  "I light the sky to remember.",
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

let poemLayer, bgLayer;
let stars = [];

function preload() {
  soundFormats('mp3', 'ogg');
  bgMusic = loadSound("sound/nostalgia-a-sweet-amp-memorable-loopable-piano-song-by-gtg-319605.mp3");

  // === Firework texture sets ===
  sparkSet1 = [loadImage("image/sp1a.jpg"),
  loadImage("image/sp1b.jpg"),
  loadImage("image/sp1c.jpg"),
  loadImage("image/sp1d.jpg")];
  sparkSet2 = [loadImage("image/sp2a.jpg"),
  loadImage("image/sp2b.jpg"),
  loadImage("image/sp2c.jpg"),
  loadImage("image/sp2d.jpg"),
  loadImage("image/sp2e.jpg")];
  sparkSet3 = [loadImage("image/sp3a.jpg"),
  loadImage("image/sp3b.jpg"),
  loadImage("image/sp3c.jpg"),
  loadImage("image/sp3d.jpg")];
  sparkSet4 = [loadImage("image/sp4a.jpg"),
  loadImage("image/sp4b.jpg"),
  loadImage("image/sp4c.jpg"),
  loadImage("image/sp4d.jpg")];
  sparkSet5 = [loadImage("image/sp5a.jpg"),
  loadImage("image/sp5b.jpg"),
  loadImage("image/sp5c.jpg"),
  loadImage("image/sp5d.jpg")];

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

  // Create combined set for the final firework
  combinedSet = [].concat(...allSparkSets);

  // 🎵 Music
  if (bgMusic && !bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.4);
  }

  // ✨ Create stars (depth-aware)
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: random(-width * 3, width * 3),
      y: random(-height * 1, height * 3),
      z: random(-1500, -200),
      brightness: random(100, 255),
      size: random(1, 3),
      twinkle: random(0.5, 2)
    });
  }
}

function draw() {
  background(0);

  // === Stars behind everything ===
  push();
  noStroke();
  for (let s of stars) {
    push();
    translate(s.x, s.y, s.z);
    let alpha = s.brightness + 40 * sin(frameCount * 0.01 * s.twinkle);
    fill(255, alpha);
    sphere(s.size);
    pop();
  }
  pop();

  // === Gradient background plane ===
  resetMatrix();
  camera();
  noLights();
  push();
  translate(0, 0, -800);
  noStroke();
  texture(bgLayer);
  plane(width * 4, height * 4);
  pop();

  // === Fireworks ===
  orbitControl();
  ambientLight(80);
  directionalLight(255, 255, 255, -0.4, -1, -0.3);

  blendMode(ADD);
  for (let i = rockets.length - 1; i >= 0; i--) {
    rockets[i].update();
    rockets[i].show();
    if (rockets[i].finished()) rockets.splice(i, 1);
  }
  blendMode(BLEND);

  // === Poem layer ===
  drawPoemLayer();
  resetMatrix();
  camera();
  noLights();
  push();
  translate(0, 0, 1);
  image(poemLayer, -width / 2, -height / 2);
  pop();
}

// === Gradient BG ===
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

// === Poem Layer ===
function drawPoemLayer() {
  poemLayer.clear();



  if (lineIndex > 0 && lineIndex <= poemLines.length) {
    lineAlpha = lerp(lineAlpha, 255, 0.02);
    poemLayer.fill(255, lineAlpha);
    poemLayer.textSize(35);
    poemLayer.text(poemLines[lineIndex - 1], poemLayer.width / 2, poemLayer.height - 80);
  }

  if (launches >= maxLaunches && rockets.length === 0) {
    poemLayer.fill(255, 200);
    poemLayer.textSize(50);
    poemLayer.text("And in the end, The stars reclaim their silence.", poemLayer.width / 2, poemLayer.height / 2);
  }
}

// === Mouse Firework ===
function mousePressed() {
  if (launches < maxLaunches) {
    let x = mouseX - width / 2;
    let y = mouseY - height / 2;
    let z = random(-200, 100); // near the camera

    let start = createVector(random(-100, 100), 350, random(-200, 200));
    let target = createVector(x, y, z);

    let chosenSet = launches === 9 ? combinedSet : allSparkSets[launches % allSparkSets.length];

    rockets.push(new Rocket(start, target, chosenSet, launches === 9));
    launches++;

    if (lineIndex < poemLines.length) {
      lineIndex++;
      lineAlpha = 0;
    }
  }
}

function keyPressed() {
  if (key === 'm' || key === 'M') {
    if (bgMusic.isPlaying()) bgMusic.pause();
    else bgMusic.loop();
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

// === Rocket ===
class Rocket {
  constructor(pos, target = createVector(0, 0, 0), textures = [], isFinal = false) {
    this.pos = pos.copy();
    this.target = target.copy();
    this.vel = p5.Vector.sub(this.target, this.pos).normalize().mult(random(8, 10));
    this.exploded = false;
    this.particles = [];
    this.hue = random(0, 360);
    this.trail = [];
    this.type = random(["sphere", "ring", "spiral", "burst", "fountain"]);
    this.textures = textures;
    this.isFinal = isFinal;
  }

  update() {
    if (!this.exploded) {
      this.trail.push(this.pos.copy());
      if (this.trail.length > 15) this.trail.shift();
      this.vel.add(gravity);
      this.pos.add(this.vel);

      if ((this.vel.y > 0 && this.pos.y > this.target.y) || p5.Vector.dist(this.pos, this.target) < 20) this.explode();
    } else {
      for (let p of this.particles) p.update();
      this.particles = this.particles.filter(p => !p.done());
    }
  }

  explode() {
    this.exploded = true;
    let count = this.isFinal ? floor(random(25, 30)) : floor(random(10, 12));

    for (let i = 0; i < count; i++) {
      let dir;
      let spread = random(3, 6);
      if (this.type === "sphere") dir = p5.Vector.random3D().mult(spread);
      else if (this.type === "ring") dir = createVector(cos(random(TWO_PI)), 0, sin(random(TWO_PI))).mult(spread * 1.2);
      else if (this.type === "spiral") {
        let angle = i * 0.25;
        dir = createVector(cos(angle), sin(angle) * 0.8, sin(angle)).mult(spread);
      } else if (this.type === "burst") dir = createVector(random(-1, 1), random(-1, 1), random(-1, 1)).normalize().mult(spread * 1.3);
      else if (this.type === "fountain") dir = createVector(random(-0.6, 0.6), random(-1.8, -0.8), random(-0.6, 0.6)).mult(spread);

      let tex = random(this.textures);
      this.particles.push(new Particle3D(this.pos.copy(), dir, this.hue, tex));
    }
  }

  show() {
    if (!this.exploded) {
      push();
      translate(this.pos.x, this.pos.y, this.pos.z);
      fill(this.hue, 100, 100);
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
  }

  finished() {
    return this.exploded && this.particles.length === 0;
  }
}

// === Particle ===
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
    plane(this.size, (this.size * 9) / 16);
    pop();
  }
}
