
const canvas = document.getElementById("myCanvas"); 
const ctx = canvas.getContext("2d");

let gameswon1 = 0;
let gameswon2 = 0;
let gameslost1 = 0;
let gameslost2 = 0;

const headSize = 40;
let p1BodyWidth = 100, p1BodyHeight = 100;
let p2BodyWidth = 100, p2BodyHeight = 100;
const speed = 75;

let p1x = 50, p1y = 200;
let p2x = 750, p2y = 200;

let bulletSize = 20;
let p1BulletHeight = 10;
const p2BulletHeight = 10;
const bulletSpeed = 20;
let p1BulletX = null, p1BulletY = null;
let p2BulletX = null, p2BulletY = null;

let p1Health = 100, p2Health = 100;
let p1MaxHealth = 100, p2MaxHealth = 100; // Store max health for percentage calculation

let gameOver = false;
let winner = "";

let lastHUsed = 0;
let powerShotActive = false;
let powerCooldown = 5000;

let lastKUsed = 0;
let rapidFireActive = false;
let fastCooldown = 8000;
const fastMultiplier = 3;
let rapidFireStart = 0;
const rapidFireDuration = 1500;

function updateGameStats(winnerIndex, loserIndex) {
  let profileInfo = JSON.parse(localStorage.getItem("CurrentlyloggedIn") || "[]");
 
  if (winnerIndex===1) profileInfo.gameWon++;
  if (loserIndex===1) profileInfo.gameLost++;
 
  localStorage.setItem("CurrentlyloggedIn", JSON.stringify(profileInfo));
}

const currentPlayer = JSON.parse(localStorage.getItem("CurrentlyloggedIn"));

if (currentPlayer && currentPlayer.reputation !== undefined) {
  const rep = currentPlayer.reputation;

  if (rep >= 9) {
    p2Health = 100;
    powerCooldown = 5000;
    fastCooldown = 5000;
    p2BodyHeight = 100;
    p2BodyWidth = 100;
  } else if (rep >= 8) {
    p2Health = 90;
    powerCooldown = 6000;
    fastCooldown = 6000;
    p2BodyHeight = 110;
    p2BodyWidth = 110;
  } else if (rep >= 6) {
    p2Health = 80;
    powerCooldown = 7000;
    fastCooldown = 7000;
    p2BodyHeight = 125;
    p2BodyWidth = 125;
  } else if (rep >= 4) {
    p2Health = 60;
    powerCooldown = 8000;
    fastCooldown = 8000;
    p2BodyHeight = 150;
    p2BodyWidth = 150;
  } else if (rep >= 2) {
    p2Health = 40;
    powerCooldown = 9000;
    fastCooldown = 9000;
    p2BodyHeight = 175;
    p2BodyWidth = 175;
  } else {
    p2Health = 20;
    powerCooldown = 10000;
    fastCooldown = 10000;
    p2BodyHeight = 200;
    p2BodyWidth = 200;
  }
}




document.addEventListener("keydown", move);

