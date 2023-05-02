'use strict';

import { getAllDaysInMonth, getDayName, getMonthName, getSession, getUsersChartDataset } from './modules/utils.js';

const session = getSession();

const fetchData = async () => {
  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = Object.values(await response.json());

  const jsonDataKeys = Object.keys(jsonData);
  const dropdown = document.querySelector('#dropdown');
  const familyNameNav = document.querySelector('#familyNameNav');
  const familyRoleNav = document.querySelector('#familyRoleNav');
  jsonDataKeys.forEach((key) => {
    dropdown.textContent = jsonData[key].first_name;
    familyNameNav.textContent = jsonData[key].family_name;
    familyRoleNav.textContent = jsonData[key].family_role;
  });

  const ctx = document.querySelector('#chart');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: getUsersChartDataset(jsonData, session.firstName, session.lastName, currentYear, currentMonth),
      labels: getAllDaysInMonth(currentYear, currentMonth),
    },
    responsive: true,
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      plugins: {
        title: {
          display: true,
          text: `${getMonthName(currentMonth)} ${currentYear}`,
        },
        tooltip: {
          callbacks: {
            title: (day) => {
              const currentDay = day[0].label;
              return `${getDayName(`${currentYear}-${currentMonth}-${currentDay}`)}`;
            },
          },
        },
      },
    },
  });

  // console.log(Object.keys(Chart));
  // console.log(Chart.defaults);
};
fetchData();
