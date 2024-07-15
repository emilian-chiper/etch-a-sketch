# ETCH-A-SKETCH

A simple sketchpad application that allows users to create a customizable grid of tiles and color them using different modes. This project is designed to provide an interactive experience, helping users visualize their creativity through a web-based interface. The project is part of the Foundations track of The Odin Project.

## Features

**Dynamic Grid Creation**: Generate a grid based on user input for the number of tiles (1-100).

- **Multiple Color Modes**:
  - **Black**: Color tiles in solid black.
  - **Random RGB**: Color tiles with randomly generated RGB colors.
  - **Grayscale**: Color tiles with increasing darkness to create a grayscale effect.
- **Reset Functionality**: Clear the board or reset it entirely, allowing for a fresh start.

## Installation

To get started with the Etch-a-Sketch application, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/sketchpad.git
   cd sketchpad
   ```

2. **Open the application**:

Open the `index.html` in your web browser to view the application.

## Usage

1. **Input Fied**: Enter a number between 1 and 100 in the input field to set the grid size.

2. **Create Button**: Click the "Create" button (+) to generate the grid of tiles.

3. **Color Mode Buttons:** Use the color mode buttons to change how the tiles are colored:

   - **Black**: Colors the tile black on mouseover.
   - **Random RGB**: Colors the tile with a random RGB color on mouseover.
   - **Grayscale**: Colors the tile with increasing darkness on mouseover.

4. **Clean Button**: Click "Clean" (-) to reset all tiles to white.

5. **Reset Button**: Click "Reset" (x) to clear the grid and re-enable the input field.

## Files

- `index.html`: The HTML structure of the application.
- `styles.css`: The CSS styling of the application.
- `script.js`: The JavaScript code for the game logic.

## Documentation

The application logic is implemented in `script.js`. Here are the details:

### main

The main function that initializes the application.

### batnCallbacks

```javascript
const btnCallbacks = [
  createTiles,
  cleanBoard,
  resetBoard,
  () => switchColorMode('black'),
  () => switchColorMode('rgb'),
  () => switchColorMode('grayscale'),
];
```

Array containing callback functions that will be attached to the buttons with click events.

### getCellNumber

```javascript
const getCellNumber = function () {
  const num = inputFieldElement.value;
  return num;
};
```

Gets the number of tiles to create from the input field.

### getRandRGB

```javascript
const getRandRGB = function () {
  const rgbValue = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  return rgbValue;
};
```

Generates a random RGB color.

### targetTiles

```javascript
const targetTiles = function (tilesArray, eventType, eventHandler) {
  tilesArray.forEach(tile => tile.addEventListener(eventType, eventHandler));
};
```

Attaches an event handler to all tiles for a specific event.

### colorFunctions

```javascript
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
```

Functions to apply different colors to tiles.

### colorTiles

```javascript
const colorTiles = function (e) {
  if (!e.target.classList.contains('tile')) return;
  colorFunctions[accent](e.target);
};
```

Colors a tile based on the current accent color.

### attachButtonEventListeners

```javascript
const attachButtonEventListeners = function () {
  buttonElements.forEach((btn, i) =>
    btn.addEventListener('click', btnCallbacks[i])
  );
};
```

### createTiles

```javascript
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
```

Creates tiles based on the input number and adds them to the grid.

### switchColorMode

```javascript
function switchColorMode(mode) {
  accent = mode;
  targetTiles(tiles, 'mouseover', colorTiles);
}
```

Switches the color mode for coloring tiles.

### cleanBoard

```javascript
function cleanBoard() {
  tiles.forEach(tile => {
    tile.style.backgroundColor = '#fff';
    tile.dataset.darkness = 0;
  });
}
```

Resets the colors of all tiles to white.

### resetBoard

```javascript
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
```

Resets the board, enabling the input and clearing the grid.

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

© 2024 Emilian Chiper
