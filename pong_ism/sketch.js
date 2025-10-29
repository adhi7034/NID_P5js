// === GLOBAL VARIABLES ===
let gball;
let extraBalls = [];
let paddle1, paddle2;
let player1 = 0;
let player2 = 0;
let gameState = "start";
let spawnTimer = 0;
let spawnInterval = 5000; // 5 seconds

function setup() {
  createCanvas(1300, 650);
  noStroke();

  gball = new Ball(width / 2, height / 2, 6, 6, true);

  let pWidth = 14, pHeight = 120;
  paddle1 = new Paddle(40, height / 2 - pHeight / 2, pWidth, pHeight, 7, 87, 83);
  paddle2 = new Paddle(width - 40 - pWidth, height / 2 - pHeight / 2, pWidth, pHeight, 7, UP_ARROW, DOWN_ARROW);
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "play") {
    playGame();
  } else if (gameState === "end") {
    drawEndScreen();
  }
}

function keyPressed() {
  if (gameState === "start" && key === " ") {
    gameState = "play";
  } else if (gameState === "end" && key === "r") {
    player1 = 0;
    player2 = 0;
    gball.reset();
    extraBalls = [];
    gameState = "start";
  }
}

// === MAIN GAME LOOP ===
function playGame() {
  setGradient(0, 0, width, height, color(15, 10, 30), color(0, 0, 0), "Y");
  fill(0, 40);
  rect(0, 0, width, height);

  // center line
  stroke(255, 100);
  strokeWeight(2);
  for (let i = 0; i < height; i += 20) {
    line(width / 2, i, width / 2, i + 10);
  }
  noStroke();

  // Paddle input
  paddle1.handleInput();
  paddle2.handleInput();

  // Ball mechanics
  gball.move();
  gball.checkCollisionWall();
  gball.checkCollisionPaddle(paddle1);
  gball.checkCollisionPaddle(paddle2);
  gball.show();

  // Spawn illusion balls every 5 seconds
  if (millis() - spawnTimer > spawnInterval) {
    spawnExtraBalls();
    spawnTimer = millis();
  }

  // Update and draw fake balls
  for (let i = extraBalls.length - 1; i >= 0; i--) {
    let b = extraBalls[i];
    b.move();
    b.checkCollisionWall();
    b.show();
    if (b.life <= 0) extraBalls.splice(i, 1);
  }

  // Scoring
  let point = gball.checkWinner();
  if (point !== 0) {
    if (point === 1) player1++;
    else player2++;
    gball.reset();
    extraBalls = [];
  }

  // Draw paddles and score
  paddle1.show();
  paddle2.show();
  drawScore();

  // End game condition
  if (player1 >= 15 || player2 >= 15) {
    gameState = "end";
  }
}

// === PADDLE CLASS ===
class Paddle {
  constructor(x, y, width, height, speed, upKey, downKey) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.upKey = upKey;
    this.downKey = downKey;
  }

  show() {
    push();
    noStroke();
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(0, 180, 255);
    fill(0, 150, 255);
    rect(this.x, this.y, this.width, this.height, 10);
    pop();
  }

  moveUp() {
    if (this.y > 0) this.y -= this.speed;
  }

  moveDown() {
    if (this.y < height - this.height) this.y += this.speed;
  }

  handleInput() {
    if (keyIsDown(this.upKey)) this.moveUp();
    else if (keyIsDown(this.downKey)) this.moveDown();
  }
}

// === BALL CLASS ===
class Ball {
  constructor(x, y, xSpeed, ySpeed, isMain = false) {
    this.x = x;
    this.y = y;
    this.baseSpeed = 6;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = 20;
    this.isGhost = false;
    this.isInvisible = false;
    this.isMain = isMain;
    this.life = 500; // for fake balls

    if (isMain) {
      this.startDisappearTimer();
      this.startGhostTimer();
    }
  }

  startDisappearTimer() {
    setInterval(() => {
      this.isInvisible = true;
      setTimeout(() => {
        this.isInvisible = false;
      }, random(500, 1500));
    }, random(2000, 5000));
  }

  startGhostTimer() {
    setInterval(() => {
      this.isGhost = true;
      setTimeout(() => {
        this.isGhost = false;
      }, 2500);
    }, random(6000, 10000));
  }

  show() {
    if (this.isInvisible && this.isMain) return;
    push();
    noStroke();
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = this.isGhost ? color(255, 0, 255) : color(255);
    fill(this.isGhost ? color(255, 0, 255, 100) : color(255));
    circle(this.x, this.y, this.size);
    pop();
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.life -= 1;
  }

  checkCollisionWall() {
    if (this.isGhost && this.isMain) {
      // Ghost passes through top/bottom walls (wraps around)
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
      return;
    }

    // Normal bouncing
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.ySpeed *= -1;
    }
  }

  checkCollisionPaddle(paddle) {
    // ✅ Ghost still hits paddles now
    if (!this.isMain) return; 

    if (
      this.x + this.size / 2 > paddle.x &&
      this.x - this.size / 2 < paddle.x + paddle.width &&
      this.y + this.size / 2 > paddle.y &&
      this.y - this.size / 2 < paddle.y + paddle.height
    ) {
      this.xSpeed *= -1;

      let hitPos = (this.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
      this.ySpeed = hitPos * this.baseSpeed;

      this.xSpeed *= 1.1;
      this.ySpeed *= 1.1;
    }
  }

  checkWinner() {
    if (!this.isMain) return 0;
    if (this.x < 0) return 2;
    if (this.x > width) return 1;
    return 0;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-1, 1]) * this.baseSpeed;
    this.ySpeed = random([-1, 1]) * this.baseSpeed;
  }
}

// === EXTRA BALL SPAWNING ===
function spawnExtraBalls() {
  for (let i = 0; i < int(random(3, 7)); i++) {
    let xb = random(width * 0.3, width * 0.7);
    let yb = random(height * 0.2, height * 0.8);
    let xs = random([-4, 4]);
    let ys = random([-4, 4]);
    extraBalls.push(new Ball(xb, yb, xs, ys, false));
  }
}

// === UI ELEMENTS ===
function drawScore() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text(`${player1}    ${player2}`, width / 2, 50);
}

function drawStartScreen() {
  setGradient(0, 0, width, height, color(15, 10, 30), color(0, 0, 0), "Y");
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(70);
  text("GHOST PONG", width / 2, height / 2 - 150);

  textSize(26);
  fill(180);
  text("PLAYER 1: W & S keys", width / 2, height / 2 - 40);
  text("PLAYER 2: ↑ & ↓ arrows", width / 2, height / 2);

  fill(255, 180, 100);
  text("First player to reach 15 points wins!", width / 2, height / 2 + 60);

  fill(180);
  text("Beware of the GHOST BALL – it passes through walls!", width / 2, height / 2 + 110);
  text("The ball might disappear or multiply as illusions (Eidoilism-inspired).", width / 2, height / 2 + 140);
  text("Only one ball is real — others are illusions.", width / 2, height / 2 + 170);

  fill(255);
  textSize(30);
  text("Press SPACE to Start", width / 2, height - 100);
}

function drawEndScreen() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(70);
  let winner = player1 > player2 ? "PLAYER 1" : "PLAYER 2";
  text(`${winner} WINS!`, width / 2, height / 2 - 40);

  textSize(30);
  fill(180);
  text("Press R to Restart", width / 2, height / 2 + 40);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  for (let i = 0; i <= h; i++) {
    let inter = map(i, 0, h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, y + i, x + w, y + i);
  }
}
