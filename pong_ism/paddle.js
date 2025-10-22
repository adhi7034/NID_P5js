class Paddle {
    constructor(x, y, width, height, speed, upKey, downKey) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.upKey = upKey;
        this.downKey = downKey;
    }

    show() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= this.speed;
        }
    }

    moveDown() {
        if (this.y < height - this.height) {
            this.y += this.speed;
        }
    }
    
    // Encapsulated input handling
    handleInput() {
        if (keyIsDown(this.upKey)) {
            this.moveUp();
        } else if (keyIsDown(this.downKey)) {
            this.moveDown();
        }
    }
}