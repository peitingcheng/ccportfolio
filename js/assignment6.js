let growthFactor = 0;
let myFont;

// walking data
  let monSet = [0, 181.5, 11, 45.3, 31.3, 40.6, 126.9, 212.9, 57.8, 312.2, 248.3, 300.7]   // Monday
  let tueSet = [83.4, 119.1, 10.7, 7.4, 20.5, 155.7, 197.4, 20.1, 223.3, 9, 9.2, 0]   // Tuesday
  let wedSet = [282.5, 189.7, 9.9, 5.5, 8.8, 122.9, 22.2, 45.1, 59.1, 214.9, 169.3, 9]    // Wednesday
  let thuSet = [86.1, 237.5, 18.7, 0.1, 45.7, 99.1, 89.1, 22.8, 31.1, 5.1, 41.6, 269.8]     // Thursday
  let friSet = [206.3, 72.6, 198.9, 12.5, 26, 28.9, 21.9, 20.7, 25, 231.2, 95.6, 121.8]   // Friday
  let satSet = [0, 0, 182.3, 35.5, 162.6, 133.2, 1.1, 0, 16, 39.3, 269.8, 216.9]  // Saturday
  let sunSet = [0, 14.1, 91.8, 43.7, 49.4, 13.7, 72.8, 89.7, 161.8, 36.6, 24.3, 30.8]   // Sunday

// font
function preload(){
  myFont = loadFont('assets/fonts/DotGothic16-Regular.ttf');
}

function setup() {
  canvas = createCanvas(600, 600, WEBGL);
  canvas.parent("sketch-container");
  
  textFont(myFont);  
  textSize(28);
  angleMode(DEGREES);
  cursor(MOVE);
}

function draw() {
  //rotateX(-35);  // change the default viewing angle
  //rotateY(25);
  background(220);
  orbitControl();
  fill(220);
  stroke(31, 105, 209);
  
  
  for(let i = 0; i < 12; i++){
    createBuilding(30, monSet[i] * growthFactor, -200, 200, -i*50);
    createBuilding(30, tueSet[i] * growthFactor, -130, 200, -i*50);
    createBuilding(30, wedSet[i] * growthFactor, -60, 200, -i*50);
    createBuilding(30, thuSet[i] * growthFactor, 10, 200, -i*50);
    createBuilding(30, friSet[i] * growthFactor, 80, 200, -i*50);
    createBuilding(30, satSet[i] * growthFactor, 150, 200, -i*50);
    createBuilding(30, sunSet[i] * growthFactor, 220, 200, -i*50);
  }
  
  if (growthFactor < 1) {
    growthFactor += 0.008;  // building growing speed
  }
  
  drawText();
}

function createBuilding(size, boxHeight, posX, posY, posZ) {
  
  // box(width,height,depth)
  push();
  translate(posX, posY, posZ);
  
  // change the anchor point of the box
  translate(-size/2, -boxHeight/2, -size/2);
  box(size, boxHeight, size);
  pop();
}

function drawText() {
  // push();
  fill(31, 105, 209); 
  rotateX(90);
  translate(0,0,-200);
  text('MON', -235, 60);
  text('TUE', -165, 60);
  text('WED', -95, 60);
  text('THU', -25, 60);
  text('FRI', 45, 60);
  text('SAT', 115, 60);
  text('SUN', 185, 60);
  text('10', 255, -5);
  text('11', 255, -55);
  text('12', 255, -105);
  text('13', 255, -155);
  text('14', 255, -205);
  text('15', 255, -255);
  text('16', 255, -305);
  text('17', 255, -355);
  text('18', 255, -405);
  text('19', 255, -455);
  text('20', 255, -505);
  text('21', 255, -555);
  // pop();
}


function mousePressed() {
  if (mouseButton === RIGHT) {  // check Right click
    cursor('grab'); 
  }
}

function mouseReleased() {
  if (mouseButton === RIGHT) {
    cursor(MOVE); 
  }
}