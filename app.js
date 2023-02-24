"use strict";

let points = 0;
let lives = 3;

window.addEventListener("load", start);

function start() {
  console.log("Keepy ups!");
  points = 0;
  lives = 0;

  //animationer
  document.querySelector("#football1_container").classList.add("falling1");
  document.querySelector("#golden1_container").classList.add("falling2");

  //clicks
  document
    .querySelector("#football1_container")
    .addEventListener("click", clickBall);

  document
    .querySelector("#golden1_container")
    .addEventListener("click", clickGolden);
}

function clickBall() {
  console.log("clickBall");
  document
    .querySelector("#football1_container")
    .removeEventListener("click", clickBall);

  document.querySelector("#football1_container").classList.add("paused");

  document.querySelector("#football1_sprite").classList.add("zoom_out");

  document
    .querySelector("#football1_container")
    .addEventListener("animationend", ballGone);

  incrementPoints();
}

function ballGone() {
  document
    .querySelector("#football1_container")
    .removeEventListener("animationend", ballGone);

  document.querySelector("#football1_sprite").classList.remove("zoom_out");

  document.querySelector("#football1_container").classList.remove("paused");

  document.querySelector("#football1_container").classList.remove("falling1");
  document.querySelector("#football1_container").offsetWidth;
  document.querySelector("#football1_container").classList.add("falling1");

  document
    .querySelector("#football1_container")
    .addEventListener("click", clickBall);
}
function clickGolden() {
  console.log("clickGolden");
  document
    .querySelector("#golden1_container")
    .removeEventListener("click", clickGolden);

  document.querySelector("#golden1_container").classList.add("paused");

  document.querySelector("#golden1_sprite").classList.add("zoom_out");

  document
    .querySelector("#golden1_container")
    .addEventListener("animationend", goldenGone);

  incrementPoints();
}

function goldenGone() {
  document
    .querySelector("#golden1_container")
    .removeEventListener("animationed", goldenGone);

  document.querySelector("#golden1_sprite").classList.remove("zoom_out");

  document.querySelector("#golden1_container").classList.remove("paused");

  document.querySelector("#golden1_container").classList.remove("falling2");
  document.querySelector("#golden1_container").offsetWidth;
  document.querySelector("#golden1_container").classList.add("falling2");

  document
    .querySelector("#golden1_container")
    .addEventListener("click", clickGolden);
}

function incrementPoints() {
  console.log("incrementPoints");
  points = points + 1;
  displayPoints();
}

function displayPoints() {
  document.querySelector("#ball_count").textContent = points;
}

//ball animatiom

//Level complete koder:
// if (lives <= 0) {
//   gameOver();
// } else {
//   levelComplete();
// }

// function gameOver() {
//   console.log("Game Over");
// }
// function levelComplete() {
//   console.log("Level Complete");
// }
