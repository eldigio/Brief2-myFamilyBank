'use strict';

import { createTable, createTableRow, isAdmin, toggleDisabledInput } from './modules/utils.js';

const tbodyUsers = document.querySelector('#users tbody');
const tbodyExpenses = document.querySelector('#expenses tbody');

const fetchData = async () => {
  const response = await fetch('http://127.0.0.1:5000/api/admin/all-users');
  const json = await response.json();

  createTable(json, tbodyUsers, 'users');

  const transformedJson = json.flatMap(({ id, first_name, last_name, expenses, date }) =>
    expenses.map(({ category, amount, date }) => ({ id, first_name, last_name, category, amount, date }))
  );

  createTable(transformedJson, tbodyExpenses, 'expenses');

  tbodyUsers.addEventListener('click', (e) => {
    const target = e.target;
    const tr = target.parentNode.parentNode.parentNode.parentNode;

    switch (target.id) {
      case 'edit':
        toggleDisabledInput(tr, 'edit', tbodyUsers.parentNode);
        break;
      case 'cancel':
        createTable(json, tbodyUsers, 'users');
        break;
      default:
        break;
    }
  });

  tbodyExpenses.addEventListener('click', (e) => {
    const target = e.target;
    const tr = target.parentNode.parentNode.parentNode.parentNode;

    switch (target.id) {
      case 'edit':
        toggleDisabledInput(tr, 'edit', tbodyExpenses.parentNode);
        break;
      case 'cancel':
        createTable(transformedJson, tbodyExpenses, 'expenses');
        break;
      default:
        break;
    }
  });
};

fetchData();

tbodyUsers.addEventListener('input', (e) => {
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

tbodyUsers.addEventListener('change', (e) => {
  const target = e.target;
  const tr = target.parentNode.parentNode;

  if (target.name === 'family_role') tr.querySelector('form').children.family_role.value = target.value;
});

tbodyExpenses.addEventListener('input', (e) => {
  const target = e.target;
  const tr = target.parentNode.parentNode;

  switch (target.name) {
    case 'first_name':
      tr.querySelector('form').children.first_name.value = target.value;
      break;
    case 'last_name':
      tr.querySelector('form').children.last_name.value = target.value;
      break;
    case 'category':
      tr.querySelector('form').children.category.value = target.value;
      break;
    case 'amounts':
      tr.querySelector('form').children.amount.value = target.value;
      break;
    case 'date':
      tr.querySelector('form').children.date.value = target.value;
      break;
    default:
      break;
  }
});
