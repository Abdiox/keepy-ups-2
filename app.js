"use strict";
console.log(this);

let points = 0;
let lives = 3;

window.addEventListener("load", start);

function start() {
  console.log("Keepy ups!");

  // points = 0;
  // lives = 3;

  //animationer
  startAnimationer();

  //clicks
  registrerKlik();
}

function registrerKlik() {
  document
    .querySelector("#football1_container")
    .addEventListener("click", clickBall);

  document
    .querySelector("#golden1_container")
    .addEventListener("click", clickGolden);

  document
    .querySelector("#bomb1_container")
    .addEventListener("click", clickBomb);

  document
    .querySelector("#lightning2_container")
    .addEventListener("click", clickLightning);
}

function startAnimationer() {
  document.querySelector("#football1_container").classList.add("falling1");
  document.querySelector("#golden1_container").classList.add("falling2");
  document.querySelector("#bomb1_container").classList.add("falling3");
  document.querySelector("#lightning2_container").classList.add("falling4");
}

function clickBall() {
  console.log("clickBall");
  console.log(this);

  let ball = this;

  ball.removeEventListener("click", clickBall);

  ball.classList.add("paused");

  ball.querySelector("img").classList.add("zoom_out");

  ball.addEventListener("animationend", ballGone);

  incrementPoints();
}

function ballGone() {
  console.log("ballGone");
  console.log = this;
  ball.removeEventListener("animationend", ballGone);

  ball.querySelector("img").classList.remove("zoom_out");

  ball.classList.remove("paused");

  ball.classList.remove("falling1");
  ball.offsetWidth;
  ball.classList.add("falling1");
  ball.addEventListener("click", clickBall);
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
  incrementedLives();
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
function clickBomb() {
  console.log("clickBomb");
  document
    .querySelector("#bomb1_container")
    .removeEventListener("click", clickBomb);

  document.querySelector("#bomb1_container").classList.add("paused");

  document.querySelector("#bomb1_sprite").classList.add("zoom_in");

  document
    .querySelector("#bomb1_container")
    .addEventListener("animationend", bombGone);
  decrementedLives();
}

function bombGone() {
  document
    .querySelector("#bomb1_container")
    .removeEventListener("animationed", bombGone);

  document.querySelector("#bomb1_sprite").classList.remove("zoom_in");

  document.querySelector("#bomb1_container").classList.remove("paused");

  document.querySelector("#bomb1_container").classList.remove("falling3");
  document.querySelector("#bomb1_container").offsetWidth;
  document.querySelector("#bomb1_container").classList.add("falling3");

  document
    .querySelector("#bomb1_container")
    .addEventListener("click", clickBomb);
  decrementPoints();
}

function clickLightning() {
  console.log("clickLightning");

  document
    .querySelector("#lightning2_container")
    .removeEventListener("click", clickLightning);

  document.querySelector("#lightning2_container").classList.add("paused");

  document.querySelector("#ligtning2_sprite").classList.add("zoom_in");

  document
    .querySelector("#lightning2_container")
    .addEventListener("animationend", lightningGone);

  decrementPoints();
}

function lightningGone() {
  document
    .querySelector("#lightning2_container")
    .removeEventListener("animationend", lightningGone);

  document.querySelector("#ligtning2_sprite").classList.remove("zoom_out");

  document.querySelector("#lightning2_container").classList.remove("paused");

  document.querySelector("#lightning2_container").classList.remove("falling4");
  document.querySelector("#lightning2_container").offsetWidth;
  document.querySelector("#lightning2_container").classList.add("falling4");

  document
    .querySelector("#lightning2_container")
    .addEventListener("click", lightningGone);
}

function incrementPoints() {
  console.log("incrementPoints");
  points = points + 1;
  displayPoints();
}

function displayPoints() {
  document.querySelector("#ball_count").textContent = points;
}

function decrementPoints() {
  console.log("decrementPoints");
  points--;
  displayPoints();
}

function displayPoints() {
  console.log("points");
  document.querySelector("#ball_count").textContent = points;
}

function decrementedLives() {
  lives--;
  console.log("decrementLives");
  // if (lives <= 0) {
  //   gameOver();
  // } else {
  showDecrementedLives();
}

function incrementedLives() {
  console.log("få et liv");
  // if (lives >= 3) {
  //   lives;
  // } else lives++;
  showIncrementedLives();
}

function showDecrementedLives() {
  document.querySelector("#health" + (lives + 1)).classList.add("broken_heart");
  document
    .querySelector("#health" + (lives + 1))
    .classList.remove("full_heart");
}

function showIncrementedLives() {
  document.querySelector("#health" + lives).classList.remove("broken_heart");
  document.querySelector("#health" + lives).classList.add("full_heart");
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
