

let rockets = [];
let gravity;
let sparkImgs = []; 
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

function preload() {
  
  sparkImgs = [
    loadImage("image/elisha-terada-_b4ppn1Ssgw-unsplash.jpg"),
    loadImage("image/erwan-hesry-WPTHZkA-M4I-unsplash.jpg"),
    loadImage("image/nihal-prabhudesai-pKXznfGHfAY-unsplash.jpg"),
    loadImage("image/pratham-gupta-DksFIwoPLAA-unsplash.jpg"),
    loadImage("image/rahul-pandit-X4h8YNc7-1k-unsplash.jpg"),
    loadImage("image/rahul-saraf-Pg_22ufOyR0-unsplash.jpg"),
    loadImage("image/siddharth-shah-beHe41S5Rd0-unsplash.jpg"),
    loadImage("image/udayaditya-barua-xisPXJqwQkA-unsplash.jpg")
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  gravity = createVector(0, 0.08, 0); 

  poemLayer = createGraphics(windowWidth, windowHeight);
  poemLayer.textFont("Georgia");
  poemLayer.textAlign(CENTER, CENTER);
  poemLayer.textSize(26);
}

function draw() {
  background(0);

 
  orbitControl();

 
  ambientLight(40);
  directionalLight(255, 255, 255, -0.4, -1, -0.3);

  
  push();
  translate(0, 60, 0);
  rotateX(HALF_PI);
  translate(0, 200, -500);
  fill(220, 20, 30, 0.4);
  
  pop();

  
  blendMode(ADD);
  for (let i = rockets.length - 1; i >= 0; i--) {
    rockets[i].update();
    rockets[i].show();
    if (rockets[i].finished()) rockets.splice(i, 1);
  }
  blendMode(BLEND);

  
  drawPoemLayer();


  resetMatrix();
  camera();
  noLights();
  texture(poemLayer);
  plane(width, height);
}

function drawPoemLayer() {
  poemLayer.clear();
  poemLayer.fill(255);
  poemLayer.textSize(18);
  poemLayer.text("Press SPACE to send a memory to the sky", width / 2, 40);

 
  if (lineIndex > 0 && lineIndex <= poemLines.length) {
    lineAlpha = lerp(lineAlpha, 255, 0.02);
    poemLayer.fill(255, lineAlpha);
    poemLayer.textSize(28);
    poemLayer.text(poemLines[lineIndex - 1], width / 2, height - 80);
  }


  if (launches >= maxLaunches && rockets.length === 0) {
    poemLayer.fill(255, 200);
    poemLayer.textSize(22);
    poemLayer.text("And in the end, every light returns home.", width / 2, height / 2);
  }
}

function keyPressed() {
  if (key === ' ' && launches < maxLaunches) {
    let start = createVector(random(-100, 100), 300, random(-200, 200));
    rockets.push(new Rocket(start));
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
  poemLayer.textAlign(CENTER, CENTER);
  poemLayer.textSize(26);
}


class Rocket {
  constructor(pos) {
    this.pos = pos.copy();
    this.vel = createVector(random(-0.5, 0.5), random(-9, -11), random(-0.5, 0.5)); // slower rise
    this.exploded = false;
    this.particles = [];
    this.hue = random(0, 360);
    this.trail = [];
  }

  update() {
    if (!this.exploded) {
      this.trail.push(this.pos.copy());
      if (this.trail.length > 15) this.trail.shift();

      this.vel.add(gravity);
      this.pos.add(this.vel);

      if (this.vel.y > -2 || this.pos.y < -150) {
        this.explode();
      }
    } else {
      for (let p of this.particles) p.update();
      this.particles = this.particles.filter(p => !p.done());
    }
  }

  explode() {
    this.exploded = true;
    let count = floor(random(100, 180));
    for (let i = 0; i < count; i++) {
      let dir = p5.Vector.random3D().mult(random(2, 5));
      let tex = random(sparkImgs); 
      this.particles.push(new Particle3D(this.pos.copy(), dir, this.hue, tex));
    }
  }

  show() {
    push();
    if (!this.exploded) {
    
      push();
      translate(this.pos.x, this.pos.y, this.pos.z);
      fill(this.hue, 100, 100);
      sphere(6);
      pop();

     
      for (let i = 0; i < this.trail.length; i++) {
        let t = this.trail[i];
        push();
        translate(t.x, t.y, t.z);
        fill(this.hue, 100, 100, map(i, 0, this.trail.length - 1, 0.2, 1));
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

class Particle3D {
  constructor(pos, vel, hue, img) {
    this.pos = pos.copy();
    this.vel = vel.copy();
    this.hue = hue;
    this.life = random(500, 600);
    this.age = 0;
    this.size = random(40, 50);
    this.img = img; 
  }

  update() {
    this.vel.mult(0.98);
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
    // rotateY(frameCount * 0.01);
    texture(this.img);
    
    
    plane(64,36);
    pop();
  }
}
