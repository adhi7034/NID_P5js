let player, demon, bridge, sceneChange, dialogue;
let raindrops = [];
let bgMusic;


let playerImg, demonImg, bridgeImg;
let bgImages = [];

function preload() {

  bgMusic = loadSound("audio/adventure.mp3");

 
  let bgPaths = [
    "Images/limbo.jpeg",
    "Images/lust.jpeg",
    "Images/gluttony.jpeg",
    "Images/greed.jpeg",
    "Images/wrath.jpeg",
    "Images/heresy.jpeg",
    "Images/violence.jpeg",
    "Images/fraud.jpeg",
    "Images/treachery.jpeg"
  ];
  for (let p of bgPaths) bgImages.push(loadImage(p));


  playerImg = loadImage("character/Swordsman_lvl2_Walk_with_shadow.png");
  demonImg = loadImage("devil/IDLE.png");
  bridgeImg = loadImage("Bridge.png");


  dialogue = new Dialogue([
    { speaker: "demon", text: "You have come far, mortal." },
    { speaker: "player", text: "I will not turn back!" },
    { speaker: "demon", text: "Foolish bravery... you know nothing." },
    { speaker: "player", text: "I know enough to stop you!" },
    { speaker: "demon", text: "Then let us see if you can." },
    { speaker: "player", text: "I am ready. Come at me!" }
  ]);


  for (let i = 0; i < 300; i++) raindrops.push(new Rain());
}

function setup() {
  createCanvas(800, 400);
  imageMode(CENTER);
  angleMode(DEGREES);


  player = new Player(playerImg, 6, 4);
  player.setup();

  demon = new Demon(demonImg, 4);
  demon.setup();

  bridge = new Bridge(bridgeImg);

  sceneChange = new SceneChange(bgImages);

  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.5);
  }
}

function draw() {
  sceneChange.showScene();
  bridge.draw(player.pathY);

  player.update(sceneChange);
  player.show();

  if (sceneChange.currentScene == 10) {
    demon.show(player.pathY);
    dialogue.show(player, demon);
  }

  for (let drop of raindrops) {
    drop.update();
    drop.show();
  }

  sceneChange.updateText();
}


function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.row = 1;
    player.xdir = -5;
    player.facingRight = false;
  } else if (keyCode == RIGHT_ARROW) {
    player.row = 2;
    player.xdir = 5;
    player.facingRight = true;
  }

  if (key === 'm' || key === 'M') {
    if (bgMusic.isPlaying()) bgMusic.pause();
    else bgMusic.loop();
  }

  if (sceneChange.currentScene == 10 && (key === 'f' || key === 'F')) {
    dialogue.next();
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
    player.xdir = 0;
    player.count = 0;
  }
}
