'use strict';

// Import elements
const gridElement = document.querySelector('.grid');
const buttonElements = [...document.getElementsByTagName('button')];

// Create grid tiles
const createTiles = function () {
  const tile = document.createElement('div');
  tile.classList.add('__tile');
  tile.style.width = '100px';
  tile.style.height = '100px';
  tile.style.border = '1px solid black';
  gridElement.append(tile);
};

createTiles();
