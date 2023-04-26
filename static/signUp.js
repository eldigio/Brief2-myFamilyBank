'use strict';

import {
  animateCSS,
  isEmpty,
  sleep,
  validEmail,
  validFamilyName,
  validInput,
  validName,
  validPassword,
} from './modules/utils.js';

const form = document.querySelector('form');
const firstNameContainer = document.querySelector('#firstName');
const lastNameContainer = document.querySelector('#lastName');
const emailContainer = document.querySelector('#email');
const passwordContainer = document.querySelector('#password');
const familyRoleContainer = document.querySelector('#familyRole');
const familyNameContainer = document.querySelector('#familyName');

const canSubmit = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  familyName: false,
};

form.addEventListener('submit', async (e) => {
  if (
    !canSubmit.firstName ||
    !canSubmit.lastName ||
    !canSubmit.email ||
    !canSubmit.password ||
    !canSubmit.familyName
  ) {
    e.preventDefault();
    animateCSS('#alertDanger', 'fadeIn');
    await sleep(5);
    animateCSS('#alertDanger', 'fadeOut');
    return;
  }
});

firstNameContainer.addEventListener('input', (e) => {
  const invalidFeedback = firstNameContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  if (!validName(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.firstName = true;
});

lastNameContainer.addEventListener('input', (e) => {
  const invalidFeedback = lastNameContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  if (!validName(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.lastName = true;
});

emailContainer.addEventListener('input', (e) => {
  const invalidFeedback = emailContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  if (!validEmail(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.email = true;
});

passwordContainer.addEventListener('input', (e) => {
  const invalidFeedback = passwordContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  if (!validPassword(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.password = true;
});

familyRoleContainer.addEventListener('change', (e) => {
  const invalidFeedback =
    familyRoleContainer.querySelector('.invalid-feedback');
  console.log(e.target.value);
});

familyNameContainer.addEventListener('input', (e) => {
  const invalidFeedback =
    familyNameContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  if (!validFamilyName(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.familyName = true;
});
