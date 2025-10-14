function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,0,0,5);
 let noiseValue = (noise(0.01*frameCount+1000));
 let noiseMapped=map(noiseValue,0,1,10,200);
 ellipse(width/2,height/2,noiseMapped)
}
