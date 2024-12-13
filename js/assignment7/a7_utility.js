class Building {
    constructor(size, boxHeight, depth, x, y, z, col = [169, 219, 156]) {
        this.size = size;
        this.boxHeight = boxHeight;
        this.depth = depth;
        this.x = x;
        this.y = y;
        this.z = z;
        this.col = col;
    }

    display() {
        push();
        translate(this.x, this.y, this.z);
        fill(this.col);
        translate(this.size / 2, -this.boxHeight / 2, -this.depth / 2);
        box(this.size, this.boxHeight, this.depth);
        pop();
    }
}

class Cylinder {
    constructor(x, y, z, rotationZ = 0, col = [250, 0, 0]) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = 40;
        this.height = 40;
        this.rotationZ = rotationZ;
        this.col = col;
        this.targetY = y;
    }

    display() {
        push();
        specularMaterial(this.col);
        translate(this.x, this.y, this.z);
        rotateZ(this.rotationZ);
        cylinder(this.radius, this.height);
        pop();
    }

    elevate(newHeight) {
        // setup target pos
        this.targetY = newHeight;
    }

    update() {
        // use lerp to move cylinder to target pos
        let isCylinders1 = this == cylinders[1]
        if (isCylinders1) {
            if (this.targetY != this.y) {
                isElevatorLock = true;
                this.y = abs(this.y - this.targetY) < 0.3 ? this.targetY : lerp(this.y, this.targetY, 0.03);
                ball.posY = this.y - 30;
            } else {
                isElevatorLock = false
            }
        }
    }
}

class Dot {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    display() {
        push();
        translate(this.x, this.y, this.z);
        noStroke();
        fill(155, 195, 250);
        sphere(5);
        pop();
    }

    isCollected(ballX, ballY, ballZ) {
        let d = dist(this.x, this.y, this.z, ballX, ballY, ballZ);
        return d < 10; // Collision threshold
    }
}
function rotateToTargetPosition(newX, newY, newZ) {
    // setup targetPos and reset transitionProgress
    targetCameraPos = { x: newX, y: newY, z: newZ };
    transitionProgress = 0;
}

function handleCameraTransition() {
    // if there's targetPos, then handle cam transition
    if (targetCameraPos) {
        transitionProgress += 0.03; // transition speed

        currentCameraPos.x = lerp(currentCameraPos.x, targetCameraPos.x, transitionProgress);
        currentCameraPos.y = lerp(currentCameraPos.y, targetCameraPos.y, transitionProgress);
        currentCameraPos.z = lerp(currentCameraPos.z, targetCameraPos.z, transitionProgress);

        camera(currentCameraPos.x, currentCameraPos.y, currentCameraPos.z, 50, 0, -100, 0, 1, 0);

        if (transitionProgress > 1) {
            targetCameraPos = null;
        }
    }
}

function setupLight() {
    ambientLight(255);
    pointLight(0, 0, 255, -100, 0, 0);
    pointLight(255, 0, 0, 100, 0, 0);
    pointLight(0, 255, 0, 0, 0, 100);
    stroke(31, 105, 209);
    fill(169, 219, 156);
    rotateY(330);
}

function checkElevator() {
    if (ball.posX == 70 && ball.posY == 50 && ball.posZ == -200) {
        let targetHeight = -50;
        cylinders[1].elevate(targetHeight);
    }
}

function resetStage() {
    noLoop();
    resetAllSetting();
    switch (stageCount) {
        case 1:
            setup_StageOne();
            break;
        case 2:
            setup_StageTwo();
            break;
        case 3:
            setup_StageThree();
            break;
    }
    loop();
}
function resetAllSetting() {
    buildings = [];
    cylinders = [];

    isCam1 = true;
    isCam2 = false;
    isCam3 = false;
    isCam4 = false;
    isCam5 = false;

    lastCamState = "";
    isElevatorLock = false;
    transitionCounter = 0;

    initCameraPos = { x: 800, y: -100, z: 0 };
    currentCameraPos = { x: 800, y: -100, z: 0 };
}

function setupButton() {
    btnGroup = createDiv();
    btnGroup.style("display", "flex");
    btnGroup.style("justify-content", "center");
    btnGroup.style("align-items", "center");
    btnGroup.style("gap", "20px");
    btnGroup.style("position", "absolute");
    btnGroup.style("bottom", "10px");
    btnGroup.style("left", "50%");
    btnGroup.style("transform", "translateX(-50%)");

    btn1 = createButton('Level 1');
    btn1.parent(btnGroup); // 設置按鈕的位置（相對於整個窗口）
    btn1.style("background-color", "black");
    btn1.style("color", "white");
    btn1.style("border-radius", "15px");
    btn1.style("padding", "2px 10px");
    btn1.style("font-family", "DotGothic16");
    btn1.mousePressed(() => {
        stageCount = 1;
        resetStage();
    });

    btn2 = createButton('Level 2');
    btn2.parent(btnGroup);
    btn2.style("background-color", "black");
    btn2.style("color", "white");
    btn2.style("border-radius", "15px");
    btn2.style("padding", "2px 10px");
    btn2.style("font-family", "DotGothic16");
    btn2.mousePressed(() => {
        stageCount = 2;
        resetStage();
    });

    btn3 = createButton('Level 3');
    btn3.parent(btnGroup);
    btn3.style("background-color", "black");
    btn3.style("color", "white");
    btn3.style("border-radius", "15px");
    btn3.style("padding", "2px 10px");
    btn3.style("font-family", "DotGothic16");
    btn3.mousePressed(() => {
        stageCount = 3;
        resetStage();
    });
}

function stageFinish() {
    resetAllSetting();
    switch (stageCount) {
        case 1:
            alert("Stage 1 Completed ！");
            stageCount += 1;
            break;
        case 2:
            alert("Stage 2 Completed ！");
            stageCount += 1;
            break;
        case 3:
            alert("All Stage Completed！ \n Game Reset!");
            stageCount = 1;
            break;
    }
    resetStage();
}