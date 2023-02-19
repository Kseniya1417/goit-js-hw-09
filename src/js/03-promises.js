import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('[name="delay"]');
const stepDelay = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');

// у цій функції проміс створюється 1 раз,
// один єдиний проміс, який називається new Promise, але з затримкою
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  // ми маємо створити проміс, подивились по конспекту що проміс створюється отак:
  // return має бути бо ця функція має нам щось повертати
  return new Promise((resolve, reject) => {
    // timeout це затримка, для кожного промісу вона буде своя
    setTimeout(() => {
      // у timeout ставимо if і його заповнюєм
      if (shouldResolve) {
        // якщо у нас проміс resolve то ми як результат повертаєм
        // position - це номер промісу і delay - це затримка
        // бо так є в умові що значенням promis має бути об'єкт
        // в якому будуть властивості position, delay
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
form.addEventListener('submit', onFormSubmit);

// функція приймає event бо ми працюєм з подією
function onFormSubmit(event) {
  // стандартна поведінка браузера при submit перегрузити сторінку
  // нам це не потрібно тому ставим
  event.preventDefault();
  // щоб робити щось із значеннями input ми повинні їх спочатку повитягувати
  // переробляємо в Number бо з input приходить string
  // робимо число з першого, другого і третього inputa
  let delay = Number(firstDelay.value);
  const step = Number(stepDelay.value);
  const amount = Number(amountInput.value);
  // нам потрібно зробити стільки промісів скільки написано у значенні input amount
  // тобто amount разів
  // потрібна дія, яка виконується багато разів
  // якщо у нас однотипна дія, яка виконується багато разів
  // значить нам треба цикл
  // але тут немає ні об'єкти ні масива щоб використати цикли forEach
  // тому тут підходить простенький for
  // у цьому циклі має викликатися функція createPromise, яка створює проміс
  // нам треба передати у цю функцію затримку і номер промісу
  // номер промісу ми можемо взяти з ітерацій циклу через for
  // на першому циклі ми створимо перший проміс, на другому - другий і т.д
  // номер промісу ми можемо взяти з "і"
  for (let i = 1; i <= amount; i += 1) {
    // в цьому циклі викликаємо іункцію яка створює проміси, вона є готова у завданні
    // ми створили проміс, після того як він або resolve або reject
    // ми попадаємо у then
    createPromise(i, delay)
      // then як ланцюжок будується - після того як ми створили проміс
      // і він відпрацював
      // then приймає position, delay
      // і виводить оце повідомлення за допомогою бібліотеки
      // це результат оброблення промісу, після промісу у нас завжди буде then або catch
      // якщо позитивний результат то then якщо негативний тоc catch
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
