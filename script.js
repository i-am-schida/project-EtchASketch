document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector('.main-container');
  const resetButton = document.querySelector('#reset-button');
  const eraserButton = document.querySelector('#eraser-button');
  const colorModeButton = document.querySelector('#color-mode-button');
  const rowSizeSlider = document.querySelector('#row-size');
  const colSizeSlider = document.querySelector('#col-size');
  const rowSizeValue = document.querySelector('#row-size-value');
  const colSizeValue = document.querySelector('#col-size-value');

  let isErasing = false;
  let isDrawingEnabled = true;
  let currentRowSize = 16;
  let currentColSize = 16;
  let isDrawing = false;
  let isRainbowMode = false;

  function toggleDrawingEnabled() {
    isDrawingEnabled = !isDrawingEnabled;
    mainContainer.classList.toggle('drawing-enabled', !isDrawingEnabled);
    if (isRainbowMode) {
      colorModeButton.textContent = 'Rainbow Mode';
    } else {
      colorModeButton.textContent = 'Color Mode';
    }
  }

  toggleDrawingEnabled(); 
  
  function createGrid() {
    mainContainer.innerHTML = '';
    mainContainer.style.gridTemplateColumns = `repeat(${currentColSize}, 1fr)`;
    mainContainer.style.gridTemplateRows = `repeat(${currentRowSize}, 1fr)`;

    for (let i = 0; i < currentRowSize * currentColSize; i++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      mainContainer.appendChild(gridItem);
    }
  }

  function handleGridItemClick(event) {
    if (isDrawingEnabled && isDrawing) {
      const gridItem = event.target;
      if (isRainbowMode) {
        const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        gridItem.style.backgroundColor = randomColor;
      } else {
        gridItem.style.backgroundColor = isErasing ? 'white' : 'black';
      }
    }
  }

  mainContainer.addEventListener('mousedown', () => isDrawing = true);
  mainContainer.addEventListener('mouseup', () => isDrawing = false);
  mainContainer.addEventListener('mouseleave', () => isDrawing = false);
  mainContainer.addEventListener('mousemove', handleGridItemClick);

  resetButton.addEventListener('click', function () {
    isErasing = false;
    const gridItems = mainContainer.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => gridItem.style.backgroundColor = 'white');
    if (!isDrawingEnabled) {
      toggleDrawingEnabled();
    }
  });

  eraserButton.addEventListener('click', function () {
    isErasing = !isErasing;
  });

  colorModeButton.addEventListener('click', function () {
    isRainbowMode = !isRainbowMode; // Toggle rainbow mode
    if (isRainbowMode) {
      colorModeButton.textContent = 'Rainbow Mode'; // Change button text for rainbow mode
    } else {
      colorModeButton.textContent = 'Color Mode';
    }
  });

  rowSizeSlider.addEventListener('input', function () {
    currentRowSize = parseInt(rowSizeSlider.value);
    rowSizeValue.textContent = currentRowSize;
    createGrid();
  });

  colSizeSlider.addEventListener('input', function () {
    currentColSize = parseInt(colSizeSlider.value);
    colSizeValue.textContent = currentColSize;
    createGrid();
  });

  toggleDrawingEnabled();
  createGrid();
});