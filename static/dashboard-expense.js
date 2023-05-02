'use strict';

import { getSession, insertSessionData } from './modules/utils.js';

const dateInput = document.querySelector('#expenseDate').children[0];
dateInput.valueAsDate = new Date();

const session = getSession();

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  // e.preventDefault();
  insertSessionData(form, session);
});
