'use strict';

import { getSession } from './modules/utils.js';

const dateInput = document.querySelector('#expenseDate').children[0];
dateInput.valueAsDate = new Date();

const session = getSession();

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  // e.preventDefault();
  form.insertAdjacentHTML(
    'beforeend',
    `
    <input type="hidden" name="firstName" value="${session.firstName}" />
    <input type="hidden" name="lastName" value="${session.lastName}" />
    <input type="hidden" name="email" value="${session.email}" />
    <input type="hidden" name="familyName" value="${session.familyName}" />
    <input type="hidden" name="familyRole" value="${session.familyRole}" />
  `
  );
});
