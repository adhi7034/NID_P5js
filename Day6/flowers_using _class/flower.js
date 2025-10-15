class Flower {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.baseSize = random(20, 60);
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.selected = false;
    this.scaleSpeed = random(0, 5);
    this.scaleAngle = random(360);
  }

  drawFlower() {
    push();
    translate(this.x, this.y);
    scale(this.size / 50);

    if (this.selected) {
      fill(random(0, 255), random(0, 255), random(0, 255));
    } else {
      fill("white");
    }


    ellipse(0, 0, 20, 50);
    ellipse(0, 0, 50, 20);
    ellipse(0, 0, 20);
    pop();
  }

  moveFlower() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;


    if (this.y > height || this.y < 0) {
      this.ySpeed = -this.ySpeed * 1.0001;
    }
    if (this.x > width || this.x < 0) {
      this.xSpeed = -this.xSpeed * 1.001;
    }


    this.scaleAngle += this.scaleSpeed;
    this.size = this.baseSize + cos(this.scaleAngle) * 10;
  }

  changeColor(mX, mY) {
    let distance = dist(mX, mY, this.x, this.y);
    if (distance < this.baseSize / 2) {
      this.selected = true;
    }
  }
}
