// let savedImage // save snapshot
let colors = []  //save colors

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("sketch-container");
  colors.push(color(255, 54, 43))
  colors.push(color(41, 65, 242))
  colors.push(color(242, 194, 34))
  cursor(HAND);
}

function mousePressed() {
  // Update colors
  let curr0 = colors[0]
  colors[0] = colors[1]
  colors[1] = colors[2]
  colors[2] = curr0
}

function draw() {
  background(255);
  noFill();
  stroke(0);
  strokeWeight(8);
  line(mouseX, 0, mouseX, 400);
  line(0, mouseY, 400, mouseY);
  //red
  fill(colors[0]);
  rect(0,0,mouseX,mouseY);
  //blue
  fill(colors[1]);
  rect(mouseX,mouseY,width-mouseX,height-mouseY);
  //yellow
  fill(colors[2]);
  rect(0,height-mouseY,mouseX,mouseY);
  
  //red eye & nose
  let redMiddleX = mouseX/2
  let redMiddleY = (height-mouseY)/2

    if(mouseY >= height/2) {
    //ellipse(redMiddleX, redMiddleY,10); 
    line(redMiddleX-30, redMiddleY-35, redMiddleX-30, redMiddleY-40);
    line(redMiddleX+30, redMiddleY-35, redMiddleX+30, redMiddleY-40);
    push();
    noFill();
    //ellipse(redMiddleX,redMiddleY+20, 20, 10)
    //arc(redMiddleX, redMiddleY+40, 45, 30, PI, 0);
    line(redMiddleX-10, redMiddleY+30, redMiddleX+10, redMiddleY+30);
    strokeWeight(random(5,10));
    arc(redMiddleX, redMiddleY-15, 15, 15, 0, PI)
    pop();

  } else {
    //ellipse(redMiddleX, mouseY/2,10);
    line(redMiddleX-30, mouseY/2-35, redMiddleX-30, mouseY/2-40);
    line(redMiddleX+30, mouseY/2-35, redMiddleX+30, mouseY/2-40);
    line(redMiddleX-10, mouseY/2+30, redMiddleX+10, mouseY/2+30)
    push();
    noFill();
    //ellipse(redMiddleX,mouseY/2+20, 20, 10)
    strokeWeight(random(5,10));
    arc(redMiddleX, mouseY/2-15, 15, 15, 0, PI)
    pop();
  }
  
  //yellow eye
  let yellowMiddleX = mouseX/2
  let yellowMiddleY = height-(mouseY/2)
  ellipse(yellowMiddleX-20, yellowMiddleY,10);
  ellipse(yellowMiddleX+20, yellowMiddleY,10);
  
  //yellow mouth
  noFill();
  arc(yellowMiddleX, yellowMiddleY+30, 80, 80, 0, PI-QUARTER_PI);
  
  //white eye
  let whiteMiddleX = mouseX+(width-mouseX)/2
  let whiteMiddleY = mouseY/2
  ellipse(whiteMiddleX-30, whiteMiddleY-30,10);
  ellipse(whiteMiddleX+30, whiteMiddleY-30,10);
  
  //white mouth
  push();
  rectMode(CENTER)
  //rect(whiteMiddleX, whiteMiddleY+20,70,20);
  rect(whiteMiddleX, whiteMiddleY+40, 40, 20, 10)
  pop();
  
  //white nose
  line(whiteMiddleX,mouseY/2, whiteMiddleX,mouseY/4)
  arc(whiteMiddleX, whiteMiddleY, 30, 30, 0, HALF_PI)
  
  //blue eye
  let blueMiddleX = mouseX+(width-mouseX)/2
  let blueMiddleY = (mouseY/2)+width/2
  arc(blueMiddleX-30, blueMiddleY-30, 20, 20, PI+QUARTER_PI, TWO_PI- QUARTER_PI/2)
  arc(blueMiddleX+30, blueMiddleY-30, 20, 20, PI+QUARTER_PI/2, TWO_PI-QUARTER_PI)
  ellipse(blueMiddleX-30, blueMiddleY-10,10);
  ellipse(blueMiddleX+30, blueMiddleY-10,10);
  
  //blue nose
   line(blueMiddleX+5, blueMiddleY+5, blueMiddleX+40+mouseX%15, blueMiddleY+15-mouseX%12)
  
  //blue mouth
  arc(blueMiddleX, blueMiddleY+80, 60, 60, PI+QUARTER_PI, TWO_PI- QUARTER_PI/2)

}