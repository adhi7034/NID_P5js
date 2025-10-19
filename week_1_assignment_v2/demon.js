class Demon {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.frames = [];

    let w = this.img.width / 4;
    for (let i = 0; i < 4; i++) {
      this.frames.push(this.img.get(i * w, 0, w, this.img.height));
    }
  }

  draw() {
    let f = this.frames[floor(frameCount / 8) % 4];
    image(f, this.x, this.y, 150, 150);
  }
}
