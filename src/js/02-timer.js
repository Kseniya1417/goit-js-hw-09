// npm instal
// додати import
// ініціалізували, тобто використали (у нас на input)
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//готуємо місце input, де ми будемо ініціалізувати нашу бібліотеку
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('[data-start]');
// пишемо ці змінні пока функцією щоб мати до них доступ з будь-якого місця в коді
// (до поточної дати, до обраної дати) бо вони нам будуть треба в інших функціях
// записуємо їх в let бо вони будуть змінюватись
let selectedDate = null;
let currentDate = null;
let timerId = null;

// з умови задачі взято: "Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому."
btnStart.disabled = true;

// беремо з умови задачі константу options
// onClose це стандартний метод нашої бібліотеки, він просто існує і ми маєм його якось модифікувати.
// Він підключається під час закриття елемента, звідси і його назва. Елемент - це календарик, який зявляється
// при кліку на input
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // onClose - це стандартний метод нашої бібліотеки він просто існує і ми маємо його якось модифікувати
  // параметр selectedDates - це масив дат
  // в консолі буде дата яку ви вибрали, тому і називається selectedDates (обрані дати -
  // можна вибирати період дат, тому тут масив, але він як масив нам зараз не потрібен)
  // нульовий, тобто перший елемент цього масиву - це наша обрана дата
  onClose(selectedDates) {
    console.log(selectedDates[0]); // як ця дата сюди потрапляє нас не цікавить, це робить бібліотека, але ми маємо доступ
    selectedDate = selectedDates[0];
    currentDate = new Date(); // в currentDate ми записуєм сьогоднішню дату за допомогою екземпляра класу new date
    // далі магія: як ми мажм визначити що наа дата в минулому
    // тепер ми маємо порівняти обрану дату з поточною датою якщо обрана дата (selectedDates) більша то
    // це значить що що вона в майбутньому
    if (selectedDate > currentDate) {
      btnStart.disabled = false;
    }
    // а якщо інакше то це минуле і ми показуюєм користувачу повідомлення з використанням бібліотеки, а можна ще alert
    // юзер попадає після того як знову вибрав, але вже правильну дату на рядок 44 і тоді кнопка стає активною
    else {
      Notify.warning('Please choose a date in the future');
    }
  },
};

// запускаєм flatpiker (бібліотека), взяли з умови задачі
flatpickr(input, options);

// вішаємо слухача на кнопку
btnStart.addEventListener('click', startTimer);

function startTimer() {
  btnStart.disabled = true;
  // для того щоб функція раз на секунду це змінювала ми використовуємо setInterval
  timerId = setInterval(() => {
    // сurrentDate краще задати ще раз бо може бути глюк, з 40 стрічки може не потягнути
    currentDate = new Date();
    //  для того щоб запустити таймер нам потрібно знайти різницю між оцими датами
    // потрібні константи зберігаються за межами тому тут ми маємо до них доступ
    // Різниця нам потрібна для того щоб знати на скільки (на яку різницю) нам запустити таймер
    // якщо різниця 1 день то таймер запуститься на 24 години, якщо більше - то на інше число
    const differenceTime = selectedDate.getTime() - currentDate.getTime();
    // треба зупиняти таймер яко він дійшов до нуля, ми ставимо перевірку (if)
    if (differenceTime > 0) {
      // ми маємо цю різницю differenceTime передати в функцію onvertMs
      // ця різниця передається у 87й рядок і ця функція нам допоможе
      // з цієї різниці виділити ці дні, години, хвилини і секунди
      // результат (return) функції convertMs ми отримуєм у наступному рядку
      // і зробили для нього константу
      const convertedTime = convertMs(differenceTime);
      // тепер треба заповнити таймер тими цифрами які нам прийшли
      // ми беремо змінні, які завбачливо підготували спочатку
      // використовуємо innerHTML щоб переписати вміст
      // спочатку функцію не викликаємо і з convertedTime беремо дні і записуємо в дні і т.д
      // коли ми згадуємо що внизу десь є функція яка дописує знаки, якщо їх менше 10
      // тому ми її тут викликаєм addZero. addZero - це функція, яка просто форматує
      days.innerHTML = addZero(convertedTime.days);
      hours.innerHTML = addZero(convertedTime.hours);
      minutes.innerHTML = addZero(convertedTime.minutes);
      seconds.innerHTML = addZero(convertedTime.seconds);
      // якщо різниця дат менша нуля то ми зупиняємо таймер, тоді ми дописуємо перед функцією
      // setInterval:timerId і пишемо вище його початкове значення ставимо null
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  // працює тільки з рядками, він заповнює рядок, якщо символів буде менше 2х то він допише спереду 1 нуль
  // функція addZero приймає значення, сюди у значення (value) прийде число бо функція convertMs повертає числа
  //  тому у (value) прийде число, а padstart працює з рядками тому ми маємо перетворити примусово те що ми
  // отримали value на string. Не треба ніяких if бо padstar сам розуміє що якщо символів 2 (наш перший аргумент)
  // і нема місця де втулити 0 він не втулить. Обов'язково треба return щоб він нам щось повернув
  return String(value).padStart(2);
}
