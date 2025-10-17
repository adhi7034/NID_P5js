class Bridge {
  constructor(img) {
    this.img = img; // preloaded
  }

  draw(pathY) {
    let w = 100;
    let h = 104;
    let yPos = pathY - 35;
    for (let i = 0; i < width; i += w - 5) {
      image(this.img, i, yPos, w, h);
    }
  }
}
