let color1,color2;

function setup() {
  createCanvas(600, 600);
  color1 = color("#20BDFF");
  color2 = color("#A5FECB");
  
  for(let y=0; y<height; y++){                         //
    n = map(y,0,height,0,1);
    let newcolor = lerpColor(color1,color2,n);         //
    stroke(newcolor);
    line(0,y,width, y);
  }
}
let a,b,c,d,e,f,g;
function draw() {
  a=color(255, 105, 180, 100);
  b=color(255, 200, 120, 100);
  c=color(255, 230, 150, 100);
  d=color(150, 200, 255, 100);
  e=color(220, 160, 255, 100);
  f=color(138,255,156,100);
  g=color(234,86,69,100);
  
  stroke(255,250,231,100)
  fill(e)
  ellipse(300,25,10,10)
  fill(f)
  ellipse(285,40,15,15)
  fill(a)
  ellipse(310,30,10,10)
  fill(b)
  ellipse(290,55,15,15)
  fill(c)
  ellipse(300,50,15,15)
  fill(d)
  ellipse(300,100,25,25)
  fill(e)
  ellipse(285,100,25,25)
  fill(f)
  ellipse(300,300,55,55)
  fill(g)
  ellipse(325,90,25,25)
  fill(a)
  ellipse(300,150,30,30)
  ellipse(500,550,30,30)
  fill(b)
  ellipse(325,250,60,60)
  fill(c)
  ellipse(200,350,50,50)
  fill(d)
  ellipse(280,170,30,30)
   fill(e)
  ellipse(350,450,60,60)
  fill(f)
  ellipse(250,250,60,60)
  fill(g)
  ellipse(300,200,50,50)
  fill(a)
  ellipse(100,400,75,75)
  fill(b)
  ellipse(400,400,75,75)
  fill(c)
  ellipse(400,300,75,75)
  fill(d)
  ellipse(350,350,75,75)
  fill(e)
  ellipse(250,350,75,75)
  fill(e)
  ellipse(500,450,100,100)
  fill(f)
  ellipse(200,400,100,100)
  fill(g)
  ellipse(500,400,100,100)
  fill(a)
  ellipse(275,400,100,100)
  fill(b)
  ellipse(550,550,100,100)
  fill(c)
  ellipse(300,550,125,125)
  fill(d)
  ellipse(200,500,125,125)
  fill(e)
  ellipse(455,500,125,125)
  fill(f)
  ellipse(385,525,125,125)
  fill(g)
  ellipse(100,525,125,125)
  fill(a)
  ellipse(50,550,110,110)
  fill(d)
  ellipse(450,550,100,100)
}