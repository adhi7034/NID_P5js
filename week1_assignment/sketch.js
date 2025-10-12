let spriteImage, sprites = [];
let spriteX = 6, spriteY = 4;
let count = 0;
let row = 0;
let x = 50, y;
let xdir = 0;
let pathY;
let facingRight = true;


let bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9;
let scene = 1;


let bridge;

let bgMusic;

// 🌧️ Rain variables
let raindrops = [];

function preload() {

  bg1 = loadImage("Images/limbo.jpeg");
  bg2 = loadImage("Images/lust.jpeg");
  bg3 = loadImage("Images/gluttony.jpeg");
  bg4 = loadImage("Images/greed.jpeg");
  bg5 = loadImage("Images/wrath.jpeg");
  bg6 = loadImage("Images/heresy.jpeg");
  bg7 = loadImage("Images/violence.jpeg");
  bg8 = loadImage("Images/fraud.jpeg");
  bg9 = loadImage("Images/treachery.jpeg");

 
  spriteImage = loadImage("character/Swordsman_lvl2_Walk_with_shadow.png");

 
  bridge = loadImage("Bridge.png");


  bgMusic = loadSound("audio/adventure.mp3");
}

function setup() {
  createCanvas(800, 400);

  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;


  for (let i = 0; i < spriteY; i++) {
    sprites[i] = [];
    for (let j = 0; j < spriteX; j++) {
      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }

  pathY = height - 100;
  y = pathY - 40;

 
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.5);
  }

  // 🌧️ Create initial raindrops
  for (let i = 0; i < 300; i++) {
    raindrops.push(new Rain());
  }
}

function draw() {
  background(0);

  
  if (scene === 1) image(bg1, 0, 0, width, height);
  else if (scene === 2) image(bg2, 0, 0, width, height);
  else if (scene === 3) image(bg3, 0, 0, width, height);
  else if (scene === 4) image(bg4, 0, 0, width, height);
  else if (scene === 5) image(bg5, 0, 0, width, height);
  else if (scene === 6) image(bg6, 0, 0, width, height);
  else if (scene === 7) image(bg7, 0, 0, width, height);
  else if (scene === 8) image(bg8, 0, 0, width, height);
  else if (scene === 9) image(bg9, 0, 0, width, height);

  drawBridge();
  drawPlayer();
  updatePlayer();
  handleSceneChange();

 
  for (let drop of raindrops) {
    drop.update();
    drop.show();
  }

  
  fill(255);
  textSize(20);
  textAlign(CENTER, TOP);
  let sceneNames = [
    "Limbo", "Lust", "Gluttony", "Greed", "Wrath",
    "Heresy", "Violence", "Fraud", "Treachery"
  ];
  text("Layer of hell: " + sceneNames[scene - 1], width - 400, 50);
}

function drawBridge() {
  let bridgeW = 100;  
  let bridgeH = 104; 
  let yPos = pathY - 35;

  for (let i = 0; i < width; i += bridgeW - 5) {
    image(bridge, i, yPos, bridgeW, bridgeH);
  }
}

function drawPlayer() {
  push();
  translate(x, y);
  imageMode(CENTER);
  if (!facingRight) scale(-1, 1);
  image(sprites[row][count], -10, 30, 120, 120);
  pop();
}

function updatePlayer() {
  x += xdir;

  if (xdir !== 0 && frameCount % 5 === 0) {
    count = (count + 1) % spriteX;
  } else if (xdir === 0) {
    count = 0;
  }

  x = constrain(x, 0, width);
}

function handleSceneChange() {
  if (x > width - 20 && scene < 9) {
    scene++;
    x = 50;
  }
  if (x < 20 && scene > 1) {
    scene--;
    x = width - 50;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    row = 1;
    xdir = -5;
    facingRight = false;
  } else if (keyCode === RIGHT_ARROW) {
    row = 2;
    xdir = 5;
    facingRight = true;
  }

  // Optional: Toggle music on/off
  if (key === 'm' || key === 'M') {
    if (bgMusic.isPlaying()) {
      bgMusic.pause();
    } else {
      bgMusic.loop();
    }
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    xdir = 0;
    count = 0;
  }
}

// 🌧️ Rain particle class
class Rain {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.len = random(10, 20);
    this.speed = random(4, 10);
    this.thick = random(1, 2);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
      this.speed = random(4, 10);
    }
  }

  show() {
    stroke(173, 216, 230, 200);
    strokeWeight(this.thick);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
