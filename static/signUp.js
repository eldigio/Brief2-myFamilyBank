'use strict';

import {
  flashAlert,
  isEmpty,
  validEmail,
  validFamilyName,
  validInput,
  validName,
  validPassword,
} from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const form = document.querySelector('form');
const firstNameContainer = document.querySelector('#firstName');
const lastNameContainer = document.querySelector('#lastName');
const emailContainer = document.querySelector('#email');
const passwordContainer = document.querySelector('#password');
const familyRoleContainer = document.querySelector('#familyRole');
const familyNameContainer = document.querySelector('#familyName');

tl.from('nav', { y: '-100%' })
  .from('header', { y: '-125%' })
  .from('.input', { y: '-100%', stagger: (index) => index / 10 })
  .from('#signUp', { y: '-100%' });

const canSubmit = {
  firstName: { empty: true, valid: false },
  lastName: { empty: true, valid: false },
  email: { empty: true, valid: false },
  password: { empty: true, valid: false },
  familyName: { empty: true, valid: false },
};

firstNameContainer.addEventListener('input', (e) => {
  const invalidFeedback = firstNameContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  canSubmit.firstName.empty = false;
  if (!validName(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.firstName.valid = true;
});

lastNameContainer.addEventListener('input', (e) => {
  const invalidFeedback = lastNameContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  canSubmit.lastName.empty = false;
  if (!validName(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.lastName.valid = true;
});

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

familyRoleContainer.addEventListener('change', (e) => {
  const invalidFeedback = familyRoleContainer.querySelector('.invalid-feedback');
});

familyNameContainer.addEventListener('input', (e) => {
  const invalidFeedback = familyNameContainer.querySelector('.invalid-feedback');
  if (isEmpty(e.target)) return;
  canSubmit.familyName.empty = false;
  if (!validFamilyName(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.familyName.valid = true;
});

form.addEventListener('submit', async (e) => {
  const alert = form.querySelector('.alert-danger');
  if (
    canSubmit.firstName.empty ||
    canSubmit.lastName.empty ||
    canSubmit.email.empty ||
    canSubmit.password.empty ||
    canSubmit.familyName.empty
  ) {
    e.preventDefault();
    flashAlert(alert, 'Please fill out the form');
    return;
  }
  if (
    !canSubmit.firstName.valid ||
    !canSubmit.lastName.valid ||
    !canSubmit.email.valid ||
    !canSubmit.password.valid ||
    !canSubmit.familyName.valid
  ) {
    e.preventDefault();
    flashAlert(alert, 'Invalid credentials');
    return;
  }
});
