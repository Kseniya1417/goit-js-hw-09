import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

timer.style.height = '20px';
timer.style.display = 'grid';
timer.style.gridTemplateColumns = '50px 50px 70px 70px';
timer.style.textAlign = 'center';
timer.style.justifyContent = 'center';

let selectedDate = null;
let currentDate = null;
let timerId = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    currentDate = new Date();
    if (selectedDate > currentDate) {
      btnStart.disabled = false;
    } else {
      Notify.warning('Please choose a date in the future');
    }
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', startTimer);

function startTimer() {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    currentDate = new Date();
    const differenceTime = selectedDate.getTime() - currentDate.getTime();
    if (differenceTime > 0) {
      const convertedTime = convertMs(differenceTime);
      days.innerHTML = addZero(convertedTime.days);
      hours.innerHTML = addZero(convertedTime.hours);
      minutes.innerHTML = addZero(convertedTime.minutes);
      seconds.innerHTML = addZero(convertedTime.seconds);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return String(value).padStart(2);
}
