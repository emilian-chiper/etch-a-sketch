'use strict';

// Import elements
const gridElement = document.querySelector('.grid');
const inputField = document.getElementById('num');
const buttonGen = document.querySelector('.generate');
const buttonBlack = document.querySelector('.black');
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

// Handle tile colouring
const colorTiles = function (e) {
  if (!e.target.classList.contains('tile')) return;
  e.target.style.backgroundColor = accent;
};

// Event listeners
buttonGen.addEventListener('click', createTiles);
