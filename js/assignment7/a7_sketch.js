let ball;
let buildings = [];
let cylinders = [];

let isCam1 = true;
let isCam2 = false;
let isCam3 = false;
let isCam4 = false;
let isCam5 = false;

let lastCamState = "";
let isElevatorLock = false;
let transitionCounter = 0;

// cam pos
let initCameraPos = { x: 800, y: -100, z: 0 };
let currentCameraPos = { x: 800, y: -100, z: 0 };
// target pos, after transition will turn back to 0
let targetCameraPos = null;
// 過渡進度
let transitionProgress = 0;

let stageCount = 1;

function setup() {
  canvas = createCanvas(600, 600, WEBGL);
  canvas.parent("sketch-container");
  angleMode(DEGREES);
  let div = createDiv("Peggy's<br>Autobiographical<br>Game");
  div.style("font-family", "DotGothic16");
  div.style("font-size", "32px");
  div.position(38, 64);

  // let ins = createDiv("press arrow keys to move");
  // ins.style("display", "flex");
  // ins.style("align-items", "center");
  // ins.style("font-family", "DotGothic16");
  // ins.style("font-size", "16px");
  // ins.style("background-color", "rgba(255, 255, 255, 0)");  // 半透明白色背景
  // ins.style("padding", "5px");  // 加入內邊距
  setupButton();
  setup_StageOne();
}

function draw() {
  // setup lights
  background(101, 137, 171);
  setupLight();
  //debug
  orbitControl();

  for (let building of buildings) {
    building.display();
  }
  for (let cylinder of cylinders) {
    cylinder.update();
    cylinder.display();
  }
  // only for stage 3
  if (stageCount == 3)
    checkElevator();

  ball.body();
  if (!isElevatorLock) {
    ball.move();
    ball.pos();
  }

  handleCameraTransition();

  console.log(ball.posX, ball.posY, ball.posZ);
}




