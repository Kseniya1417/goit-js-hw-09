const dataStart = document.querySelector('[data-start]');
const dataStop = document.querySelector('[data-stop]');
const bodyBackground = document.querySelector('body');

dataStart.addEventListener('click', btnStart);
dataStop.addEventListener('click', btnStop);

let timerId = null;
dataStop.disabled = true;

function btnStart() {
  timerId = setInterval(getBackgroundColor, 1000);
  dataStart.disabled = true;
  dataStop.disabled = false;
}

function btnStop() {
  clearInterval(timerId);

  dataStart.disabled = false;
  dataStop.disabled = true;
}

function getBackgroundColor() {
  bodyBackground.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
