// script.js

// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 400;

// Game variables
const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;
let playerScore = 0, aiScore = 0;

// Draw paddle
function drawPaddle(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, ballSize, ballSize);
}

// Draw scores
function drawScores() {
  ctx.font = "20px Arial";
  ctx.fillText(`Player: ${playerScore}`, 20, 20);
  ctx.fillText(`AI: ${aiScore}`, canvas.width - 100, 20);
}

// Clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move AI paddle
function moveAI() {
  if (aiY + paddleHeight / 2 < ballY) {
    aiY += 3;
  } else {
    aiY -= 3;
  }
}

// Game loop
function gameLoop() {
  clearCanvas();

  // Draw paddles and ball
  drawPaddle(10, playerY);
  drawPaddle(canvas.width - 20, aiY);
  drawBall(ballX, ballY);
  drawScores();

  // Ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY *= -1;
  }

  // Ball collision with player paddle
  if (
    ballX <= 20 &&
    ballY >= playerY &&
    ballY <= playerY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Ball collision with AI paddle
  if (
    ballX + ballSize >= canvas.width - 20 &&
    ballY >= aiY &&
    ballY <= aiY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Scoring
  if (ballX <= 0) {
    aiScore++;
    resetBall();
  }
  if (ballX + ballSize >= canvas.width) {
    playerScore++;
    resetBall();
  }

  moveAI();
  requestAnimationFrame(gameLoop);
}

// Reset ball position
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
}

// Player paddle movement
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && playerY > 0) {
    playerY -= 20;
  } else if (e.key === "ArrowDown" && playerY < canvas.height - paddleHeight) {
    playerY += 20;
  }
});

// Start game loop
gameLoop();
