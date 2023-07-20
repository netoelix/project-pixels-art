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

const changeButtonSize = document.getElementById('generate-board');

const creatPixel = (number) => {
  const pixelPainel = document.getElementById('pixel-board');
  const newNumber = number * number;
  pixelPainel.style.width = `${number * 42}px`;

  const pixelsToRemove = pixelPainel.querySelectorAll('.pixel');
  pixelsToRemove.forEach((pixel) => {
    pixelPainel.removeChild(pixel);
  });

  for (let index = 0; index < newNumber; index += 1) {
    const newElementPixel = document.createElement('div');
    newElementPixel.className = 'pixel';
    pixelPainel.appendChild(newElementPixel);
  }
};
creatPixel(5);

const colorChose = document.querySelectorAll('.color');
let selectedColor = null;

colorChose.forEach((color) => {
  color.addEventListener('click', () => {
    colorChose.forEach((item) => {
      item.classList.remove('selected');
    });
    color.classList.add('selected');
    selectedColor = color;
  });
});

const pixels = document.querySelectorAll('.pixel');

const savePixelColor = (pixel) => {
  const pixelColor = getComputedStyle(selectedColor).backgroundColor;
  pixel.style.backgroundColor = pixelColor;
};

pixels.forEach((pixel) => {
  pixel.addEventListener('click', () => {
    if (selectedColor !== null) {
      savePixelColor(pixel);
      saveDrawing();
    }
  });
});

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

window.addEventListener('DOMContentLoaded', loadDrawing);

const sizeBox = () => {
  const changeSizeBox = document.getElementById('board-size');
  const inputValue = parseInt(changeSizeBox.value, 10);

  if (isNaN(inputValue)) {
    alert('Board inválido!');
    return;
  }

  const clampedValue = clamp(inputValue, 5, 50);
  creatPixel(clampedValue);
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);


changeButtonSize.addEventListener('click', sizeBox);
