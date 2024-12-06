
function setup_StageOne() {
  ball = new Ball_Stage_One();
  build_StageOne();
  buildCylinder_StageOne();
  camera(currentCameraPos.x, currentCameraPos.y, currentCameraPos.z, 0, 0, -100, 0, 1, 0);
}
function build_StageOne() {
  buildings.push(new Building(200, 40, 40, -110, 100, 0));
  buildings.push(new Building(40, 40, 150, 50, 100, -40));
}

function buildCylinder_StageOne() {
  // Initialize Cylinder objects
  cylinders.push(new Cylinder(-130, 80, -20));
  cylinders.push(new Cylinder(70, 80, -210));
}


class Ball_Stage_One {
  constructor() {
      this.initialPosX = 70;
      this.initialPosZ = -220;
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
              if (isCam1) {
                  lastCamState = "Cam1";
              }
          }
      } else if (isCam2) {
          if (this.posX == -94 && this.posY == 50) {
              console.log("1")
              if (keyIsDown(LEFT_ARROW)) {
                  this.posX -= stepLength;
              }
              if (keyIsDown(RIGHT_ARROW)) {
                  this.posX += stepLength;
              }
              if (keyIsDown(UP_ARROW)) {
                  this.posY -= stepLength;
              }
              if (keyIsDown(DOWN_ARROW)) {
                  this.posY += stepLength;
              }
              if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
                  lastCamState = "Cam2";
              }
          } else {
              console.log("3")
              if (keyIsDown(LEFT_ARROW)) {
                  this.posX -= stepLength;
              }
              if (keyIsDown(RIGHT_ARROW)) {
                  this.posX += stepLength;
              }
              if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)) {
                  lastCamState = "Cam2";
              }
          }
      }
  }

  pos() {
    if (isCam1) {
        this.posZ = constrain(this.posZ, -215, -20);
    } else if (isCam2) {
        this.posZ = -20;
        this.posX = constrain(this.posX, -130, 70);
        this.posY = constrain(this.posY, -80, 50);
        
    }

    if (this.posX == -130 && this.posY == 50 && this.posZ == -20) {
        stageFinish();
    }

    if (this.posX == 70 && this.posY == 50 && this.posZ == -20) {
        if ((isCam1 && lastCamState != "Cam2")) { // only if cam state different then change cam pos
            isCam1 = !isCam1;
            isCam2 = !isCam2;
        } else if (isCam2 && lastCamState != "Cam1") {
            isCam1 = !isCam1;
            isCam2 = !isCam2;
        }
    }

    if (isCam1) {
        rotateToTargetPosition(initCameraPos.x, initCameraPos.y, initCameraPos.z)
    } else if (isCam2) {
        rotateToTargetPosition(0, -100, 600);
    }
}
}