'use strict';

import { all, flashAlert, isEmpty, isValid, loadAnimation, validInput } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const form = document.querySelector('form');
const firstNameContainer = document.querySelector('#firstName');
const lastNameContainer = document.querySelector('#lastName');
const emailContainer = document.querySelector('#email');
const passwordContainer = document.querySelector('#password');
const familyRoleContainer = document.querySelector('#familyRole');
const familyNameContainer = document.querySelector('#familyName');

loadAnimation(tl, 'signup');

const canSubmit = {
  firstName: { empty: true, valid: false },
  lastName: { empty: true, valid: false },
  email: { empty: true, valid: false },
  password: { empty: true, valid: false },
  familyName: { empty: true, valid: false },
};

// firstNameContainer.addEventListener('input', (e) => {
//   const invalidFeedback = firstNameContainer.querySelector('.invalid-feedback');

//   if (isEmpty(e.target)) return;
//   canSubmit.firstName.empty = false;

//   if (!validName(e.target, invalidFeedback)) return;

//   validInput(e.target);
//   canSubmit.firstName.valid = true;
// });

// lastNameContainer.addEventListener('input', (e) => {
//   const invalidFeedback = lastNameContainer.querySelector('.invalid-feedback');

//   if (isEmpty(e.target)) return;
//   canSubmit.lastName.empty = false;

//   if (!validName(e.target, invalidFeedback)) return;

//   validInput(e.target);
//   canSubmit.lastName.valid = true;
// });

// emailContainer.addEventListener('input', (e) => {
//   const invalidFeedback = emailContainer.querySelector('.invalid-feedback');

//   if (isEmpty(e.target)) return;
//   canSubmit.email.empty = false;

//   if (!validEmail(e.target, invalidFeedback)) return;

//   validInput(e.target);
//   canSubmit.email.valid = true;
// });

// passwordContainer.addEventListener('input', (e) => {
//   const invalidFeedback = passwordContainer.querySelector('.invalid-feedback');

//   if (isEmpty(e.target)) return;
//   canSubmit.password.empty = false;

//   if (!validPassword(e.target, invalidFeedback)) return;

//   validInput(e.target);
//   canSubmit.password.valid = true;
// });

// familyRoleContainer.addEventListener('change', (e) => {
//   const invalidFeedback = familyRoleContainer.querySelector('.invalid-feedback');
// });

// familyNameContainer.addEventListener('input', (e) => {
//   const invalidFeedback = familyNameContainer.querySelector('.invalid-feedback');

//   if (isEmpty(e.target)) return;
//   canSubmit.familyName.empty = false;

//   if (!validFamilyName(e.target, invalidFeedback)) return;

//   validInput(e.target);
//   canSubmit.familyName.valid = true;
// });

form.addEventListener('input', (e) => {
  const target = e.target;
  const invalidFeedback = e.target.nextElementSibling.nextElementSibling;

  switch (target.name) {
    case 'first_name':
      if (isEmpty(target)) return;
      canSubmit.firstName.empty = false;

      if (!isValid(target, invalidFeedback, 'name')) return;

      validInput(target);
      canSubmit.firstName.valid = true;
      break;
    case 'last_name':
      if (isEmpty(target)) return;
      canSubmit.lastName.empty = false;

      if (!isValid(target, invalidFeedback, 'name')) return;

      validInput(target);
      canSubmit.lastName.valid = true;
      break;
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
    case 'family_name':
      if (isEmpty(target)) return;
      canSubmit.familyName.empty = false;

      if (!isValid(target, invalidFeedback, 'familyName')) return;

      validInput(target);
      canSubmit.familyName.valid = true;
      break;
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const alert = form.querySelector('.alert-danger');

  if (all(canSubmit, 'empty')) return await flashAlert(alert, 'Please fill out the form');

  if (!all(canSubmit, 'valid')) return await flashAlert(alert, 'Invalid form data');

  form.submit();
});
