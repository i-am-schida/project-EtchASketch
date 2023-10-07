document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector('.main-container');
  const resetButton = document.querySelector('#reset-button');
  const eraserButton = document.querySelector('#eraser-button');
  let isErasing = false;


  for (let i = 0; i < 16; i++) { // for looping 'i' for rows, 'j' for columns
    for (let j = 0; j < 16; j++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      mainContainer.appendChild(gridItem);

      gridItem.addEventListener('mouseenter', function () {
        if (isErasing) {
          gridItem.style.backgroundColor = 'gray'; // erase by setting to gray
        } else {
          gridItem.style.backgroundColor = 'pink';
        }
      });
    }
  }
  resetButton.addEventListener('click', function () {
    const gridItems = mainContainer.querySelectorAll('.grid-item');
    gridItems.forEach(function (gridItem) {
      gridItem.style.backgroundColor = 'gray';
    });
  });
  eraserButton.addEventListener('click', function () {
    isErasing = !isErasing; // toggle eraser mode
  });
});