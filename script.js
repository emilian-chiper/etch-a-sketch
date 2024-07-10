'use strict';

// Import elements
const gridElement = document.querySelector('.grid');
const inputField = document.getElementById('num');
const buttonGen = document.querySelector('.generate');
const buttonBlack = document.querySelector('.black');
const buttonRGB = document.querySelector('.rgb');
const buttonGrayscale = document.querySelector('.grayscale');
const buttonClean = document.querySelector('.clean');
const buttonClear = document.querySelector('.clear');
const tiles = [];
let accent = 'black';

// Create grid tiles
const createTiles = function () {
  const num = inputField.value;

  // Get grid width
  const gridWidth = gridElement.clientWidth;

  // Get tile width
  const tileWidth = gridWidth / num;
  console.log(num, gridWidth, tileWidth);

  // Generate and append tiles
  Array.from({ length: num * num })
    .map(() => {
      const tile = document.createElement('div');
      tile.classList.add('tile');

      // Style tile element
      tile.style.width = `${tileWidth}px`;
      tile.style.height = `${tileWidth}px`;

      return tile;
    })
    .forEach(tile => {
      gridElement.append(tile);
      tiles.push(tile);
    });

  // Disable input field
  inputField.disabled = true;

  // Handle colouring
  targetTiles(tiles, 'mouseover', colorTiles);
};

// Assign event listeners to grid tiles
const targetTiles = function (tilesArray, eventType, eventHandler) {
  tilesArray.forEach(function (tile) {
    tile.addEventListener(eventType, eventHandler);
  });
};

// Get random RGB color
const getRandRGB = function () {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
};

// Handle tile colouring
const colorTiles = function (e) {
  if (!e.target.classList.contains('tile')) return;
  e.target.style.backgroundColor = accent === 'rgb' ? getRandRGB() : accent;
};

const colorRGB = function () {
  accent = 'rgb';
  targetTiles(tiles, 'mouseover, colorTiles');
};

// Event listeners
buttonGen.addEventListener('click', createTiles);
buttonRGB.addEventListener('click', colorRGB);
