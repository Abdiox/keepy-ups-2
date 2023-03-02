"use strict";

window.addEventListener("load", start);
let points = 0;
let lives = 0;

function start() {
  console.log("Keepy ups!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_gameover").addEventListener("click", startGame);
  document.querySelector("#btn_genstart").addEventListener("click", showStartScreen);
}

function showGameScreen() {
  console.log("test");
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
function startGame() {
  resetLives();
  resetPoints();
  showGameScreen();
  console.log("startGame");
  document.querySelector("#ingame_sound").play();

  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#start_level").play();

  document.querySelector("#football1_container").classList.add("falling1");
  document.querySelector("#golden1_container").classList.add("falling2");
  document.querySelector("#bomb1_container").classList.add("falling3");
  document.querySelector("#lightning2_container").classList.add("falling4");

  document.querySelector("#football1_container").addEventListener("click", clickBall);

  document.querySelector("#golden1_container").addEventListener("click", clickGolden);

  document.querySelector("#bomb1_container").addEventListener("click", clickBomb);

  document.querySelector("#lightning2_container").addEventListener("click", clickLightning);
}

function clickBall() {
  console.log("clickBall");

  document.querySelector("#football1_container").removeEventListener("click", clickBall);

  document.querySelector("#football1_container").classList.add("paused");

  document.querySelector("#football1_sprite").classList.add("zoom_out");

  document.querySelector("#football1_container").addEventListener("animationend", ballGone);

  document.querySelector("#sound_ball").currentTime = 0;

  document.querySelector("#sound_ball").play();

  incrementPoints();
}

function ballGone() {
  document.querySelector("#football1_container").removeEventListener("animationend", ballGone);

  document.querySelector("#football1_sprite").classList.remove("zoom_out");

  document.querySelector("#football1_container").classList.remove("paused");

  document.querySelector("#football1_container").classList.remove("falling1");
  document.querySelector("#football1_container").offsetWidth;
  document.querySelector("#football1_container").classList.add("falling1");

  document.querySelector("#football1_container").addEventListener("click", clickBall);
}

function clickGolden() {
  console.log("clickGolden");
  document.querySelector("#golden1_container").removeEventListener("click", clickGolden);

  document.querySelector("#golden1_container").classList.add("paused");

  document.querySelector("#golden1_sprite").classList.add("zoom_out");

  document.querySelector("#golden1_container").addEventListener("animationend", goldenGone);

  incrementPoints();
  incrementPoints();
  incrementPoints();
  incrementPoints();

  incrementedLives();

  if (lives < 3) {
    incrementLives();
  }
  document.querySelector("#sound_golden").play();
}

function goldenGone() {
  document.querySelector("#golden1_container").removeEventListener("animationed", goldenGone);

  document.querySelector("#golden1_sprite").classList.remove("zoom_out");

  document.querySelector("#golden1_container").classList.remove("paused");

  document.querySelector("#golden1_container").classList.remove("falling2");
  document.querySelector("#golden1_container").offsetWidth;
  document.querySelector("#golden1_container").classList.add("falling2");

  document.querySelector("#golden1_container").addEventListener("click", clickGolden);
}
function clickBomb() {
  console.log("clickBomb");
  document.querySelector("#bomb1_container").removeEventListener("click", clickBomb);

  document.querySelector("#bomb1_container").classList.add("paused");

  document.querySelector("#bomb1_sprite").classList.add("zoom_in");

  document.querySelector("#bomb1_container").addEventListener("animationend", bombGone);

  decrementedLives();
  document.querySelector("#sound_bomb").play();
}

function bombGone() {
  document.querySelector("#bomb1_container").removeEventListener("animationed", bombGone);

  document.querySelector("#bomb1_sprite").classList.remove("zoom_in");

  document.querySelector("#bomb1_container").classList.remove("paused");

  document.querySelector("#bomb1_container").classList.remove("falling3");
  document.querySelector("#bomb1_container").offsetWidth;
  document.querySelector("#bomb1_container").classList.add("falling3");

  document.querySelector("#bomb1_container").addEventListener("click", clickBomb);
  decrementPoints();
}

function clickLightning() {
  console.log("clickLightning");

  document.querySelector("#lightning2_container").removeEventListener("click", clickLightning);

  document.querySelector("#lightning2_container").classList.add("paused");

  document.querySelector("#ligtning2_sprite").classList.add("zoom_in");

  document.querySelector("#lightning2_container").addEventListener("animationend", lightningGone);

  decrementPoints();
  document.querySelector("#sound_thunder").currentTime = 0;

  document.querySelector("#sound_thunder").play();
}

function lightningGone() {
  document.querySelector("#lightning2_container").removeEventListener("animationend", lightningGone);

  document.querySelector("#ligtning2_sprite").classList.remove("zoom_out");

  document.querySelector("#lightning2_container").classList.remove("paused");

  document.querySelector("#lightning2_container").classList.remove("falling4");
  document.querySelector("#lightning2_container").offsetWidth;
  document.querySelector("#lightning2_container").classList.add("falling4");

  document.querySelector("#lightning2_container").addEventListener("click", lightningGone);
  gameOver();
}

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
