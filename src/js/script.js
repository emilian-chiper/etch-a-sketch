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
      tile.dataset.darkness = 0; // Initialize darkness level

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

// Coloring functions for different modes
const colorFunctions = {
  black: tile => {
    tile.style.backgroundColor = 'black';
  },
  rgb: tile => {
    tile.style.backgroundColor = getRandRGB();
  },
  grayscale: tile => {
    let darkness = parseFloat(tile.dataset.darkness);
    if (darkness < 1) {
      darkness += 0.1;
      tile.dataset.darkness = darkness;
      const grayValue = Math.floor(255 * (1 - darkness));
      tile.style.backgroundColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
    }
  },
};

// Handle tile coloring
const colorTiles = function (e) {
  if (!e.target.classList.contains('tile')) return;
  colorFunctions[accent](e.target);
};

// Generic function to switch color mode
const switchColorMode = function (mode) {
  accent = mode;
  targetTiles(tiles, 'mouseover', colorTiles);
};

// Clean board, preserving the tiles
const wipeBoard = function () {
  tiles.forEach(tile => {
    tile.style.backgroundColor = '#fff';
    tile.style.opacity = '1';
  });
};

// Event listeners
buttonGen.addEventListener('click', createTiles);
buttonRGB.addEventListener('click', () => switchColorMode('rgb'));
buttonGrayscale.addEventListener('click', () => switchColorMode('grayscale'));
buttonBlack.addEventListener('click', () => switchColorMode('black'));
buttonClean.addEventListener('click', wipeBoard);
