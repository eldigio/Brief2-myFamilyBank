'use strict';

import { all, flashAlert, isAdmin, isEmpty, showAlert, validInput } from './modules/utils.js';

const canSubmit = { user: { empty: true, value: '' }, password: { empty: true, value: '' } };

const fetchData = async () => {
  const form = document.querySelector('form');

  form.addEventListener('input', async (e) => {
    const target = e.target;
    const invalidFeedback = target.nextElementSibling.nextElementSibling;

    switch (target.name) {
      case 'user':
        if (isEmpty(target)) return;
        canSubmit.user.empty = false;

        canSubmit.user.value = target.value;
        validInput(target);
        break;
      case 'passwd':
        if (isEmpty(target)) return;
        canSubmit.password.empty = false;

        canSubmit.password.value = target.value;
        validInput(target);
        break;
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let canSubmitForm = false;
    const alert = form.querySelector('.alert-danger');

    if (all(canSubmit, 'empty')) return await flashAlert(alert, 'Please fill out the form');

    const response = await fetch('http://127.0.0.1:5000/api/all-admins');
    const json = await response.json();

    console.table(json);
    const admin = await isAdmin(canSubmit.user.value, canSubmit.password.value);
    console.log(admin);

    if (!admin) return await flashAlert(alert, 'Invalid credentials', 60);

    form.submit();
  });
};

fetchData();
