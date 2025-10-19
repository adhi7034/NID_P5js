// Core variables
let player, sceneChange, demon, rainSystem;

let bgImages = [];
let bridgeImg, playerSheetImg, demonSheetImg;
let bgMusic;

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

let textX, scrollSpeed = 2;
let dialogueIndex = 0;
let showDialogue = false;
let showInfernoScreen = false;
let infernoTimer = 0;

function preload() {
  // Load backgrounds
  let bgNames = ["limbo","lust","gluttony","greed","wrath","heresy","violence","fraud","treachery"];
  for (let i = 0; i < bgNames.length; i++) {
    bgImages[i+1] = loadImage(`Images/${bgNames[i]}.jpeg`);
  }

  bridgeImg = loadImage("Bridge.png");
  playerSheetImg = loadImage("character/Swordsman_lvl2_Walk_with_shadow.png");
  demonSheetImg = loadImage("devil/IDLE.png");
  bgMusic = loadSound("audio/adventure.mp3");
}

function setup() {
  createCanvas(800, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  // Initialize classes
  player = new Player(playerSheetImg, 50, height - 140, 6, 4);
  sceneChange = new SceneChange(bgImages, bridgeImg);
  demon = new Demon(demonSheetImg, width - 100, height - 140);
  rainSystem = new RainSystem(300);

  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.5);
  }

  textX = width / 2;
}

function draw() {
  if (showInfernoScreen) {
    background(0);
    fill(255, 255, 0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Welcome to Inferno", width / 2, height / 2);
    infernoTimer++;
    if (infernoTimer > 200) showInfernoScreen = false;
    return;
  }

  // Draw scene
  imageMode(CORNER);
  sceneChange.drawScene();

  // Rain
  rainSystem.update();
  rainSystem.show();

  // Player
  imageMode(CENTER);
  player.update();
  player.checkSceneChange(sceneChange);
  player.draw();

  // Scene-specific
  if (sceneChange.scene <= 9) drawRollingText();
  if (sceneChange.scene == 10) {
    demon.draw();
    if (showDialogue) drawDialogue();
    fill(255, 255, 0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Press F to Talk", width - 100, height - 140 - 20);
  }

  if (sceneChange.scene == 1) drawTitleText();
}

function drawRollingText() {
  fill(255, 230);
  textSize(20);
  textAlign(CENTER, CENTER);
  let msg = sceneTexts[sceneChange.scene - 1];
  let msgWidth = textWidth(msg);
  text(msg, textX, height / 2);
  textX -= scrollSpeed;
  if (textX < -msgWidth / 2) textX = width + msgWidth / 2;
}

function drawDialogue() {
  let dlg = dialogues[dialogueIndex];
  if (!dlg) return;
  let demonX = width - 100, demonY = height - 140;
  let boxWidth = 420, boxHeight = 90;
  let boxX = dlg.speaker === "demon" ? demonX - 100 : width / 2;
  let boxY = dlg.speaker === "demon" ? demonY - 130 : height - 100;
  fill(20, 20, 20, 230);
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(boxX, boxY, boxWidth, boxHeight, 8);
  noStroke();
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(dlg.text, boxX, boxY, boxWidth - 20, boxHeight - 10);
}

function drawTitleText() {
  fill(255, 255, 0);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text("To Go Right Press right arrow ->", 50, 100);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("DANTE'S INFERNO", width / 2, 150);
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) player.moveLeft();
  if (keyCode == RIGHT_ARROW) player.moveRight();
  if (key === 'm' || key === 'M') {
    if (bgMusic.isPlaying()) bgMusic.pause();
    else bgMusic.loop();
  }
  if (sceneChange.scene == 10 && (key === 'f' || key === 'F')) {
    showDialogue = true;
    dialogueIndex++;
    if (dialogueIndex >= dialogues.length) {
      dialogueIndex = 0;
      showDialogue = false;
      showInfernoScreen = true;
      infernoTimer = 0;
    }
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) player.stop();
}
