document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector('.main-container');
  const resetButton = document.querySelector('#reset-button');
  const eraserButton = document.querySelector('#eraser-button');
  const colorModeButton = document.querySelector('#color-mode-button');
  const rowSizeSlider = document.querySelector('#row-size');
  const colSizeSlider = document.querySelector('#col-size');
  const rowSizeValue = document.querySelector('#row-size-value');
  const colSizeValue = document.querySelector('#col-size-value');
  const colorWheel = document.querySelector('.color-wheel');
  const selectedColor = document.querySelector('.selected-color');

  let isErasing = false;
  let isDrawingEnabled = true;
  let currentRowSize = 16;
  let currentColSize = 16;
  let isDrawing = false;
  let isRainbowMode = false;
  let selectedColorValue = 'black';

  colorWheel.addEventListener('click', (event) => { // finds where color wheel is, then where i clicked on wheel in relation to the center of the wheel
    const boundingBox = colorWheel.getBoundingClientRect(); 
    const centerX = boundingBox.left + boundingBox.width / 2;
    const centerY = boundingBox.top + boundingBox.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
  
    // Calculate the angle in radians
    let angle = Math.atan2(deltaY, deltaX);
  
    // Adjust for the angle being measured clockwise from the positive x-axis
    angle += Math.PI / 2;
  
    // Convert the angle to degrees and ensure it's within the 0-360 degree range
    const degrees = ((angle * 180 / Math.PI + 360) % 360).toFixed(2);
  
    // Set the hue value and update the selected color
    selectedColor.style.backgroundColor = `hsl(${degrees}, 100%, 50%)`;
    selectedColorValue = `hsl(${degrees}, 100%, 50%)`;
    isDrawing = false;
  });

  colorModeButton.addEventListener('click', () => {
    if (colorModeButton.textContent === 'Color Mode') {  // Toggle between "Color Mode" and "Rainbow Mode"
      colorModeButton.textContent = 'Rainbow Mode';
    } else {
      colorModeButton.textContent = 'Color Mode';
    }
  });

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
    mainContainer.style.gridTemplateColumns = `repeat(${currentRowSize}, 1fr)`;
    mainContainer.style.gridTemplateRows = `repeat(${currentColSize}, 1fr)`;

    for (let i = 0; i < currentRowSize * currentColSize; i++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      mainContainer.appendChild(gridItem);
    }
  }

  function handleGridItemClick(event) {
    if (isDrawingEnabled && isDrawing) {
      const gridItem = event.target;
      if (isErasing) {
        gridItem.style.backgroundColor = 'white';
      } else {
        if (isRainbowMode) {
          const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
          gridItem.style.backgroundColor = randomColor;
        } else {
          gridItem.style.backgroundColor = selectedColorValue;
        }
      }
    }
  }

  mainContainer.addEventListener('mousedown', () => isDrawing = true);
  mainContainer.addEventListener('mouseup', () => isDrawing = false);
  mainContainer.addEventListener('mouseleave', () => isDrawing = false);
  mainContainer.addEventListener('mousemove', handleGridItemClick);

  resetButton.addEventListener('click', function () {
    isErasing = false;
    eraserButton.classList.remove('active'); // makes sure to toggle eraser off
    const gridItems = mainContainer.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => gridItem.style.backgroundColor = 'white');
    if (!isDrawingEnabled) {
      toggleDrawingEnabled();
    }

    selectedColor.style.backgroundColor = 'black';
    selectedColorValue = 'black';
  });

  eraserButton.addEventListener('click', function () {
    isErasing = !isErasing;

    if (isErasing) {
      eraserButton.classList.add('active');
    } else {
      eraserButton.classList.remove('active');
    }
  });

  colorModeButton.addEventListener('click', function () {
    isRainbowMode = !isRainbowMode; // Toggle rainbow mode
    if (isRainbowMode) {
      colorModeButton.textContent = 'Rainbow Mode'; // Change button text for rainbow mode
      colorModeButton.classList.add('rainbow-mode');
    } else {
      colorModeButton.textContent = 'Color Mode';
      colorModeButton.classList.remove('rainbow-mode');
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