function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent("sketch-container");
  }
  
  function draw() {
    // background(255, 196, 153);
    angleMode(DEGREES);
    //background
    stroke(0);
    noFill();
    fill(255, 218, 191);
    rect(0,260,400,140);
    fill(250, 240, 217);
    rect(0,120,400,120);
    fill(255, 218, 191);
    rect(0,40,400,60);
    fill(250, 240, 217);
    rect(0,0,400,20);
    
    //body
    noStroke();
    fill(0);
    ellipse(200,380,230,260);
    fill(255);
    ellipse(200,380,150,260);
    //hands
    stroke(0);
    ellipse(130,400,80,60);
    ellipse(270,400,80,60);
    line(113,393,113,400);
    line(128,393,128,400);
    line(143,393,143,400);
    line(253,393,253,400);
    line(268,393,268,400);
    line(283,393,283,400);
    
    //face
    noStroke();
    fill(0);
    ellipse(200,200,200,180);
    //ears
    push();
    translate(50, 0);
    rotate(20);
    ellipse(120,180,80,150);
    translate(50, 100);
    rotate(310)
    ellipse(160,200,80,150);
    pop();
    
    //whitebenz
    fill(255);
    arc(200,200,200,180,45,135);
    
    //eyes
    fill(46, 48, 64);
    ellipse(150,180,20);
    ellipse(245,180,20);
    fill(7, 15, 66);
    ellipse(150,180,15);
    ellipse(245,180,15);  
    fill(255);
    ellipse(155,175,3);
    ellipse(250,175,3);
    
    //正在讓眼睛動....還沒成功...
    let leftX = 155;
    let leftY = 175;
    
    
    
    //noseandmouth
    noFill();
    stroke(0);
    strokeWeight(2);
    line(193,235,200,240);
    line(200,240,207,235);
    line(200,240,200,250);
    line(193,257,200,250);
    line(200,250,207,257);
      
    //decoration
    noStroke();
    fill(40, 153, 64);
    rotate(10);
    rect(50,80,8,30);
    rect(350,40,8,30);
    rotate(320);
    rect(-160,320,8,30);
    rect(200,380,8,30);
    rect(200,150,8,30);
    rotate(130);
    rect(30,-170,8,30);
    rect(280,-110,8,30);
    rect(300,-450,8,30);
    
  }
  
  