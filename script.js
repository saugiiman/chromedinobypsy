// script.js
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

let isJumping = false;

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    if (!isJumping) jump();
  }
});

function jump() {
  isJumping = true;
  let position = 0;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      // Fall down
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 5;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 5;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function moveCactus() {
  let cactusLeft = 800;

  let cactusInterval = setInterval(() => {
    if (cactusLeft < -30) {
      cactusLeft = 800;
    } else {
      cactusLeft -= 10;
    }

    cactus.style.left = cactusLeft + "px";

    // Collision detection
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    if (cactusLeft > 50 && cactusLeft < 90 && dinoBottom < 50) {
      alert("Game Over!");
      clearInterval(cactusInterval);
      window.location.reload();
    }
  }, 50);
}

moveCactus();
