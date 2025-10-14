let myCar;
let newCar;
let cars=[];
let noCars=20;

function setup() {
  createCanvas(400, 400);
  // myCar= new Car(200,200,50,5);
  // newCar= new Car(350,350,60,25);

  for (let i=0; i<noCars; i++){
    let tempCar= new Car(random(0,width),random(0,height),50,20);
    cars.push(tempCar);
  }
}

function draw() {
  background(220);
  for (i=0;i<cars.length;i++){
  cars[i].move();
  cars[i].show();}
  // myCar.show();
  // newCar.show();
  // myCar.move();
  // newCar.move();
  
}
