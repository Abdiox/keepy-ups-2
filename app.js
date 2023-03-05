"use strict";

window.addEventListener("load", start);
let points = 0;
let lives = 0;
// let isGameRunning = false;
function start() {
  console.log("Keepy ups!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_gameover").addEventListener("click", startGame);
  document.querySelector("#btn_genstart").addEventListener("click", showStartScreen);
}

function startGame() {
  // isGameRunning = true;
  points = 0;
  lives = 3;
  resetLives();
  resetPoints();
  showGameScreen();
  console.log("startGame");
  document.querySelector("#ingame_sound").play();
  document.querySelector("#ingame_sound").volume = 0.3;
  document.querySelector("#ingame_sound").currentTime = 0;

  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#start_level").play();

  registrerKlik();
  startAnimationer();
  startTimer();
}
function registrerKlik() {
  document.querySelector("#football1_container").addEventListener("click", clickBall);

  document.querySelector("#golden1_container").addEventListener("click", clickGolden);

  document.querySelector("#bomb1_container").addEventListener("click", clickBomb);

  document.querySelector("#lightning2_container").addEventListener("click", clickLightning);
}

function startAnimationer() {
  document.querySelector("#football1_container").classList.add("falling1");
  document.querySelector("#golden1_container").classList.add("falling2");
  document.querySelector("#bomb1_container").classList.add("falling3");
  document.querySelector("#lightning2_container").classList.add("falling4");
}

function resetLives() {
  lives = 3;
  document.querySelector("#health1").classList.remove("broken_heart");
  document.querySelector("#health2").classList.remove("broken_heart");
  document.querySelector("#health3").classList.remove("broken_heart");
  document.querySelector("#health1").classList.add("full_heart");
  document.querySelector("#health2").classList.add("full_heart");
  document.querySelector("#health3").classList.add("full_heart");
}

function resetPoints() {
  points = 0;

  displayPoints();
}
function showGameScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showStartScreen() {
  console.log("vis startSceen");
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function startTimer() {
  document.querySelector("#time_sprite").classList.remove("shrink");
  document.querySelector("#time_sprite").offsetWidth;
  document.querySelector("#time_sprite").classList.add("shrink");

  document.querySelector("#time_sprite").addEventListener("animationend", timerSlut);
}

function clickBall() {
  console.log("clickBall");
  let football = this;

  football.removeEventListener("click", clickBall);

  football.classList.add("paused");

  football.querySelector("img").classList.add("zoom_out");

  football.addEventListener("animationend", ballGone);

  document.querySelector("#sound_ball").currentTime = 0;

  document.querySelector("#sound_ball").play();

  incrementPoints();
}

function ballGone() {
  let football = this;
  football.removeEventListener("animationend", ballGone);

  football.querySelector("img").classList.remove("zoom_out");

  football.classList.remove("paused");

  football.classList.remove("falling1");
  football.offsetWidth;
  football.classList.add("falling1");

  football.addEventListener("click", clickBall);
}

function clickGolden() {
  console.log("clickGolden");
  let goldenBall = this;
  goldenBall.removeEventListener("click", clickGolden);

  goldenBall.classList.add("paused");

  goldenBall.querySelector("img").classList.add("zoom_out");

  goldenBall.addEventListener("animationend", goldenGone);

  incrementMorePoints();
  incrementedLives();

  if (lives < 3) {
    incrementLives();
  }
  document.querySelector("#sound_golden").play();
}

function goldenGone() {
  let goldenBall = this;
  goldenBall.removeEventListener("animationed", goldenGone);

  goldenBall.querySelector("img").classList.remove("zoom_out");

  goldenBall.classList.remove("paused");

  goldenBall.classList.remove("falling2");
  goldenBall.offsetWidth;
  goldenBall.classList.add("falling2");

  goldenBall.addEventListener("click", clickGolden);
}

//Negative ting som man kan trykke på
function clickBomb() {
  console.log("clickBomb");
  let kugle = this;
  kugle.removeEventListener("click", clickBomb);

  kugle.classList.add("paused");

  kugle.querySelector("img").classList.add("zoom_out");

  kugle.addEventListener("animationend", bombGone);

  decrementedLives();
  document.querySelector("#sound_bomb").play();
}

function bombGone() {
  let kugle = this;
  kugle.removeEventListener("animationed", bombGone);

  kugle.querySelector("img").classList.remove("zoom_out");

  kugle.classList.remove("paused");

  kugle.classList.remove("falling3");
  kugle.offsetWidth;
  kugle.classList.add("falling3");

  kugle.addEventListener("click", clickBomb);
  decrementPoints();
}
// function bombRestart() {
//   let kugle = this;
//   kugle.classList.remove("zoom_in");
//   kugle.offsetWidth;
//   kugle.classList.add("zoom_in");
// }

function clickLightning() {
  console.log("clickLightning");
  let lightning = this;
  //tilbae til start!

  lightning.removeEventListener("click", clickLightning);

  lightning.classList.add("paused");

  lightning.querySelector("img").classList.add("zoom_out");

  lightning.addEventListener("animationend", lightningGone);

  decrementedLives();
  decrementedLives();
  decrementedLives();

  document.querySelector("#sound_thunder").currentTime = 0;

  document.querySelector("#sound_thunder").play();
}

function lightningGone() {
  let lightning = this;
  lightning.removeEventListener("animationend", lightningGone);

  lightning.querySelector("img").classList.remove("zoom_out");

  lightning.classList.remove("paused");

  lightning.classList.remove("falling4");
  lightning.offsetWidth;
  lightning.classList.add("falling4");

  lightning.addEventListener("click", clickLightning);
}

//Ting som skal give 1 point
function incrementPoints() {
  console.log("incrementPoints");
  points = points + 1;
  displayPoints();
  if (points >= 10) {
    levelComplete();
  }
}
function displayPoints() {
  document.querySelector("#ball_count").textContent = points;
}
//ting som skal give 4 point
function incrementMorePoints() {
  console.log("IncrementMorePoints");
  points += 4;
  displayMorePoints();
}
function displayMorePoints() {
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
  if (lives <= 0) {
    gameOver();
  }
  showDecrementedLives();
}

function incrementedLives() {
  console.log("incrementLives");
  lives++;
  showIncrementedLives();
}

function showDecrementedLives() {
  document.querySelector("#health" + (lives + 1)).classList.add("broken_heart");
  document.querySelector("#health" + (lives + 1)).classList.remove("full_heart");
}

function showIncrementedLives() {
  document.querySelector("#health" + lives).classList.remove("broken_heart");
  document.querySelector("#health" + lives).classList.add("full_heart");
}

function timerSlut() {
  console.log("Timeren er slut!");

  if (points > 10) {
    levelComplete();
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("Game Over");
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#lost_game").play();
  stopGame();
}
function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#level_done").play();
  document.querySelector("#level_done").currentTime = 0;
  stopGame();
}

function stopGame() {
  // isGameRunning = false;
  document.querySelector("#ingame_sound").pause();
  document.querySelector("#football1_container").classList.remove("falling1");
  document.querySelector("#golden1_container").classList.remove("falling2");
  document.querySelector("#bomb1_container").classList.remove("falling3");
  document.querySelector("#lightning2_container").classList.remove("falling4");

  document.querySelector("#football1_container").removeEventListener("click", clickBall);

  document.querySelector("#golden1_container").removeEventListener("click", clickGolden);

  document.querySelector("#bomb1_container").removeEventListener("click", clickBomb);

  document.querySelector("#lightning2_container").removeEventListener("click", clickLightning);
}
