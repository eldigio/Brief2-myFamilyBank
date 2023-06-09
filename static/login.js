'use strict';

import { all, flashAlert, isEmpty, isValid, loadAnimation, validInput } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const alertError = document.querySelector('#alertError');

!alertError ? loadAnimation(tl, 'login') : loadAnimation(tl, 'login-error');

const form = document.querySelector('form');
const emailContainer = document.querySelector('#email');
const passwordContainer = document.querySelector('#password');

const canSubmit = { email: { empty: true, valid: false }, password: { empty: true, valid: false } };

form.addEventListener('input', (e) => {
  const target = e.target;
  const invalidFeedback = target.nextElementSibling.nextElementSibling;

  switch (target.name) {
    case 'email':
      if (isEmpty(target)) return;
      canSubmit.email.empty = false;

      if (!isValid(target, invalidFeedback, 'email')) return;

      validInput(target);
      canSubmit.email.valid = true;
      break;
    case 'passwd':
      if (isEmpty(target)) return;
      canSubmit.password.empty = false;

      if (!isValid(target, invalidFeedback, 'password')) return;

      validInput(target);
      canSubmit.password.valid = true;
      break;
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let canSubmitForm = false;
  const alert = form.querySelector('.alert-danger');

  if (all(canSubmit, 'empty')) return await flashAlert(alert, 'Please fill out the form');

  if (!all(canSubmit, 'valid')) return await flashAlert(alert, 'Invalid credentials');

  const response = await fetch('http://127.0.0.1:5000/api/all-users');
  const json = await response.json();
  const jsonKeys = Object.keys(json);
  const emailInput = emailContainer.children.email;
  jsonKeys.forEach((key) => {
    if (json[key].email === emailInput.value) canSubmitForm = true;
  });

  if (!canSubmitForm) return await flashAlert(alert, 'Account does not exists');

  form.submit();
});
