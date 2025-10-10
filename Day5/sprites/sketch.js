let sprite = [];
let srows = 4;
let scols = 8;
let spriteImg;
function preload() {
  spriteImg = loadImage("images/explosionFull.png")
}
function setup() {
  createCanvas(2048, 1024);
  let sWidth = spriteImg.width / scols;
  let sHeight = spriteImg.height / srows;

  for (let i = 0; i < srows; i++) {
    for (let j = 0; j < scols; j++) {
      sprite[sprite.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight)
    }
    console.log(sprite)
  }

}

function draw() {
  background(220);
  let k=frameCount;
  if(mouseIsPressed){
    image(sprite[k%32],mouseX,mouseY)
  }
}
