'use strict';

// Import elements
const gridElement = document.querySelector('.grid');
const inputField = document.getElementById('num');
const buttonGen = document.querySelector('.generate');
const tiles = [];

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

  console.log(tiles);

  // Disable input field
  inputField.disabled = true;
};

buttonGen.addEventListener('click', createTiles);
