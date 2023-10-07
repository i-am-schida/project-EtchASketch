document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector('.main-container');
  const resetButton = document.querySelector('#reset-button');
  const eraserButton = document.querySelector('#eraser-button');
  const colorModeButton = document.querySelector('#color-mode-button');
  let isErasing = false; // eraser mode toggle
  let isDrawingEnabled = true; // DEFAULTS to this mode


  function toggleDrawingEnabled () {
    isDrawingEnabled = !isDrawingEnabled;
    mainContainer.classList.toggle('drawing-enabled', !isDrawingEnabled);

    if (isDrawingEnabled) {
      colorModeButton.textContent = 'Color Mode';
    } else {
      colorModeButton.textContent = 'Drawing Disabled';
    }
  }

  let isDrawing = false;

  mainContainer.addEventListener('mousedown', function () {
    isDrawing = isDrawingEnabled; // only enable drawing if it's allowed
  });

  mainContainer.addEventListener('mouseup', function () {
    isDrawing = false;
  });

  mainContainer.addEventListener('mouseleave', function () {
    isDrawing = false;
  });

  mainContainer.addEventListener('mousemove', function (event) {
    if (isDrawing) {
      const gridItem = event.target;
      if (isErasing) {
        gridItem.style.backgroundColor = 'white';
      } else {
        gridItem.style.backgroundColor = 'black';
      }
    }
});

  colorModeButton.addEventListener('click', function () {
    toggleDrawingEnabled();
  });

  // ERASER BUTTON
  eraserButton.addEventListener('click', function () {
    isErasing = !isErasing; // toggle eraser mode immediately
  });

  for (let i = 0; i < 16; i++) { // for looping 'i' for rows, 'j' for columns; 16x16 by default
    for (let j = 0; j < 16; j++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      mainContainer.appendChild(gridItem);

      gridItem.addEventListener('mousedown', function () {
        if (isDrawingEnabled) {
          isDrawing = true;
          const gridItem = event.target;
          if (isErasing) {
            gridItem.style.backgroundColor = 'white';
          } else {
          gridItem.style.backgroundColor = 'black';
        }
      }
    });

    gridItem.addEventListener('mouseenter', function (event) {
      if (isErasing && isDrawingEnabled) {
        const gridItem = event.target;
        gridItem.style.backgroundColor = 'white';
      }
    });
  }
}
  // RESET BUTTON
  resetButton.addEventListener('click', function () {
    isErasing = false;
    const gridItems = mainContainer.querySelectorAll('.grid-item');
    gridItems.forEach(function (gridItem) {
      gridItem.style.backgroundColor = 'white';
    });
    if (!isDrawingEnabled) {
      toggleDrawingEnabled(); // enable drawing after reset
    }
  });
});