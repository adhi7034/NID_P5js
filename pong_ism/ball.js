class ball {
    constructor(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.size = 20;
        this.isGhost = false; // Tracks the ghost state
    }

    show() {
        // Ghostly visual: semi-transparent purple
        if (this.isGhost) {
            fill(255, 0, 255, 50);
        } else {
            fill(255); // Solid white
        }
        circle(this.x, this.y, this.size);
    }

    move() {
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }

    checkCollisionWall() {
        let topBound = this.size / 2;
        let bottomBound = height - this.size / 2;

        if (this.y < topBound) {
            if (this.isGhost) {
                this.y = bottomBound * random(0.5, 1); // Wrap to the bottom
            } else {
                this.ySpeed = -this.ySpeed; // Normal bounce
            }
        } else if (this.y > bottomBound) {
            if (this.isGhost) {
                this.y = topBound * random(0.5, 1); // Wrap to the top
            } else {
                this.ySpeed = -this.ySpeed; // Normal bounce
            }
        }
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.isGhost = false; // Reset ghost state
    }

    checkWinner() {
        if (this.x < 0) {
            return 2;
        } else if (this.x > width) {
            return 1;
        } else {
            return 0;
        }
    }

    checkCollisionPaddle(paddle) {

        if (this.x < paddle.x + paddle.width &&
            this.x > paddle.x &&
            this.y < paddle.y + paddle.height &&
            this.y > paddle.y) {

            this.xSpeed = -this.xSpeed;


            if (random() < 0.5) {
                this.isGhost = !this.isGhost;
                console.log("Ghost Ball Toggled: " + this.isGhost);
            }
        }
    }
}