'use strict';

import { isEmpty, validEmail, validInput, validPassword, flashAlert } from './modules/utils.js';
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const alertError = document.querySelector('#alertError');

if (!alertError) {
  tl.from('nav', { y: '-100%' })
    .from('header', { y: '-125%' })
    .from('.card', { y: '-50%' })
    .from('.input', { y: '-100%', stagger: (index) => index / 12 })
    .from('#login', { y: '-100%', duration: 0.2 });
} else {
  tl.from('nav', { y: '-100%' })
    .from('header', { y: '-125%' })
    .from('#alertError', { y: '-100%' })
    .from('#email', { y: '-100%' })
    .from('#password', { y: '-100%' })
    .from('#login', { y: '-100%' });
}

const form = document.querySelector('form');
const emailContainer = document.querySelector('#email');
const passwordContainer = document.querySelector('#password');

const canSubmit = { email: { empty: true, valid: false }, password: { empty: true, valid: false } };

emailContainer.addEventListener('input', (e) => {
  const invalidFeedback = emailContainer.querySelector('.invalid-feedback');

  if (isEmpty(e.target)) return;
  canSubmit.email.empty = false;

  if (!validEmail(e.target, invalidFeedback)) return;

  validInput(e.target);
  canSubmit.email.valid = true;
});

passwordContainer.addEventListener('input', (e) => {
  const invalidFeedback = passwordContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  canSubmit.password.empty = false;

  if (!validPassword(e.target, invalidFeedback)) return;

  validInput(e.target);
  canSubmit.password.valid = true;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let canSubmitForm = false;
  const alert = form.querySelector('.alert-danger');

  if (canSubmit.email.empty || canSubmit.password.empty) return await flashAlert(alert, 'Please fill out the form');

  if (!canSubmit.email.valid || !canSubmit.password.valid) return await flashAlert(alert, 'Invalid credentials');

  const response = await fetch('http://127.0.0.1:5000/api/all-users');
  const json = await response.json();
  const jsonKeys = Object.keys(json);
  const emailInput = e.target.children.email.children.email;
  jsonKeys.forEach((key) => {
    if (json[key].email === emailInput.value) canSubmitForm = true;
  });

  if (!canSubmitForm) return await flashAlert(alert, 'Account does not exists');

  form.submit();
});
