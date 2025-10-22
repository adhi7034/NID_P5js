// Global Variables
let gball;
let paddle1; // Player 1 (Left)
let paddle2; // Player 2 (Right)
let player1 = 0; 
let player2 = 0;

let pingSound;
let bgMusic;

function preload(){
    // Ensure your asset paths are correct if uncommenting the sound lines
    // pingSound = loadSound("assets/2.mp3");
    // bgMusic = loadSound("assets/1.mp3");
}

function setup() {
    createCanvas(800, 400);
    noStroke(); 
    
    gball = new ball(width / 2, height / 2, 5, 5);

    let pWidth = 10, pHeight = 80;
    
    // Instantiate Paddle 1 (Left) with W (87) and S (83) keys
    paddle1 = new Paddle(0, height / 2 - pHeight / 2, pWidth, pHeight, 5, 87, 83);
    
    // Instantiate Paddle 2 (Right) with UP_ARROW and DOWN_ARROW keys
    paddle2 = new Paddle(width - pWidth, height / 2 - pHeight / 2, pWidth, pHeight, 5, UP_ARROW, DOWN_ARROW);
}

function draw() {
    // 👻 Ghostly background trail effect
    background(0, 0, 0, 30); 
    
    // Draw center line
    stroke(255);
    line(width / 2, 0, width / 2, height);
    noStroke();

    // 1. Handle Input
    paddle1.handleInput();
    paddle2.handleInput();

    // 2. Ball Logic
    gball.move();
    gball.checkCollisionWall();
    gball.checkCollisionPaddle(paddle1);
    gball.checkCollisionPaddle(paddle2);
    gball.show();

    // 3. Scoring
    let point = gball.checkWinner();
    if(point !== 0) {
        if (point === 1) {
            player1++;
        } else if (point === 2) {
            player2++;
        }
        gball.reset();
    }

    // 4. Paddle Drawing
    paddle1.show();
    paddle2.show();
    
    // 5. Display Score
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(player1, width/4, 50);
    text(player2, width * 3/4, 50);
}