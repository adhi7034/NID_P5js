class SceneChange {
  constructor(bgImages) {
    this.bgImages = bgImages; // preloaded images
    this.currentScene = 1;

    this.sceneTexts = [
      "The First Circle: Limbo — where the virtuous pagans dwell in longing.",
      "The Second Circle: Lust — the souls swept forever in a violent storm.",
      "The Third Circle: Gluttony — the cold and filthy rain falls eternally.",
      "The Fourth Circle: Greed — the avaricious push heavy weights endlessly.",
      "The Fifth Circle: Wrath — the wrathful fight upon the surface of the river.",
      "The Sixth Circle: Heresy — the heretics burn within fiery tombs.",
      "The Seventh Circle: Violence — the blood of the violent boils and churns.",
      "The Eighth Circle: Fraud — the deceivers suffer in their falsehood.",
      "The Ninth Circle: Treachery — frozen in the lake of betrayal."
    ];

    // Store individual text positions for each scene
    this.textPositions = Array(this.sceneTexts.length).fill(width / 2);
    this.scrollSpeed = 2;
  }

  showScene() {
    imageMode(CORNER);
    if (this.currentScene <= this.bgImages.length) {
      let bg = this.bgImages[this.currentScene - 1];
      if (bg) image(bg, 0, 0, width, height);
    } else {
      background(0);
    }
  }

  updateText() {
    if (this.currentScene <= this.sceneTexts.length) {
      let idx = this.currentScene - 1;
      fill(255, 230);
      textSize(24);
      textAlign(CENTER, CENTER);

      let msg = this.sceneTexts[idx];
      let textX = this.textPositions[idx];
      let msgWidth = textWidth(msg);

      text(msg, textX, height / 2);

      // Update position
      textX -= this.scrollSpeed;
      if (textX < -msgWidth / 2) textX = width + msgWidth / 2;

      // Save updated position
      this.textPositions[idx] = textX;
    }
  }

  // Call this when scene changes
  resetTextPosition() {
    let idx = this.currentScene - 1;
    if (idx >= 0 && idx < this.textPositions.length) {
      this.textPositions[idx] = width / 2;
    }
  }
}
