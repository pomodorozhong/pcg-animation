var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;
var characterPos = [canvas.width / 2, canvas.height / 2]; //X,Y
var CHARACTER_WIDTH = 20;
var CHARACTER_HEIGHT = 20;
var FPS = 60;
var GRAVITY = 0.7;
var fallSpeed = 0;
var map = {}; // You could also use an array
onkeydown = onkeyup = function (e) {
  e = e || event; // to deal with IE
  map[e.keyCode] = e.type == 'keydown';
}
run();

function run() {
  if (map[65]) {
    if (characterPos[0] - 5 < CHARACTER_WIDTH / 2) {
      characterPos[0] = CHARACTER_WIDTH / 2;
    } else {
      characterPos[0] -= 5;
    }
  } //A
  if (map[68]) {
    if (characterPos[0] + 5 > canvas.width - CHARACTER_WIDTH / 2) {
      characterPos[0] = canvas.width - CHARACTER_WIDTH / 2;
    } else {
      characterPos[0] += 5;
    }
  } //D
  if (map[87]) {
    if (characterPos[1] >= canvas.height - CHARACTER_HEIGHT) {
      fallSpeed = -Math.round(document.getElementById("jumpSlider").value);
      characterPos[1] = canvas.height - CHARACTER_HEIGHT * 1.7;
    }
  } //W
  // if (map[83]) {
  //   characterPos[1]++;
  // } //S

  let stretchCoef = 1 + fallSpeed * document.getElementById("stretchSlider").value / 13;

  canvas.width = canvas.width;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    characterPos[0] - CHARACTER_WIDTH / 2 * stretchCoef,
    characterPos[1] - CHARACTER_HEIGHT / 2,
    CHARACTER_WIDTH * stretchCoef,
    CHARACTER_HEIGHT / stretchCoef);
  ctx.moveTo(characterPos[0], characterPos[1]);
  ctx.stroke();
  ctx.fillStyle = "rgba(255,0,0,1)";

  if (characterPos[1] >= canvas.height - CHARACTER_HEIGHT) {
    characterPos[1] = canvas.height - CHARACTER_HEIGHT;
    fallSpeed = 0;
  } else {
    fallSpeed += GRAVITY;
    if (characterPos[1] + fallSpeed <= canvas.height - CHARACTER_HEIGHT) {
      characterPos[1] += fallSpeed;
    } else {
      characterPos[1] += canvas.height - CHARACTER_HEIGHT;
    }
  }

  document.getElementById("jumpSliderText").innerHTML = document.getElementById("jumpSlider").value;
  document.getElementById("stretchSliderText").innerHTML = document.getElementById("stretchSlider").value;


  setTimeout("run()", 1000 / FPS);
}