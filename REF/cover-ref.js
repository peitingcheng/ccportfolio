let boxes;
let isHovered = false;
let isMenuVisible = false;

// 添加新的變量來控制動畫
let currentWidthRatio = 1;
let targetWidthRatio = 1;
let isAnimating = false;

function setup() {
    // 創建全屏畫布
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1');
    boxes = new Box(100, 100, 100, 0, 0, 0);
    // 初始隱藏網格
    //document.querySelector('.split-container').style.display = 'none';
}

function draw() {
    background(0);
    camera(0, -150, 800);
    boxes.display(); 
    orbitControl();
    cursor(boxes.hovered ? HAND : ARROW);
}

function windowResized() {
    // 當視窗大小改變時，重新設置畫布大小
    resizeCanvas(windowWidth, windowHeight);
}

class Box {
    constructor(size, boxHeight, depth, x, y, z) {
        this.size = size;
        this.boxHeight = boxHeight;
        this.depth = depth;
        this.x = x;
        this.y = y;
        this.z = z;
        this.hovered = false;
    }

    display() {
        push();
        translate(this.x, this.y, this.z);
        rotateY(frameCount * 0.01);
        stroke(this.hovered ? 0 : 255);
        fill(this.hovered ? 255 : 0);
        box(this.size, this.boxHeight, this.depth);
        pop();
    }

    checkHover(mx, my) {
        // 簡單的滑鼠位置檢測
        let d = dist(mx - width/2, my - height/2, this.x, this.y);
        this.hovered = d < this.size;
        return this.hovered;
    }
}

function mouseMoved() {
    boxes.checkHover(mouseX, mouseY);
}

function animate() {
    if (isAnimating) {
        // 使用 lerp (線性插值) 實現平滑過渡
        currentWidthRatio = lerp(currentWidthRatio, targetWidthRatio, 0.1);
        
        // 調整畫布大小
        resizeCanvas(windowWidth * currentWidthRatio, windowHeight);
        
        // 當接近目標值時停止動畫
        if (Math.abs(currentWidthRatio - targetWidthRatio) < 0.001) {
            currentWidthRatio = targetWidthRatio;
            isAnimating = false;
        } else {
            requestAnimationFrame(animate);
        }
    }
}

function mouseClicked() {
    if (boxes.hovered) {
        isMenuVisible = !isMenuVisible;
        const splitContainer = document.querySelector('.split-container');
        
        if (isMenuVisible) {
            splitContainer.classList.add('menu-active');
            targetWidthRatio = 1;
        } else {
            splitContainer.classList.remove('menu-active');
            targetWidthRatio = 1;
        }
        
        isAnimating = true;
        animate();
    }
}

// 新增選單項目點擊事件
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const pageNumber = this.textContent;
        const targetPage = document.getElementById(`page-${pageNumber}`);
        targetPage.scrollIntoView({ behavior: 'smooth' });
    });
});

// 添加 lerp 函數（如果 p5.js 沒有提供的話）
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}