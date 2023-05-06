'use strict';

import { createTableRow } from './modules/utils.js';

const fetchData = async () => {
  const response = await fetch('http://127.0.0.1:5000/api/admin/all-users');
  const json = await response.json();

  console.table(json);

  const table = document.querySelector('table.table');
  const tbody = document.querySelector('tbody');

  json.forEach((user) => {
    const tr = createTableRow(user);
    tbody.appendChild(tr);
  });
};

fetchData();
