class Player {
  constructor(img, cols, rows) {
    this.img = img; // preloaded image
    this.cols = cols;
    this.rows = rows;
    this.sprites = [];
    this.count = 0;
    this.row = 0;
    this.x = 50;
    this.pathY = height - 100;
    this.y = this.pathY - 40;
    this.xdir = 0;
    this.facingRight = true;
  }

  setup() {
    let w = this.img.width / this.cols;
    let h = this.img.height / this.rows;
    for (let i = 0; i < this.rows; i++) {
      this.sprites[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.sprites[i][j] = this.img.get(j * w, i * h, w, h);
      }
    }
  }

  update(sceneChange) {
    this.x += this.xdir;
    if (this.xdir != 0 && frameCount % 5 == 0) {
      this.count = (this.count + 1) % this.cols;
    } else if (this.xdir == 0) {
      this.count = 0;
    }
    this.x = constrain(this.x, 0, width);

    // Scene change
    if (this.x > width - 20 && sceneChange.currentScene < 10) {
      sceneChange.currentScene++;
      this.x = 50;
    }
    if (this.x < 20 && sceneChange.currentScene > 1) {
      sceneChange.currentScene--;
      this.x = width - 50;
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    if (!this.facingRight) scale(-1, 1);
    imageMode(CENTER);
    if (this.sprites.length > 0) image(this.sprites[this.row][this.count], 0, 30, 120, 120);
    pop();
  }
}
