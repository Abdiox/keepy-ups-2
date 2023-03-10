"use strict";

window.addEventListener("load", start);
let points = 0;
let lives = 0;
let isGameRunning = false;
function start() {
  console.log("Keepy ups!");
  document.querySelector("#btn_start").addEventListener("mousedown", startGame);
  document.querySelector("#btn_gameover").addEventListener("mousedown", startGame);
  document.querySelector("#btn_genstart").addEventListener("mousedown", showStartScreen);
}

function startGame() {
  isGameRunning = true;
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
  document.querySelector("#football1_container").addEventListener("mousedown", clickBall);
  document.querySelector("#football2_container").addEventListener("mousedown", clickBall);
  document.querySelector("#football3_container").addEventListener("mousedown", clickBall);

  document.querySelector("#golden1_container").addEventListener("mousedown", clickGolden);

  document.querySelector("#bomb1_container").addEventListener("mousedown", clickBomb);
  document.querySelector("#bomb2_container").addEventListener("mousedown", clickBomb);

  document.querySelector("#lightning2_container").addEventListener("mousedown", clickLightning);

  document.querySelector("#football1_container").addEventListener("animationiteration", animationRepeat);
  document.querySelector("#football2_container").addEventListener("animationiteration", animationRepeat);
  document.querySelector("#football3_container").addEventListener("animationiteration", animationRepeat);
}

function startAnimationer() {
  //Animationerne starter og falder ned
  document.querySelector("#football1_container").classList.add("falling1");
  document.querySelector("#football2_container").classList.add("falling1");
  document.querySelector("#football3_container").classList.add("falling1");
  document.querySelector("#golden1_container").classList.add("falling2");
  document.querySelector("#bomb1_container").classList.add("falling3");
  document.querySelector("#lightning2_container").classList.add("falling4");
  //start speed animationer
  document.querySelector("#football1_container").classList.add("speed1");
  document.querySelector("#football2_container").classList.add("speed2");
  document.querySelector("#football3_container").classList.add("speed3");
  document.querySelector("#golden1_container").classList.add("speed4");
  document.querySelector("#bomb1_container").classList.add("speed5");
  document.querySelector("#lightning2_container").classList.add("speed6");
  //start position animationerne
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
  displayMorePoints();
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
//Positive ting man kan klikke p??
function clickBall() {
  console.log("clickBall");
  let football = this;

  football.removeEventListener("mousedown", clickBall);

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

  football.addEventListener("mousedown", clickBall);
}

function animationRepeat() {
  console.log("repeat");
  document.querySelector("#football1_container").addEventListener("animationed", fotballsRestart);
  document.querySelector("#football2_container").addEventListener("animationed", fotballsRestart);
  document.querySelector("#football3_container").addEventListener("animationed", fotballsRestart);
}

function fotballsRestart() {
  console.log("fotballsRestart");

  let balls = this;
  balls.classList.remove("falling1");
  balls.offsetWidth;
  balls.classList.add("falling1");

  football.classList.remove("speed1", "speed2", "speed3", "speed4", "speed5", "speed6");
  let speed = Math.floor(Math.random() * 6) + 1;
  football.classList.add("speed" + speed);
}

function clickGolden() {
  console.log("clickGolden");
  let goldenBall = this;
  goldenBall.removeEventListener("mousedown", clickGolden);

  goldenBall.classList.add("paused");

  goldenBall.querySelector("img").classList.add("zoom_out");

  goldenBall.addEventListener("animationend", goldenGone);

  incrementMorePoints();
  incrementedLives();

  // if (lives < 3) {
  // }
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

  goldenBall.addEventListener("mousedown", clickGolden);
}

//Negative ting som man kan klikke p??
function clickBomb() {
  console.log("clickBomb");
  let kugle = this;
  kugle.removeEventListener("mousedown", clickBomb);

  kugle.classList.add("paused");

  kugle.querySelector("img").classList.add("zoom_in");

  kugle.addEventListener("animationend", bombGone);

  decrementedLives();
  document.querySelector("#sound_bomb").play();
}

function bombGone() {
  let kugle = this;
  kugle.removeEventListener("animationed", bombGone);

  kugle.querySelector("img").classList.remove("zoom_in");

  kugle.classList.remove("paused");

  kugle.classList.remove("falling3");
  kugle.offsetWidth;
  kugle.classList.add("falling3");

  kugle.addEventListener("mousedown", clickBomb);
  decrementPoints();
}

function clickLightning() {
  console.log("clickLightning");
  let lightning = this;
  //tilbae til start!

  lightning.removeEventListener("mousedown", clickLightning);

  lightning.classList.add("paused");

  lightning.querySelector("img").classList.add("zoom_in");

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

  lightning.querySelector("img").classList.remove("zoom_in");

  lightning.classList.remove("paused");

  lightning.classList.remove("falling4");
  lightning.offsetWidth;
  lightning.classList.add("falling4");

  lightning.addEventListener("mousedown", clickLightning);
}

//Ting som skal give 1 point
function incrementPoints() {
  console.log("F?? 1 point");
  points = points + 1;
  displayPoints();
  if (points >= 30) {
    levelComplete();
  }
}
function displayPoints() {
  document.querySelector("#ball_count").textContent = points;
}
//ting som skal give 4 point
function incrementMorePoints() {
  console.log("F?? 3 point");
  points += 3;
  displayMorePoints();
  if (points >= 30) {
    levelComplete();
  }
}
function displayMorePoints() {
  document.querySelector("#ball_count").textContent = points;
}
//Ting som skal tage liv
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
  console.log("Mist et liv");
  if (lives <= 0) {
    gameOver();
  }
  showDecrementedLives();
}
//Ting som skal give liv
function incrementedLives() {
  console.log("F?? et liv");
  if (lives >= 3) {
    lives;
  } else lives++;

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

//Sltuning af spillet

//Hvis du ikke har mere end 30 point n??r gamet er slut har du tabt
function timerSlut() {
  console.log("Timeren er slut!");

  if (points > 30) {
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
  stopGame();
}

function stopGame() {
  isGameRunning = false;
  //Fjern animationer
  document.querySelector("#ingame_sound").pause();
  document.querySelector("#football1_container").classList.remove("falling1");
  document.querySelector("#golden1_container").classList.remove("falling2");
  document.querySelector("#bomb1_container").classList.remove("falling3");
  document.querySelector("#lightning2_container").classList.remove("falling4");

  //fjern klik
  document.querySelector("#football1_container").removeEventListener("mousedown", clickBall);
  document.querySelector("#football2_container").removeEventListener("mousedown", clickBall);
  document.querySelector("#football3_container").removeEventListener("mousedown", clickBall);
  document.querySelector("#golden1_container").removeEventListener("mousedown", clickGolden);
  document.querySelector("#bomb1_container").removeEventListener("mousedown", clickBomb);
  document.querySelector("#lightning2_container").removeEventListener("mousedown", clickLightning);
}
