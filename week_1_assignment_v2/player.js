class Player {
  constructor(img, x, y, spriteX, spriteY) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.spriteX = spriteX;
    this.spriteY = spriteY;
    this.count = 0;
    this.row = 0;
    this.xdir = 0;
    this.facingRight = true;
    this.sprites = [];

    this.prepareSprites();
  }

  prepareSprites() {
    let w = this.img.width / this.spriteX;
    let h = this.img.height / this.spriteY;
    for (let i = 0; i < this.spriteY; i++) {
      this.sprites[i] = [];
      for (let j = 0; j < this.spriteX; j++) {
        this.sprites[i][j] = this.img.get(j * w, i * h, w, h);
      }
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    if (!this.facingRight) scale(-1, 1);
    if (this.sprites[this.row] && this.sprites[this.row][this.count])
      image(this.sprites[this.row][this.count], 0, 30, 120, 120);
    pop();
  }

  update() {
    this.x += this.xdir;
    this.x = constrain(this.x, 0, width);
    if (this.xdir != 0 && frameCount % 5 == 0)
      this.count = (this.count + 1) % this.spriteX;
    else if (this.xdir == 0) this.count = 0;
  }

  moveLeft() {
    this.row = 1;
    this.xdir = -5;
    this.facingRight = false;
  }

  moveRight() {
    this.row = 2;
    this.xdir = 5;
    this.facingRight = true;
  }

  stop() {
    this.xdir = 0;
    this.count = 0;
  }

  checkSceneChange(sceneManager) {
    if (this.x > width - 20 && sceneManager.scene < 10) {
      sceneManager.nextScene();
      this.x = 50;
    }
    if (this.x < 20 && sceneManager.scene > 1) {
      sceneManager.prevScene();
      this.x = width - 50;
    }
  }
}
