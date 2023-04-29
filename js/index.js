import init from "../../rust/pkg/rust.js";

// Test suites
import { shaTest } from "./hash.js";
import { grayscaleTest } from "./grayscale.js";
import { matrixTest } from "./matrix.js";
import { quickSortTest } from "./quicksort.js";

// Initialising elements
const runAlgorithmTestBtn = document.getElementById("runAlgorithmTestBtn");
const selectionElement = document.getElementById("algorithms");

runAlgorithmTestBtn.addEventListener("click", runAlgorithmTest, false);

let data;
window.onload = async () => {
  await init();

  const img = new Image();
  img.crossOrigin = "Anonymous"; // to avoid CORS if used with Canvas
  img.src = "/wallpaper_640.jpg";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data;

    ctx.putImageData(imageData, 0, 0);

    document.body.appendChild(canvas);
  };
};

async function runAlgorithmTest() {
  if (selectionElement.value == "qs") {
    await quickSortTest();
  } else if (selectionElement.value == "mm") {
    await matrixTest();
  } else if (selectionElement.value == "gs") {
    await grayscaleTest(data);
  } else {
    await shaTest();
  }
}

// Generator
function generateArray(x) {
  const arr = [];
  const max = 99999;
  const min = 1;

  for (let i = 0; i < x; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

function generateRandomMatrix(n, m) {
  const matrix = [];
  const max = 99999;
  const min = 1;

  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      row.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    matrix.push(row);
  }

  return matrix;
}
