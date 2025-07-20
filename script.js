// script.js
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;

document.addEventListener("keydown", (e) => {
  if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let position = 0;

  let up = setInterval(() => {
    if (position >= 130) {
      clearInterval(up);
      let down = setInterval(() => {
        if (position <= 0) {
          clearInterval(down);
          isJumping = false;
        } else {
          position -= 5;
          dino.style.bottom = position + 20 + "px";
        }
      }, 20);
    } else {
      position += 5;
      dino.style.bottom = position + 20 + "px";
    }
  }, 20);
}

function moveCactus() {
  let cactusLeft = 800;

  let interval = setInterval(() => {
    if (cactusLeft < -30) {
      cactusLeft = 800;
      score += 1;
      scoreDisplay.textContent = "Score: " + score;
    } else {
      cactusLeft -= 10;
    }

    cactus.style.left = cactusLeft + "px";

    // Collision
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    if (cactusLeft < 110 && cactusLeft > 80 && dinoBottom < 50) {
      alert("💥 Game Over!\nYour Score: " + score);
      clearInterval(interval);
      window.location.reload();
    }
  }, 50);
}

moveCactus();
