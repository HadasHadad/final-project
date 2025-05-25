const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const headSize = 40;
const bodyWidth = 100;
const bodyHeight = 100;
const speed = 75;

// Player 1 (green)
let p1x = 50;
let p1y = 400;

// Player 2 (blue)
let p2x = 750;
let p2y = 400;

let bulletSize = 20;
let bulletHeight = 10;
let bulletSpeed = 50;

// Bullets
let p1BulletX = null;
let p1BulletY = null;
let p2BulletX = null;
let p2BulletY = null;

// Health
let p1Health = 100;
let p2Health = 100;


let gameOver = false;
let winner = "";


document.addEventListener("keydown", move);

function move(event) {
  if (gameOver) return; // Prevent any movement or shooting after game is over

  switch (event.key.toLowerCase()) {
    // player 1
    case "w":
      p1y -= speed;
      break;
    case "s":
      p1y += speed;
      break;
    case "a":
      p1x -= speed;
      break;
    case "d":
      p1x += speed;
      break;
    case "g":
      if (p1BulletX === null) {
        p1BulletX = p1x + bodyWidth;
        p1BulletY = p1y + bodyHeight / 2 - bulletHeight / 2;
      }
      break;

    // player 2
    case "arrowup":
      p2y -= speed;
      break;
    case "arrowdown":
      p2y += speed;
      break;
    case "arrowleft":
      p2x -= speed;
      break;
    case "arrowright":
      p2x += speed;
      break;
    case "l":
      if (p2BulletX === null) {
        p2BulletX = p2x - bulletSize;
        p2BulletY = p2y + bodyHeight / 2 - bulletHeight / 2;
      }
      break;
  }

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player 1
  ctx.fillStyle = "black";
  ctx.fillRect(p1x, p1y, bodyWidth, bodyHeight);
  ctx.fillStyle = "green";
  ctx.fillRect(p1x + 25, p1y - headSize, headSize, headSize);

  // Player 2
  ctx.fillStyle = "black";
  ctx.fillRect(p2x, p2y, bodyWidth, bodyHeight);
  ctx.fillStyle = "blue";
  ctx.fillRect(p2x + 25, p2y - headSize, headSize, headSize);

  // Bullets
  if (p1BulletX !== null) {
    ctx.fillStyle = "green";
    ctx.fillRect(p1BulletX, p1BulletY, bulletSize, bulletHeight);
  }
  if (p2BulletX !== null) {
    ctx.fillStyle = "blue";
    ctx.fillRect(p2BulletX, p2BulletY, bulletSize, bulletHeight);
  }

  // Update health bars in DOM
  const p1HealthBar = document.getElementById("p1Health");
  const p2HealthBar = document.getElementById("p2Health");

  p1HealthBar.style.width = `${p1Health * 5}px`; // 100 health = 500px
  p2HealthBar.style.width = `${p2Health * 5}px`;
}

function updateBullets() {
  if (p1BulletX !== null) {
    p1BulletX += bulletSpeed;

    if (
      p1BulletX + bulletSize >= p2x &&
      p1BulletX <= p2x + bodyWidth &&
      p1BulletY >= p2y &&
      p1BulletY <= p2y + bodyHeight
    ) {
      p2Health = Math.max(0, p2Health - 10);
      p1BulletX = null;

      if (p2Health === 0 && !gameOver) {
        gameOver = true;
        winner = "Player 1";
      }
    } else if (p1BulletX > canvas.width) {
      p1BulletX = null;
    }
  }

  if (p2BulletX !== null) {
    p2BulletX -= bulletSpeed;

    if (
      p2BulletX <= p1x + bodyWidth &&
      p2BulletX + bulletSize >= p1x &&
      p2BulletY >= p1y &&
      p2BulletY <= p1y + bodyHeight
    ) {
      p1Health = Math.max(0, p1Health - 10);
      p2BulletX = null;

      if (p1Health === 0 && !gameOver) {
        gameOver = true;
        winner = "Player 2";
      }
    } else if (p2BulletX + bulletSize < 0) {
      p2BulletX = null;
    }
  }
}




function showWinner() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${winner} has won!`, canvas.width / 2, canvas.height / 2);
}









function gameLoop() {
  if (!gameOver) {
    updateBullets();
    draw();
    requestAnimationFrame(gameLoop);
  } else {
    showWinner(); // display the win message
  }
}


gameLoop();
