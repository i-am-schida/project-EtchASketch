document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector('.main-container');

  for (let i = 0; i < 16; i++) { // for looping 'i' for rows, 'j' for columns
    for (let j = 0; j < 16; j++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      mainContainer.appendChild(gridItem);
    }
  }
});