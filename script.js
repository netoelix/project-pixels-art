const colorPalet = document.querySelectorAll('.color');

colorPalet[0].style.backgroundColor = 'blue';
colorPalet[1].style.backgroundColor = 'red';
colorPalet[2].style.backgroundColor = 'green';
colorPalet[3].style.backgroundColor = 'yellow';

const clearButton = document.getElementById('clear-board');
const newButton = document.createElement('button');
const newTextButton = document.createElement('p');
clearButton.appendChild(newButton);
newButton.appendChild(newTextButton);
newTextButton.innerText = 'Limpar';

const randomButton = document.getElementById('button-random-color');
const newRandomButton = document.createElement('button');
const newTextRandom = document.createElement('p');
randomButton.appendChild(newRandomButton);
newRandomButton.appendChild(newTextRandom);
newTextRandom.innerText = 'Cores aleatórias';

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


const findButton = document.getElementById('clear-board');
const clearPixel = () => {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
  localStorage.clear('pixelBoard');
};

findButton.addEventListener('click', clearPixel);

const findRandomButton = document.getElementById('button-random-color');

const randomColor = () => {
  for (let index = 0; index < colorPalet.length; index += 1) {
    const colorFirsth = Math.trunc(Math.random(256) * 100);
    const colorSecond = Math.trunc(Math.random(256) * 100);
    const colorThird = Math.trunc(Math.random(256) * 100);
    colorPalet[index].style.backgroundColor = `rgb(${colorFirsth}, ${colorSecond}, ${colorThird})`;
  }
};
findRandomButton.addEventListener('click', randomColor);

const saveDrawing = () => {
  const drawing = [];

  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];
    const color = getComputedStyle(pixel).backgroundColor;
    drawing.push({ index, color });
  }

  localStorage.setItem('pixelBoard', JSON.stringify(drawing));
};

const loadDrawing = () => {
  const savedDrawing = localStorage.getItem('pixelBoard');

  let drawing = [];

  if (savedDrawing) {
    drawing = JSON.parse(savedDrawing);
  } else {
    localStorage.setItem('pixelBoard', JSON.stringify(drawing));
  }

  for (let index = 0; index < drawing.length; index += 1) {
    const pixel = drawing[index];
    pixels[pixel.index].style.backgroundColor = pixel.color;
  }
};

pixels.forEach((colorBack) => {
  colorBack.addEventListener('click', () => {
    const pixelSelected = document.querySelector('.selected');
    const changeColor = getComputedStyle(pixelSelected).backgroundColor;
    colorBack.style.backgroundColor = changeColor;
    saveDrawing();
  });
});

window.addEventListener('DOMContentLoaded', loadDrawing);
