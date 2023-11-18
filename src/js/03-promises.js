import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  button: document.querySelector ("button"),
  fields: document.getElementsByTagName ("input")
}

refs.button.addEventListener("click", (e) => {
  e.preventDefault ();
  let field1 = +refs.fields [0].value;
  let field2 = +refs.fields [1].value;
  let field3 = +refs.fields [2].value;
  createPromises (field1, field2, field3)
});

function createPromises (first, step, amount) {
  if (!Number.isInteger (first) || !Number.isInteger (step) || !Number.isInteger (amount) || first < 0 || step < 0 || amount <= 0) return;
  let delay = first;
  setTimeout (() => {
    createPromise(1, delay)
        .then(value => {
          Notify.success(value);
        })
        .catch(error => {
          Notify.failure(error);
        })
    if (amount == 1) return;
    let counter = 2;
    let timerId = setInterval (()=> {
      delay += step;
      createPromise(counter, delay)
        .then(value => {
          Notify.success(value);
        })
        .catch(error => {
          Notify.failure(error);
        })
      counter++;
      if (counter > amount) clearInterval(timerId)
    }, step)
  }, delay
  )
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(`Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`Rejected promise ${position} in ${delay}ms`);
    }
  });
}
