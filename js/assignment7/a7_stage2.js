
function setup_StageTwo() {
  ball = new Ball_Stage_Two();
  build_StageTwo();
  buildCylinder_StageTwo();
  camera(currentCameraPos.x, currentCameraPos.y, currentCameraPos.z, -100, -100, -100, 0, 1, 0);

}
function build_StageTwo() {
  buildings.push(new Building(40, 200, 40, -150, 100, 0));
  buildings.push(new Building(40, 40, 150, -150, -60, -40));
  buildings.push(new Building(200, 40, 40, -110, 100, 0));
  buildings.push(new Building(40, 40, 150, 50, 100, -40));
}

function buildCylinder_StageTwo() {
  cylinders.push(new Cylinder(-130, -80, -200, 90));
  cylinders.push(new Cylinder(70, 80, -200));
}


class Ball_Stage_Two {
  constructor() {
      this.initialPosX = 70;
      this.initialPosZ = -200;
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
      if (isCam1 || isCam3) {
          if (keyIsDown(LEFT_ARROW)) this.posZ += stepLength;
          if (keyIsDown(RIGHT_ARROW)) this.posZ -= stepLength;

          if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
              if (isCam1) {
                  lastCamState = "CamC";
              } else if (isCam3) {
                  lastCamState = "CamZ";
              }
          }
      } else if (isCam2) {

          if (this.posX == -94 && this.posY == 50) {
              console.log("1")
              if (keyIsDown(LEFT_ARROW)) { this.posX -= stepLength; };
              if (keyIsDown(RIGHT_ARROW)) this.posX += stepLength;
              if (keyIsDown(UP_ARROW)) this.posY -= stepLength;
              if (keyIsDown(DOWN_ARROW)) this.posY += stepLength;
              if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
                  lastCamState = "CamX";
              }
          } else if (this.posX <= -94) {
              console.log("2")
              if (keyIsDown(UP_ARROW)) this.posY -= stepLength;
              if (keyIsDown(DOWN_ARROW)) this.posY += stepLength;
              if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
                  lastCamState = "CamX";
              }
          } else {
              console.log("3")
              if (keyIsDown(LEFT_ARROW)) { this.posX -= stepLength; };
              if (keyIsDown(RIGHT_ARROW)) this.posX += stepLength;
              if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)) {
                  lastCamState = "CamX";
              }
          }

      }

  }

  pos() {
    if (isCam1) {
        this.posZ = constrain(this.posZ, -215, -20);
    } else if (isCam2) {
        this.posZ = -20;
        this.posX = constrain(this.posX, -94, 70);
        this.posY = constrain(this.posY, -80, 50);
    } else if (isCam3) {
        this.posY = constrain(this.posY, -80, 50);
        this.posZ = constrain(this.posZ, -200, -20);
    }

    if (this.posX == -94 && this.posY == -80 && this.posZ == -200) {
        stageFinish();
    }

    if (this.posX == 70 && this.posY == 50 && this.posZ == -20) {
        if ((isCam1 && lastCamState != "CamX")) {  // 只有狀態不同才切換
            isCam1 = !isCam1;
            isCam2 = !isCam2;
        } else if (isCam2 && lastCamState != "CamC") {
            isCam1 = !isCam1;
            isCam2 = !isCam2;
        }
    }

    if (this.posX == -94 && this.posY == -80 && this.posZ == -20) {
        if ((isCam2 && lastCamState != "CamZ")) {  // 只有狀態不同才切換
            isCam2 = !isCam2;
            isCam3 = !isCam3;
        } else if (isCam3 && lastCamState != "CamX") {
            isCam2 = !isCam2;
            isCam3 = !isCam3;

        }

    }
    if (isCam1) {
        rotateToTargetPosition(initCameraPos.x, initCameraPos.y, initCameraPos.z)
    } else if (isCam2) {
        rotateToTargetPosition(0, -100, 600);
    } else if (isCam3) {

        rotateToTargetPosition(800, -100, -100);
    }
  }
}