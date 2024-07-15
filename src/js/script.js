'use strict';

/**
 * Initializes the main functionality of the sketchpad application.
 */
document.addEventListener('DOMContentLoaded', function () {
  const main = function () {
    // DOM ELEMENTS
    /** @type {HTMLElement} */
    const gridElement = document.querySelector('.grid');
    /** @type {HTMLInputElement} */
    const inputFieldElement = document.getElementById('num');
    /** @type {HTMLButtonElement[]} */
    const buttonElements = Array.from(document.getElementsByTagName('button'));

    // VARIABLES
    /** @type {string} */
    let accent = 'black';
    /** @type {HTMLElement[]} */
    const tiles = [];
    /** @type {Function[]} */
    const btnCallbacks = [
      createTiles,
      cleanBoard,
      resetBoard,
      () => switchColorMode('black'),
      () => switchColorMode('rgb'),
      () => switchColorMode('grayscale'),
    ];

    // FUNCTION EXPRESSIONS
    /**
     * Gets the number of tiles to create from the input field.
     * @returns {number}
     */
    const getCellNumber = function () {
      const num = inputFieldElement.value;
      return num;
    };

    /**
     * Generates a random RGB color.
     * @returns {string}
     */
    const getRandRGB = function () {
      const rgbValue = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      return rgbValue;
    };

    /**
     * Attaches an event handler to all tiles for a specific event.
     * @param {HTMLElement[]} tilesArray - The array of tile elements.
     * @param {string} eventType - The type of event (e.g., 'mouseover').
     * @param {Function} eventHandler - The event handler function.
     */
    const targetTiles = function (tilesArray, eventType, eventHandler) {
      tilesArray.forEach(tile =>
        tile.addEventListener(eventType, eventHandler)
      );
    };

    /**
     * Functions to apply different colors to tiles.
     * @type {Object}
     */
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

    /**
     * Colors a tile based on the current accent color.
     * @param {MouseEvent} e - The mouse event triggering the color change.
     */
    const colorTiles = function (e) {
      if (!e.target.classList.contains('tile')) return;
      colorFunctions[accent](e.target);
    };

    /**
     * Attaches event listeners to the buttons.
     */
    const attachButtonEventListeners = function () {
      buttonElements.forEach((btn, i) =>
        btn.addEventListener('click', btnCallbacks[i])
      );
    };

    // CALLBACK FUNCTIONS
    /**
     * Creates tiles based on the input number and adds them to the grid.
     */
    function createTiles() {
      const num = getCellNumber();
      const gridWidth = gridElement.clientWidth;
      const tileWidth = gridWidth / num;

      Array.from({ length: num * num })
        .map(() => {
          const tile = document.createElement('div');
          tile.classList.add('tile');

          tile.style.width = `${tileWidth}px`;
          tile.style.height = `${tileWidth}px`;

          tile.dataset.darkness = 0;

          return tile;
        })
        .forEach(tile => {
          gridElement.append(tile);
          tiles.push(tile);
        });

      inputFieldElement.disabled = true;
      buttonElements[0].disabled = true;

      targetTiles(tiles, 'mouseover', colorTiles);
    }

    /**
     * Switches the color mode for coloring tiles.
     * @param {string} mode - The color mode to switch to (e.g., 'black', 'rgb', 'grayscale').
     */
    function switchColorMode(mode) {
      accent = mode;
      targetTiles(tiles, 'mouseover', colorTiles);
    }

    /**
     * Resets the colors of all tiles to white.
     */
    function cleanBoard() {
      tiles.forEach(tile => {
        tile.style.backgroundColor = '#fff';
        tile.dataset.darkness = 0;
      });
    }

    /**
     * Resets the board, enabling the input and clearing the grid.
     */
    function resetBoard() {
      cleanBoard();
      inputFieldElement.disabled = false;
      inputFieldElement.value = '';
      inputFieldElement.placeholder = '1-100';
      buttonElements[0].disabled = false;
      accent = 'black';
      gridElement.innerHTML = '';
      tiles.length = 0;
    }

    // INVOCATIONS
    attachButtonEventListeners();
  };

  main();
});
