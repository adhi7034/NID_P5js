let spriteImage, sprites = [];
let spriteX = 6, spriteY = 4;
let count = 0, row = 0;
let x = 50, y;
let xdir = 0;
let pathY;
let facingRight = true;

let bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9;
let scene = 1;

let bridge;
let bgMusic;

let raindrops = [];

let demonSheet, demonFrames = [];

let sceneTexts = [
  "“Noble minds dwell without torment, yet without hope — forever yearning for the light they never knew.”",
  "“The winds that tossed their hearts now toss their souls — love’s desire turned endless storm.”",
  "In filth they wallow, who once worshiped the belly — their hunger now a ceaseless rain.",
  "The weight of gold they sought now crushes them — blind to all but gain and loss.",
  "“Rage boils and festers — those who let fury rule now drown in their own dark waters.”",
  "“The mind that denied eternity now burns in its own tomb of false wisdom.”",
  "Love twisted to hate — blood, ash, and anguish mark those who warred against life and God.",
  "Cunning turned to poison — reason itself betrays its sacred gift.",
  "“Frozen hearts lie still beneath the ice — love extinguished, faith forever broken.”"
];
let textX, scrollSpeed = 2;

let dialogueIndex = 0;
let showDialogue = false;

let dialogues = [
  { speaker: "demon", text: "You’ve come a long way, mortal... farther than most ever dare." },
  { speaker: "player", text: "I only seek to redeem my soul. Tell me—what is this place?" },
  { speaker: "demon", text: "This is the entrance to Hell. Each circle below waits to judge you for the sins of your life." },
  { speaker: "player", text: "Judge me? I’ve harmed no one. My mistakes were only human." },
  { speaker: "demon", text: "Every soul says the same. Your greed, your anger, your pride—they chained you here long ago." },
  { speaker: "player", text: "Then I’ll face whatever waits below. If this is my punishment, I’ll see it through." },
  { speaker: "demon", text: "You will pass through nine circles, each reflecting a sin you carried within. None leave unchanged." },
  { speaker: "player", text: "Then let it begin. I’ll walk through every fire, every shadow, until I find my truth." },
  { speaker: "demon", text: "So be it. Beyond this bridge lies your reckoning. Step forward, and face what you’ve earned." },
  { speaker: "player", text: "I will. If Hell is the price of my sins, then I’ll pay it myself." }
];

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
  demonSheet = loadImage("devil/IDLE.png");
  bgMusic = loadSound("audio/adventure.mp3");
}

function setup() {
  createCanvas(800, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;
  for (let i = 0; i < spriteY; i++) {
    sprites[i] = [];
    for (let j = 0; j < spriteX; j++) {
      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }

  let dw = demonSheet.width / 4;
  for (let i = 0; i < 4; i++) {
    demonFrames.push(demonSheet.get(i * dw, 0, dw, demonSheet.height));
  }

  pathY = height - 100;
  y = pathY - 40;

  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.5);
  }

  for (let i = 0; i < 300; i++) raindrops.push(new Rain());

  textX = width / 2;
}

function draw() {
  imageMode(CORNER);
  if (scene === 1) image(bg1, 0, 0, width, height);
  else if (scene == 2) image(bg2, 0, 0, width, height);
  else if (scene == 3) image(bg3, 0, 0, width, height);
  else if (scene == 4) image(bg4, 0, 0, width, height);
  else if (scene == 5) image(bg5, 0, 0, width, height);
  else if (scene == 6) image(bg6, 0, 0, width, height);
  else if (scene == 7) image(bg7, 0, 0, width, height);
  else if (scene == 8) image(bg8, 0, 0, width, height);
  else if (scene == 9) image(bg9, 0, 0, width, height);
  else background(0);

  drawBridge();
  imageMode(CENTER);
  drawPlayer();
  updatePlayer();
  handleSceneChange();

  if (scene == 10) {
    drawDemon();
    if (showDialogue) drawDialogue();
    fill(255, 255, 0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Press F to Talk", width - 100, pathY - 160);
  }

  if (scene == 1) {
    fill(255, 255, 0);
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text("To Go Right Press right arrow ->", 50, 100);
  }

  for (let drop of raindrops) {
    drop.update();
    drop.show();
  }

  if (scene <= 9) drawRollingText();
}

function drawPlayer() {
  push();
  translate(x, y);
  imageMode(CENTER);
  if (!facingRight) scale(-1, 1);
  if (sprites[row] && sprites[row][count]) image(sprites[row][count], 0, 30, 120, 120);
  pop();
}

function updatePlayer() {
  x += xdir;
  x = constrain(x, 0, width);
  if (xdir !== 0 && frameCount % 5 == 0) count = (count + 1) % spriteX;
  else if (xdir == 0) count = 0;
}

function handleSceneChange() {
  if (x > width - 20 && scene < 10) { scene++; x = 50; }
  if (x < 20 && scene > 1) { scene--; x = width - 50; }
}

function drawBridge() {
  let bridgeW = 100, bridgeH = 104;
  let yPos = pathY - 35;
  for (let i = 0; i < width; i += bridgeW - 5) {
    image(bridge, i, yPos, bridgeW, bridgeH);
  }
}

function drawDemon() {
  let demonFrame = demonFrames[floor(frameCount / 8) % 4];
  let demonX = width - 100, demonY = pathY - 80;
  image(demonFrame, demonX, demonY, 150, 150);
}

class Rain {
  constructor() {
    this.x = random(width); this.y = random(-height, 0);
    this.len = random(10, 20); this.speed = random(4, 10);
  }
  update() { this.y += this.speed; if (this.y > height) { this.y = random(-100,0); this.x = random(width); this.speed = random(4,10); } }
  show() { stroke(173,216,230,200); strokeWeight(1.5); line(this.x,this.y,this.x,this.y+this.len); }
}

function drawRollingText() {
  fill(255,230); textSize(20); textAlign(CENTER,CENTER);
  let msg = sceneTexts[scene-1];
  let msgWidth = textWidth(msg);
  text(msg, textX, height/2);
  textX -= scrollSpeed;
  if (textX < -msgWidth/2) textX = width + msgWidth/2;
}

function drawDialogue() {
  let dlg = dialogues[dialogueIndex];
  if (!dlg) return;
  let demonX = width - 100, demonY = pathY - 80;
  let boxWidth = 420, boxHeight = 90;
  let boxX = dlg.speaker === "demon" ? demonX - 100 : width/2;
  let boxY = dlg.speaker === "demon" ? demonY - 130 : height - 100;
  fill(20,20,20,230); stroke(255); strokeWeight(2);
  rectMode(CENTER); rect(boxX, boxY, boxWidth, boxHeight, 8);
  noStroke(); fill(255); textSize(16);
  textAlign(CENTER,CENTER);
  text(dlg.text, boxX, boxY, boxWidth - 20, boxHeight - 10);
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) { row = 1; xdir = -5; facingRight = false; }
  if (keyCode == RIGHT_ARROW) { row = 2; xdir = 5; facingRight = true; }
  if (key === 'm' || key === 'M') { if(bgMusic.isPlaying()) bgMusic.pause(); else bgMusic.loop(); }
  if (scene == 10 && (key === 'f' || key === 'F')) {
    showDialogue = true; dialogueIndex++;
    if (dialogueIndex >= dialogues.length) { dialogueIndex = 0; showDialogue = false; }
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) { xdir = 0; count = 0; }
}
