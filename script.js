const colorPalet = document.querySelectorAll('.color');

colorPalet[0].style.backgroundColor = 'blue';
colorPalet[1].style.backgroundColor = 'red';
colorPalet[2].style.backgroundColor = 'green';
colorPalet[3].style.backgroundColor = 'yellow';

const creatPixel = () => {
  for (let index = 0; index < 25; index += 1) {
    const pixelPainel = document.getElementById('pixel-board');
    const newElementPixel = document.createElement('div');
    newElementPixel.className = 'pixel';
    pixelPainel.appendChild(newElementPixel);
  }
};
creatPixel();

const colorChose = document.querySelectorAll('.color');

colorChose.forEach((color) => {
  color.addEventListener('click', () => {
    colorChose.forEach((item) => {
      item.classList.remove('selected');
    });
    color.classList.add('selected');
  });
});

const pixels = document.querySelectorAll('.pixel');

pixels.forEach((colorBack) => {
  colorBack.addEventListener('click', () => {
    const pixelSelected = document.querySelector('.selected');
    const changeColor = getComputedStyle(pixelSelected).backgroundColor;
    colorBack.style.backgroundColor = changeColor;
  });
});
