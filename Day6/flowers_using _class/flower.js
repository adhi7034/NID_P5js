class Flower {
  constructor(noPetal, x, y) {
    this.noPetal = noPetal;
    this.x = x;
    this.y = y;
    this.rotation = random(360);
    this.speed = random(1, 3);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  update() {
    
    this.y += this.speed;

    if (this.y > height + 20) {
      this.y = -20;
      this.x = random(width);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    

    for (let i = 0; i < this.noPetal; i++) {
      fill(this.r, this.g, this.b, 150);
      ellipse(20, 0, 200, 25);
      rotate(360 / this.noPetal);
    }

    fill(255);
    ellipse(0, 0, 50);
    pop();
  }
}
