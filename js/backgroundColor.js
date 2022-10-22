const strongColors = [
  "rgb(254, 24, 74)",
  "rgb(192, 213, 0)",
  "rgb(0, 206, 76)",
  "rgb(15, 0, 222)",
  "rgb(201, 0, 184)",
];
const lightColors = [
  "rgb(254, 24, 74,0.7)",
  "rgb(192, 213, 0,0.7)",
  "rgb(0, 206, 76,0.7)",
  "rgb(15, 0, 222,0.7)",
  "rgb(201, 0, 184,0.7)",
];

const randNum = Math.floor(Math.random() * strongColors.length);

let root = document.querySelector(":root");
const value = getComputedStyle(root);

root.style.setProperty("--bgColor", strongColors[randNum]);
root.style.setProperty("--bgColorLight", lightColors[randNum]);
