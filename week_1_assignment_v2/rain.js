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
