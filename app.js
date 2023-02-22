"use strict";

let points = 0;
let lives = 3;

window.addEventListener("load", start);

function start() {
  console.log("Keepy ups!");

  document.querySelector("#football1_container").classList.add("falling");
  document.querySelector("#small_bombs1_sprite").classList.add("falling");
  document
    .querySelector("#football1_container")
    .addEventListener("click", clickBall);
  document
    .querySelector("#small_bombs1_sprite")
    .addEventListener("click", clickBomb);
}
