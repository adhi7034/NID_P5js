class SceneChange {
  constructor(bgImages, bridgeImg) {
    this.bgImages = bgImages;
    this.bridgeImg = bridgeImg;
    this.scene = 1;
    this.pathY = height - 100;
  }

  drawScene() {
    if (this.scene <= 9 && this.bgImages[this.scene])
      image(this.bgImages[this.scene], 0, 0, width, height);
    else background(0);

   
    let bridgeW = 100, bridgeH = 104;
    let yPos = this.pathY - 35;
    for (let i = 0; i < width; i += bridgeW - 5) {
      image(this.bridgeImg, i, yPos, bridgeW, bridgeH);
    }
  }

  nextScene() { this.scene++; }
  prevScene() { this.scene--; }
}
