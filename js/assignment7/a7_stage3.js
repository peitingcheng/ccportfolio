
function setup_StageThree() {
    ball = new Ball_Stage_Three();
    build_StageThree();
    buildCylinder_StageThree();
    camera(currentCameraPos.x, currentCameraPos.y, currentCameraPos.z, -100, -100, -100, 0, 1, 0);

}
function build_StageThree() {
    buildings.push(new Building(40, 40, 250, 200, 100, -40));
    buildings.push(new Building(190, 40, 40, 50, 100, 0));
    buildings.push(new Building(40, 40, 150, 50, 100, -40));
    buildings.push(new Building(40, 40, 140, 50, -30, -40));
    buildings.push(new Building(40, 110, 40, 50, -30, 0));
    buildings.push(new Building(200, 40, 40, -150, -100, 0));
    buildings.push(new Building(40, 40, 150, -150, -100, -40));
}

function buildCylinder_StageThree() {
    // Initialize Cylinder objects
    cylinders.push(new Cylinder(-120, -120, -200, 90));
    cylinders.push(new Cylinder(70, 80, -200));
    cylinders.push(new Cylinder(220, 80, -320));
}

function checkElevator() {
    if (ball.posX == 70 && ball.posY == 50 && ball.posZ == -200) {
        let targetHeight = -50;
        cylinders[1].elevate(targetHeight);
    }
}

class Ball_Stage_Three {
    constructor() {
      this.initialPosX = 220;
      this.initialPosZ = -320;
      this.posX = this.initialPosX;
      this.posY = 50;
      this.posZ = this.initialPosZ;
    }
  
    body() {
      translate(this.posX, this.posY, this.posZ);
      noStroke();
      push();
      fill(color(250, 121, 77));
      ellipsoid(10, 10, 10);
      pop();
    }
  
    move() {
      //keyIsDown 檢查任何特定按鍵被按下
      //keycode.info
  
      let stepLength = 3;
      if (isCam1) {
        if (keyIsDown(LEFT_ARROW)) {
          this.posZ += stepLength;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          this.posZ -= stepLength;
        }
        if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
          lastCamState = "Cam1";
        }
      } else if (isCam2) {
  
        if (keyIsDown(LEFT_ARROW)) {
          if (this.posX > 70) {
            lastCamState = "Cam2";
            this.posX -= stepLength;
          }
        }
        if (keyIsDown(RIGHT_ARROW)) {
          lastCamState = "Cam2";
          this.posX += stepLength;
        }
  
      } else if (isCam3) {
        if (keyIsDown(LEFT_ARROW) && lastCamState != "Cam2") {
          this.posZ += stepLength;
          lastCamState = "Cam3";
        }
  
        if (keyIsDown(RIGHT_ARROW)) {
          this.posZ -= stepLength;
          lastCamState = "Cam3";
        }
      } else if (isCam4) {
        // 70 -120 50
        if (this.posX == 70 && this.posY == -120) {
          //交界
          console.log("isCam4中")
          if (keyIsDown(UP_ARROW)) {
            this.posY -= stepLength;
          }
          if (keyIsDown(DOWN_ARROW)) {
            this.posY += stepLength;
          }
          if (keyIsDown(LEFT_ARROW)) {
            this.posX += stepLength;
          }
          if (keyIsDown(RIGHT_ARROW)) {
            this.posX -= stepLength;
          }
          if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
            lastCamState = "Cam4";
          }
        } else if (this.posX < 70) {
          console.log("isCam4左右")
          if (keyIsDown(LEFT_ARROW)) {
            this.posX += stepLength;
          }
          if (keyIsDown(RIGHT_ARROW)) {
            this.posX -= stepLength;
          }
          if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
            lastCamState = "Cam4";
          }
        } else {
          console.log("isCam4上下")
          if (keyIsDown(UP_ARROW)) {
            this.posY -= stepLength;
          }
          if (keyIsDown(DOWN_ARROW)) {
            this.posY += stepLength;
          }
          if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
            lastCamState = "Cam4";
          }
        }
      } else if (isCam5) {
        if (keyIsDown(LEFT_ARROW)) {
          this.posZ += stepLength;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          this.posZ -= stepLength;
        }
        if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
          lastCamState = "Cam5";
        }
      }
    }
  
  
    pos() {
      if (isCam1) {
        this.posZ = constrain(this.posZ, -330, -20);
      }
      if (isCam2) {
        this.posZ = -20;
        this.posX = constrain(this.posX, 70, 220);
        this.posY = constrain(this.posY, -80, 50);
      }
  
      if (isCam3) {
        if (this.posY == -80) {
          // console.log("樓上")
          this.posZ = constrain(this.posZ, -200, -50);
        } else {
          // console.log("樓下")
          this.posZ = constrain(this.posZ, -200, -20);
        }
      }
  
      if (isCam4) {
        this.posY = constrain(this.posY, -120, -80);
        this.posX = constrain(this.posX, -100, 70);
      }
  
      if (isCam5) {
        this.posY = -120;
        this.posZ = constrain(this.posZ, -190, -50);
      }
  
      if (this.posX == -100 && this.posY == -120 && this.posZ == -190) {
        stageFinish();
    }

      if (this.posX == 220 && this.posY == 50 && this.posZ == -20) {
        if ((isCam1 && lastCamState != "Cam2")) { // only if cam state different then change cam pos
          isCam1 = !isCam1;
          isCam2 = !isCam2;
        } else if (isCam2 && lastCamState != "Cam1") {
          isCam1 = !isCam1;
          isCam2 = !isCam2;
        }
      }
  
      if (this.posX == 70 && this.posY == 50 && this.posZ == -20) {
        if ((isCam2 && lastCamState != "Cam3")) { // only if cam state different then change cam pos
          isCam2 = !isCam2;
          isCam3 = !isCam3;
        } else if (isCam3 && lastCamState != "Cam2") {
          isCam2 = !isCam2;
          isCam3 = !isCam3;
        }
      }
  
      if (this.posX == 70 && this.posY == -80 && this.posZ == -50) {
        if ((isCam3 && lastCamState != "Cam4")) {
          isCam3 = !isCam3;
          isCam4 = !isCam4;
        } else if (isCam4 && lastCamState != "Cam3") {
          isCam3 = !isCam3;
          isCam4 = !isCam4;
        }
      }
  
      if (this.posX == 70 && this.posY == -80 && this.posZ == -50) {
        if ((isCam3 && lastCamState != "Cam4")) {
          isCam3 = !isCam3;
          isCam4 = !isCam4;
        } else if (isCam4 && lastCamState != "Cam3") {
          isCam3 = !isCam3;
          isCam4 = !isCam4;
        }
      }
  
      if (this.posX == -100 && this.posY == -120 && this.posZ == -50) {
        if ((isCam4 && lastCamState != "Cam5")) {
          isCam4 = !isCam4;
          isCam5 = !isCam5;
        } else if (isCam5 && lastCamState != "Cam4") {
          isCam4 = !isCam4;
          isCam5 = !isCam5;
        }
      }
  
  
      // change cam pos
      if (isCam1) {
        rotateToTargetPosition(initCameraPos.x, initCameraPos.y, initCameraPos.z);
      } else if (isCam2) {
        rotateToTargetPosition(-130, -250, 850);
      } else if (isCam3) {
        rotateToTargetPosition(800, -100, 0);
      } else if (isCam4) {
        rotateToTargetPosition(450, -350, -650);
      } else if (isCam5) {
        rotateToTargetPosition(800, -100, 0);
      }
  
    }
  }