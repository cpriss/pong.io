// Elements
const player = document.getElementById("player");
const aiPlayer = document.getElementById("ai-player");
const ball = document.getElementById("ball");
const gameArea = document.getElementById("game-area");
const playerScoreElem = document.getElementById("player-score");
const aiScoreElem = document.getElementById("ai-score");

let playerY = 200;
let aiY = 200;
let playerSpeed = 10;
let aiSpeed = 3;

let playerScore = 0;
let aiScore = 0;

let ballX = 390;
let ballY = 240;
let ballSpeedX = 5;
let ballSpeedY = 5;

const gameHeight = gameArea.offsetHeight;
const gameWidth = gameArea.offsetWidth;

// Event listeners for player movement
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && playerY > 0) {
    playerY -= playerSpeed;
  } else if (event.key === "ArrowDown" && playerY < gameHeight - player.offsetHeight) {
    playerY += playerSpeed;
  }
  updatePlayerPosition();
});

function updatePlayerPosition() {
  player.style.top = `${playerY}px`;
}

// AI movement
function moveAI() {
  if (ballY < aiY + aiPlayer.offsetHeight / 2) {
    aiY -= aiSpeed;
  } else if (ballY > aiY + aiPlayer.offsetHeight / 2) {
    aiY += aiSpeed;
  }

  aiY = Math.max(0, Math.min(gameHeight - aiPlayer.offsetHeight, aiY)); // Keep AI in bounds
  aiPlayer.style.top = `${aiY}px`;
}

// Ball movement and collision detection
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball bounces off top and bottom walls
  if (ballY <= 0 || ballY >= gameHeight - ball.offsetHeight) {
    ballSpeedY *= -1;
  }

  // Ball collision with player
  if (
    ballX <= player.offsetLeft + player.offsetWidth &&
    ballY + ball.offsetHeight >= playerY &&
    ballY <= playerY + player.offsetHeight
  ) {
    ballSpeedX *= -1;
  }

  // Ball collision with AI player
  if (
    ballX + ball.offsetWidth >= aiPlayer.offsetLeft &&
    ballY + ball.offsetHeight >= aiY &&
    ballY <= aiY + aiPlayer.offsetHeight
  ) {
    ballSpeedX *= -1;
  }

  // Ball out of bounds (score update)
  if (ballX <= 0) {
    aiScore++;
    updateScore();
    resetBall();
  } else if (ballX >= gameWidth - ball.offsetWidth) {
    playerScore++;
    updateScore();
    resetBall();
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

// Reset the ball position after scoring
function resetBall() {
  ballX = 390;
  ballY = 240;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 5; // Reset the Y speed to avoid weird bouncing after scoring
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

// Update the score display
function updateScore() {
  playerScoreElem.textContent = playerScore;
  aiScoreElem.textContent = aiScore;
}

// Main game loop
function gameLoop() {
  moveBall();
  moveAI();
  requestAnimationFrame(gameLoop);
}

gameLoop();