function move(event) {
  if (gameOver) return;

  switch (event.key.toLowerCase()) {
    case "w": p1y = Math.max(0, p1y - speed); break;
    case "s": p1y = Math.min(canvas.height - p1BodyHeight, p1y + speed); break;
    case "a": p1x = Math.max(0, p1x - speed); break;
    case "d": p1x = Math.min(canvas.width - p1BodyWidth, p1x + speed); break;

    case "g":
      if (p1BulletX === null) {
        p1BulletHeight = 10;
        p1BulletX = p1x + p1BodyWidth;
        p1BulletY = p1y + p1BodyHeight / 2 - p1BulletHeight / 2;
        powerShotActive = false;
      }
      break;

    case "h":
      if (Date.now() - lastHUsed >= powerCooldown && p1BulletX === null) {
        p1BulletHeight = 50;
        p1BulletX = p1x + p1BodyWidth;
        p1BulletY = p1y + p1BodyHeight / 2 - p1BulletHeight / 2;
        powerShotActive = true;
        lastHUsed = Date.now();
      }
      break;

    case "arrowup": p2y = Math.max(0, p2y - speed); break;
    case "arrowdown": p2y = Math.min(canvas.height - p2BodyHeight, p2y + speed); break;
    case "arrowleft": p2x = Math.max(0, p2x - speed); break;
    case "arrowright": p2x = Math.min(canvas.width - p2BodyWidth, p2x + speed); break;

    case "l":
      const inRapidMode = rapidFireActive && (Date.now() - rapidFireStart < rapidFireDuration);
      const canShoot = p2BulletX === null || inRapidMode;

      if (canShoot) {
        if (p2BulletX === null) {
          p2BulletX = p2x - bulletSize;
          p2BulletY = p2y + p2BodyHeight / 2 - p2BulletHeight / 2;
        }
      }
      break;

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

  const p1HeadX = p1x + (p1BodyWidth / 2) - (headSize / 2);
  const p1HeadY = p1y - headSize;

  const p2HeadX = p2x + (p2BodyWidth / 2) - (headSize / 2);
  const p2HeadY = p2y - headSize;

  ctx.fillStyle = "black";
  ctx.fillRect(p1x, p1y, p1BodyWidth, p1BodyHeight);
  ctx.fillStyle = "green";
  ctx.fillRect(p1HeadX, p1HeadY, headSize, headSize);

  ctx.fillStyle = "black";
  ctx.fillRect(p2x, p2y, p2BodyWidth, p2BodyHeight);
  ctx.fillStyle = "blue";
  ctx.fillRect(p2HeadX, p2HeadY, headSize, headSize);

  if (p1BulletX !== null) {
    ctx.fillStyle = "green";
    ctx.fillRect(p1BulletX, p1BulletY, bulletSize, p1BulletHeight);
  }

  if (p2BulletX !== null) {
    ctx.fillStyle = "blue";
    ctx.fillRect(p2BulletX, p2BulletY, bulletSize, p2BulletHeight);
  }

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";

  const hCooldownLeft = Math.max(0, powerCooldown - (Date.now() - lastHUsed));
  if (hCooldownLeft > 0) {
    ctx.fillText(`P1 Power Cooldown: ${Math.ceil(hCooldownLeft / 1000)}s`, 10, 30);
  }

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

  // Update health bars and add percentage text
  updateHealthBars();
}

function updateHealthBars() {
  // Update health bar widths
  const p1HealthBar = document.getElementById("p1Health");
  const p2HealthBar = document.getElementById("p2Health");
  
  if (p1HealthBar) {
    p1HealthBar.style.width = `${p1Health * 5}px`;
    // Calculate and display percentage
    const p1Percentage = Math.round((p1Health / p1MaxHealth) * 100);
    p1HealthBar.textContent = `${p1Percentage}%`;
  }
  
  if (p2HealthBar) {
    p2HealthBar.style.width = `${p2Health * 5}px`;
    // Calculate and display percentage
    const p2Percentage = Math.round((p2Health / p2MaxHealth) * 100);
    p2HealthBar.textContent = `${p2Percentage}%`;
  }
}

function updateBullets() {
  if (p1BulletX !== null) {
    p1BulletX += bulletSpeed;

    if (
      p1BulletX + bulletSize >= p2x &&
      p1BulletX <= p2x + p2BodyWidth &&
      p1BulletY >= p2y &&
      p1BulletY <= p2y + p2BodyHeight
    ) {
      const dmg = powerShotActive ? 30 : 10;
      p2Health = Math.max(0, p2Health - dmg);
      p1BulletX = null;
      powerShotActive = false;

      if (p2Health === 0 && !gameOver) {
        gameOver = true;
        winner = "Player 1";
        updateGameStats(0, 1);
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
      p2BulletX <= p1x + p1BodyWidth &&
      p2BulletX + bulletSize >= p1x &&
      p2BulletY >= p1y &&
      p2BulletY <= p1y + p1BodyHeight
    ) {
      p1Health = Math.max(0, p1Health - 10);
      p2BulletX = null;

      if (p1Health === 0 && !gameOver) {
        gameOver = true;
        winner = "Player 2";
        updateGameStats(1, 0);
      }
    } else if (p2BulletX + bulletSize < 0) {
      p2BulletX = null;
    }
  }

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
  ctx.fillText((winner == "Player 2")? "you won!" : "you lose :(", canvas.width / 2, canvas.height / 2);
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

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleMovesBtn');
  const movesBox = document.getElementById('movesBox');

  toggleBtn.addEventListener('click', () => {
    const isHidden = movesBox.style.display === 'none';
    movesBox.style.display = isHidden ? 'block' : 'none';
    toggleBtn.textContent = isHidden ? 'Hide Moves' : 'Show Moves';
  });
});