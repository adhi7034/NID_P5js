let size = 100;
// let img1;
// let img2;
// let img3;
// let img4;
let genImages=[];
let noImages=4;

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(4);
}
function preload() {
  for (let i=0; i<noImages;i++ ){
    let name = "images2/img"+i+".png";
    genImages[i]= loadImage(name);
  }
  // img0 = loadImage('images2/patterns0.png');
  // img1 = loadImage('images2/patterns1.png');
  // img2 = loadImage('images2/patterns2.png');
  // img3 = loadImage('images2/patterns3.png');
}
function draw() {
  background(220);
  drawImg();
}
function drawImg() {

  for (let i = 0; i < width; i = i + size) {
    for (let j = 0; j < height; j = j + size) {
      let choice = floor(random(0, 4));
      image(genImages[choice],i,j);
      // if (choice == 1) {

      //   image(img1, i, j)
      // }
      // else if (choice == 2) {

      //   image(img2, i, j)
      // }
      // else if (choice == 3) {

      //   image(img3, i, j)
      // }
      // else {
      //   image(img0, i, j)
      // }



    }
  }

}
