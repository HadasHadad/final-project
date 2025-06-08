const canvas = document.getElementById("myCanvas"); 
const ctx = canvas.getContext("2d");

const headSize = 40;
const bodyWidth = 100;
const bodyHeight = 100;
const speed = 75;

// Player positions
let p1x = 50, p1y = 400;
let p2x = 750, p2y = 400;

// Bullets
let bulletSize = 20;
let p1BulletHeight = 10;       // separate bullet heights
const p2BulletHeight = 10;
const bulletSpeed = 20;
let p1BulletX = null, p1BulletY = null;
let p2BulletX = null, p2BulletY = null;

// Health
let p1Health = 100, p2Health = 100;

// Game status
let gameOver = false;
let winner = "";

// Player 1 Power Shot
let lastHUsed = 0;
let powerShotActive = false;
const powerCooldown = 5000; // ms

// Player 2 Rapid Fire
let lastKUsed = 0;
let rapidFireActive = false;
const fastCooldown = 8000;
const fastMultiplier = 3;
let rapidFireStart = 0;
const rapidFireDuration = 1500; // 3 seconds

document.addEventListener("keydown", move);

function move(event) {
  if (gameOver) return;

  switch (event.key.toLowerCase()) {
    // Player 1 Movement
    case "w": p1y = Math.max(0, p1y - speed); break;
    case "s": p1y = Math.min(canvas.height - bodyHeight, p1y + speed); break;
    case "a": p1x = Math.max(0, p1x - speed); break;
    case "d": p1x = Math.min(canvas.width - bodyWidth, p1x + speed); break;

    // Player 1 Normal Shot
    case "g":
      if (p1BulletX === null) {
        p1BulletHeight = 10;
        p1BulletX = p1x + bodyWidth;
        p1BulletY = p1y + bodyHeight / 2 - p1BulletHeight / 2;
        powerShotActive = false;
      }
      break;

    // Player 1 Power Shot (H)
    case "h":
      if (Date.now() - lastHUsed >= powerCooldown && p1BulletX === null) {
        p1BulletHeight = 50;
        p1BulletX = p1x + bodyWidth;
        p1BulletY = p1y + bodyHeight / 2 - p1BulletHeight / 2;
        powerShotActive = true;
        lastHUsed = Date.now();
      }
      break;

    // Player 2 Movement
    case "arrowup": p2y = Math.max(0, p2y - speed); break;
    case "arrowdown": p2y = Math.min(canvas.height - bodyHeight, p2y + speed); break;
    case "arrowleft": p2x = Math.max(0, p2x - speed); break;
    case "arrowright": p2x = Math.min(canvas.width - bodyWidth, p2x + speed); break;

    // Player 2 Normal or Rapid Shot (L)
    case "l":
      const inRapidMode = rapidFireActive && (Date.now() - rapidFireStart < rapidFireDuration);
      const canShoot = p2BulletX === null || inRapidMode;

      if (canShoot) {
        if (p2BulletX === null) {
          p2BulletX = p2x - bulletSize;
          p2BulletY = p2y + bodyHeight / 2 - p2BulletHeight / 2;
        }
      }
      break;

    // Player 2 Activate Rapid Fire Mode (K)
    case "k":
      if (Date.now() - lastKUsed >= fastCooldown) {
        rapidFireActive = true;
        rapidFireStart = Date.now();
        lastKUsed = Date.now();
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
    ctx.fillRect(p1BulletX, p1BulletY, bulletSize, p1BulletHeight);
  }

  if (p2BulletX !== null) {
    ctx.fillStyle = "blue";
    ctx.fillRect(p2BulletX, p2BulletY, bulletSize, p2BulletHeight);
  }

  // Cooldown text display
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";

  // Player 1 power shot timer
  const hCooldownLeft = Math.max(0, powerCooldown - (Date.now() - lastHUsed));
  if (hCooldownLeft > 0) {
    ctx.fillText(`P1 Power Cooldown: ${Math.ceil(hCooldownLeft / 1000)}s`, 10, 30);
  }

  // Player 2 rapid fire timer or cooldown
  const now = Date.now();
  const timeSinceRapidFireStart = now - rapidFireStart;
  if (rapidFireActive && timeSinceRapidFireStart < rapidFireDuration) {
    ctx.fillText(`P2 Rapid Fire: ${Math.ceil((rapidFireDuration - timeSinceRapidFireStart) / 1000)}s`, canvas.width - 200, 30);
  } else {
    const kCooldownLeft = Math.max(0, fastCooldown - (now - lastKUsed));
    if (kCooldownLeft > 0) {
      ctx.fillText(`P2 Cooldown: ${Math.ceil(kCooldownLeft / 1000)}s`, canvas.width - 200, 30);
    }
  }

  // Update health bars
  document.getElementById("p1Health").style.width = `${p1Health * 5}px`;
  document.getElementById("p2Health").style.width = `${p2Health * 5}px`;
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
      const dmg = powerShotActive ? 30 : 10;
      p2Health = Math.max(0, p2Health - dmg);
      p1BulletX = null;
      powerShotActive = false;

      if (p2Health === 0 && !gameOver) {
        gameOver = true;
        winner = "Player 1";
      }
    } else if (p1BulletX > canvas.width) {
      p1BulletX = null;
    }
  }

  if (p2BulletX !== null) {
    const now = Date.now();
    const isRapidFireOn = rapidFireActive && (now - rapidFireStart < rapidFireDuration);
    const speed = isRapidFireOn ? bulletSpeed * fastMultiplier : bulletSpeed;

    p2BulletX -= speed;

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

  // Turn off rapid fire if duration expired
  if (rapidFireActive && (Date.now() - rapidFireStart >= rapidFireDuration)) {
    rapidFireActive = false;
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
    showWinner();
  }
}

gameLoop();
