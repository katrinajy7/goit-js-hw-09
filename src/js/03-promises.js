import { Notify } from 'notiflix/build/notiflix-aio';

const refs = {
  form: document.querySelector('form.form'),
  delay: document.querySelector("input[name='delay']"),
  step: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
};

const { form, delay, step, amount } = refs;

form.addEventListener('submit', promiseGenerator);

function promiseGenerator(event) {
  event.preventDefault();
  let delayValue= Number(delay.value);
  for (let positionValue = 1; positionValue <= amount.value; positionValue++) {
    createPromise(positionValue, delayValue)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })

    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);;
    });
  
  delayValue += Number(step.value);
  }
}



function createPromise(position, delay) {
  return new Promise((resolve, reject) => { 
  //Math.random() generates a random # from 0.1 - 0.9999 but its never gonna reach 1 or 0
  const shouldResolve = Math.random() > 0.3;
 setTimeout(() => {
 if (shouldResolve) {
  // Fulfill
    resolve({ position, delay });
    } else {
  //Reject
   reject({ position, delay });
  }
  }, delay);
});
}
  
