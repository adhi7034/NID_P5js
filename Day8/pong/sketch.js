let gball;
let paddle1;
let paddle2;
let player1 =0; 
let player2 =0;

let pingSound;

function preload(){
  pingSound = loadSound("assets/2.mp3")
  bgMusic= loadSound("assets/1.mp3")
}
function setup() {
  createCanvas(800, 400)
  gball = new ball(width / 2, height / 2, 5, 5)

  let pWidth = 10, pHeight = 40;
  paddle1 = new Paddle(0, height / 2 - pHeight / 2, pWidth, pHeight, 5);
  paddle2 = new Paddle(width - pWidth, height / 2 - pHeight / 2, pWidth, pHeight, 5);

}

function draw() {
  background(220);

  //BALL BEHAVIOUR

  gball.move();
  gball.checkCollisionPaddle(paddle1);
  gball.checkCollisionPaddle(paddle2);
  gball.checkCollisionWall();
  gball.show();

  let point = gball.checkWinner();
  if(point == 1) {
    player1++;
    gball.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  } else if(point ==2 ) {
    player2++;
    gball.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  }



  paddle1.show();
  paddle2.show();

  if (keyIsDown(UP_ARROW)) {
    paddle1.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    paddle1.moveDown();
  }
  if (keyIsDown(87)) {
    paddle2.moveUp();
  } else if (keyIsDown(83)) {
    paddle2.moveDown();
  }

}
