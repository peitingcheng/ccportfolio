let angle = 0;
let rotationSpeed = 1;
let hue1 = 200;
let hue2 = 100;

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("sketch-container");
  angleMode(DEGREES);
  noStroke();
  colorMode(HSB);
  frameRate(60);
}

function draw() {
  background(10);
  translate(width / 2, height / 2);

  let sec = second(); 
  
  if (sec < 30) {
    // Slow to fast
    rotationSpeed = map(sec, 0, 30, 1, 5); 
  } else {
    // Fast to slow
    rotationSpeed = map(sec, 30, 59, 5, 1); 
  }
  
  angle = angle + rotationSpeed;
  
  //Color change
  let color1 = color(hue1,75,75);
  let color2 = color(hue2,75,75);
  
  hue1 = map(rotationSpeed,1,5,0,5) * 360/5;
  hue2 = map(rotationSpeed,1,5,5,0) * 360/5;
  
  //circle1
  push();
  rotate(angle);
  conicGradient(0, width * 0, height * 0, [color1, color2]);
  ellipse(width * 0, height * 0, 400);
  pop();

  //circle2
  push();
  rotate(angle);
  conicGradient(90, width * 0, height * 0, [color1, color2]);
  ellipse(width * 0, height * 0, 300);
  pop();

  //circle3
  push();
  rotate(angle);
  conicGradient(180, width * 0, height * 0, [color1, color2]);
  ellipse(width * 0, height * 0, 200);
  pop();

  //midcircle
  push();
  fill(10);
  ellipse(width * 0, height * 0, 100);
  pop();
  
  //text
  push();
  sec = second();
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Lifetime", 0 ,10);
  
  //sec
  fill(68, 61, 255);
  rect(-300, -300, width/60*sec, 20);
  
  pop();
}

//I found the following code on a youtube tutorial on conic gradeint.
https://www.youtube.com/watch?v=-MUOweQ6wac by Kazuki Umeda posted 2 years ago.

function conicGradient(sA, sX, sY, colors) {
  let gradient = drawingContext.createConicGradient(sA, sX, sY);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);

  drawingContext.fillStyle = gradient;
}
