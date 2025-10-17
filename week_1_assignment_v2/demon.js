class Demon {
  constructor(img, framesCount) {
    this.img = img; // preloaded
    this.framesCount = framesCount;
    this.frames = [];
    this.setupFrames();
  }

  setupFrames() {
    let w = this.img.width / this.framesCount;
    let h = this.img.height;
    for (let i = 0; i < this.framesCount; i++) {
      this.frames.push(this.img.get(i * w, 0, w, h));
    }
  }

  show(pathY) {
    if (this.frames.length === 0) return;
    let frame = this.frames[floor(frameCount / 8) % this.frames.length];
    imageMode(CENTER);
    image(frame, width - 150, pathY - 80, 150, 150);
  }
}
