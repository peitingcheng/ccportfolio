let balls = [];
let posX, posY;

function setup() {
    canvas = createCanvas(400, 600);
    canvas.parent("sketch-container");
    angleMode(DEGREES);
    for (let i = 0; i < 20; i++){
    balls.push(new Ball())
    }
  }
  
  function draw() {
    background(220);
    strokeWeight(1);
    line(0,height/3,width,height/3);
    line(0,height/3*2,width,height/3*2);
    drawDress(186,141,123,160)
    drawDress(236,207,117,180);
    drawDress(107,119,142,190);
    
    push();
    translate(width, 0); //let topright be the 0,0
    scale(-1, 1); 
    drawDress(186,141,123,160);
    drawDress(236,207,117,180);
    drawDress(107,119,142,190);
    pop();

    drawBody();
    drawFace();

    for(let i = 0 ; i < 20; i++){
        balls[i].display();
        balls[i].move();
        //balls[i].checkCollision()
      }
  }

  function drawDress(r,g,b,verX){
    noStroke();
    fill(r,g,b);
    beginShape();
    //topleft
    vertex(verX, 350); 
    //leftcurve
    bezierVertex(verX-5, 540, verX-10, 550, verX-35, 600);//anchor1,anchor2,bottom
    //bottomline
    vertex(width/2, 600);
    //topright
    vertex(width/2, 350); 
    endShape(CLOSE);
  }

  function drawBody() {
    fill(0);
    rectMode(CENTER);
    rect(200,300,200);
    fill(220);
    
    push();
    
    translate(115, 50);
    triangle(260, 350, 140, 350, 200, 225);
    pop();

    push();
    translate(-115, 50);
    triangle(260, 350, 140, 350, 200, 225);
    pop();

    push();
    translate(-115, 0);
    triangle(140, 200, 260, 200, 200, 350);
    pop();

    push();
    translate(115, 0);
    triangle(140, 200, 260, 200, 200, 350);
    pop();
  }

  function drawFace() {
    fill(120, 35, 32);
    ellipseMode(CENTER);
    ellipse(200, 135, 200, 120);
    rect(200, 190, 45, 20);

    push();
    fill(255);
    arc(155, 140, 50, 35, 190, 350);
    arc(245, 140, 50, 35, 190, 350);
    arc(155, 130, 50, 35, 10, 170);
    arc(245, 130, 50, 35, 10, 170);
    pop();

    push();
    fill(0);
    ellipse(155, 135, 18, 28);
    ellipse(245, 135, 18, 28);
    pop();
  }

  class Ball {
    constructor() {
        this.x = random(140, 260);
        this.y = random(200, 350);
        this.diam = 19;
        this.direction = 1;
        this.speedX = random(-0.5, 0.5);
        this.speedY = random(-0.5, 0.5);
    }

    display(){
        noStroke();
        fill(255);
        circle(this.x, this.y, this.diam);
      }
      
    move(){
    // moving the circle with the speed and direction we set below
        this.x += this.speedX * this.direction;
        this.y += this.speedY * this.direction;
        
        // change direction if circle hits the top/bottom canvas
        if(this.y >= 400-this.diam/2 ||
          this.y <= 200+this.diam/2){
          this.direction *= -1;
        }
        
        // change direction if circle hits the right/left canvas
        if(
          this.x <= 140+this.diam/2 ||
          this.x >= 265-this.diam/2){ 
          this.direction *= -1;
        }
      }

    // checkCollision() {
    //     for(let i = 0; i < balls.length; i++){
    //       let distCircle = dist(this.x, this.y, balls[i].x, balls[i].y);
          
    //       //check if the dist btwn two circles < 直徑, then change the moving direction
    //       if (distCircle > 0 && distCircle < this.diam){
    //         this.direction *= -1;
    //       }
    //     }
    // }
  }
