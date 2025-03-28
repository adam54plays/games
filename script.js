const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let score = 0;
let gameRunning = true;

let playerX = window.innerWidth / 2 - 25;

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && playerX > 0) playerX -= 20;
  if (e.key === 'ArrowRight' && playerX < window.innerWidth - 50) playerX += 20;
  player.style.left = playerX + 'px';
});

function createBlock() {
  const block = document.createElement('div');
  block.classList.add('block');
  block.style.left = Math.random() * (window.innerWidth - 50) + 'px';
  gameArea.appendChild(block);

  let blockY = 0;
  const fallSpeed = 3;

  const fall = setInterval(() => {
    if (!gameRunning) return clearInterval(fall);
    blockY += fallSpeed;
    block.style.top = blockY + 'px';

    if (blockY > window.innerHeight) {
      block.remove();
      clearInterval(fall);
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }

    // Collision detection
    const playerRect = player.getBoundingClientRect();
    const blockRect = block.getBoundingClientRect();

    if (
      blockRect.top < playerRect.bottom &&
      blockRect.bottom > playerRect.top &&
      blockRect.left < playerRect.right &&
      blockRect.right > playerRect.left
    ) {
      gameRunning = false;
      alert('Game Over! Your score: ' + score);
      window.location.reload();
    }
  }, 16);
}

setInterval(() => {
  if (gameRunning) createBlock();
}, 1000);
