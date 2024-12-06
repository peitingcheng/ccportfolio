let patternX = 0;
let moveDirection = 1;
let spinDirection = 1;
let illusionFill = 'red'

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("sketch-container");
  noStroke();
  cursor(HAND);
}

function draw() {
  background(220);
  //orbitControl();
  
  pattern = createGraphics(width*2, height);
  for (let i = 0; i <= width*2; i += 40){
    pattern.noStroke();
    pattern.fill(illusionFill);
    pattern.rect(i,0,20,height);
    pattern.fill('255');
    pattern.rect(i+20,0,20,height);
  }
  
  patternLocation = -width+patternX;
  image(pattern,patternLocation,-height/2);
  
  if (patternLocation <= -3*width/2){
    moveDirection = -1;
  } else if (patternLocation >= -width/2) {
    moveDirection = 1;
  }
  
  if (moveDirection === 1){
    patternX -= 2;
  } else {
    patternX += 2;
  }
  
  push();
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/4);
  pop();

  push();
  translate(mouseX/2,-height/3);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/8);
  pop();
  
  push();
  translate(-mouseX/2,height/3);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/8);
  pop();
  
  push();
  translate(mouseX/2,height/3);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/8);
  pop();
  
  push();
  translate(-mouseX/2,-height/3);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/8);
  pop();
  
  push();
  translate(mouseX/4,-height/4);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/16);
  pop();
  
  push();
  translate(-mouseX/4,height/4);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/16);
  pop();
  
  push();
  translate(mouseX/4,height/4);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/16);
  pop();
  
  push();
  translate(-mouseX/4,-height/4);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/16);
  pop();
  
  push();
  translate(mouseX/1.5,0);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/16);
  pop();
  
  push();
  translate(-mouseX/1.5,0);
  texture(pattern);
  rotateY(spinDirection * frameCount * 0.01);
  sphere(width/16);
  pop();
}

function mousePressed() {
  spinDirection = -spinDirection;
  if (illusionFill === 'blue'){
    illusionFill = random(['red','green']);
  } else if (illusionFill === 'red'){
    illusionFill = random(['blue', 'green']);
  } else {
    illusionFill = random(['blue', 'red']);
  }
}