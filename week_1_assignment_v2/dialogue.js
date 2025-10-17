class Dialogue {
  constructor(dialogues) {
    this.dialogues = dialogues;
    this.index = 0;
    this.showing = false;
  }

  show(player, demon) {
    if (!this.showing) return;
    let dlg = this.dialogues[this.index];
    if (!dlg) return;

    fill(0, 180);
    stroke(255);
    strokeWeight(2);
    rectMode(CENTER);

    
    let boxX, boxY;
    if (dlg.speaker === "demon") {
      boxX = width - 150; 
      boxY = player.pathY - 180;
    } else {
      boxX = player.x;    
      boxY = player.pathY - 120;
    }

    let boxWidth = 400;
    let boxHeight = 80;
    rect(boxX, boxY, boxWidth, boxHeight, 10);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(dlg.text, boxX, boxY);
  }

  next() {
    this.showing = true;
    this.index++;
    if (this.index >= this.dialogues.length) {
      this.index = 0;
      this.showing = false;
    }
  }
}
