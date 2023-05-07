'use strict';

import { createTable, createTableRow, isAdmin, toggleDisabledInput } from './modules/utils.js';

const tbody = document.querySelector('tbody');

const fetchData = async () => {
  const response = await fetch('http://127.0.0.1:5000/api/admin/all-users');
  const json = await response.json();

  console.table(json);

  createTable(json, tbody);

  tbody.addEventListener('click', (e) => {
    const target = e.target;
    const tr = target.parentNode.parentNode.parentNode.parentNode;

    switch (target.id) {
      case 'edit':
        toggleDisabledInput(tr, 'edit');
        break;
      case 'cancel':
        toggleDisabledInput(tr, 'cancel', json, tbody);
        break;
      case 'delete':
        break;
      default:
        break;
    }
  });
};

fetchData();

tbody.addEventListener('input', (e) => {
  const target = e.target;
  const tr = target.parentNode.parentNode;

  switch (target.name) {
    case 'first_name':
      tr.querySelector('form').children.first_name.value = target.value;
      break;
    case 'last_name':
      tr.querySelector('form').children.last_name.value = target.value;
      break;
    case 'family_name':
      tr.querySelector('form').children.family_name.value = target.value;
      break;
    default:
      break;
  }
});

tbody.addEventListener('change', (e) => {
  const target = e.target;
  const tr = target.parentNode.parentNode;

  if (target.name === 'family_role') tr.querySelector('form').children.family_role.value = target.value;
});
