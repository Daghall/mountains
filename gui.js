import controls from "./controls.js";

let canvas;
let mountains = 4;
const properties = {};

function init() {
  const canvasElement = document.querySelector("canvas");
  canvas = canvasElement.getContext("2d");
  properties.canvasWidth = canvasElement.getAttribute("width");
  properties.canvasHeight = canvasElement.getAttribute("height");
  properties.center = properties.canvasHeight / 2;

  controls(draw);
  draw();
}

function draw(modifier = 0) {
  reset();

  mountains = Math.max(1, mountains + modifier);

  Array(mountains).fill().forEach((_, i) => {
    drawMountain(i, mountains);
  });
}

function drawMountain(number) {
  const baseLine = properties.canvasHeight * (number / mountains) + 40;
  canvas.fillStyle = mountainColor(number, mountains);
  canvas.beginPath();
  canvas.moveTo(0, baseLine);

  const r1 = Math.random() * 150 + 75;
  const r2 = Math.random() * 75 + 150;
  const f1 = Math.random() > 0.5 ? Math.sin : Math.cos;
  const f2 = Math.random() > 0.5 ? Math.sin : Math.cos;

  for (let x = 0; x < properties.canvasWidth; ++x) {
    const y = Math.sin(x / (number + 1)) * (number + 1) * 3 + Math.random() * 3 + baseLine
      + f1((r2 + x) / r1) * 40
      + f2((r1 + x) / r2) * 20;
    canvas.lineTo(x, y);
  }

  // Box it in
  canvas.lineTo(properties.canvasWidth, properties.canvasHeight);
  canvas.lineTo(0, properties.canvasHeight);
  canvas.closePath();

  canvas.fill();
}

function mountainColor(number) {
  const r = Math.round(128 * (1 - (number / (mountains + 1))));
  const g = Math.round(192 * (1 - (number / (mountains + 1))));
  const b = Math.round(192 * (1 - (number / (mountains + 1))));
  console.log(`#${r.toString(16)}${g.toString(16)}${b.toString(16)}`); // eslint-disable-line no-console
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

function reset() {
  canvas.fillStyle = "whitesmoke";
  canvas.fillRect(0, 0, properties.canvasWidth, properties.canvasHeight);
}

init();
