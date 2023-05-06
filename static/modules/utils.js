export const sleep = (seconds) => new Promise((r) => setTimeout(r, seconds * 1000));

export const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export const getSession = () => {
  let session = {};
  return (session = {
    firstName: document.querySelector('[name="sessionFirstName"]').value,
    lastName: document.querySelector('[name="sessionLastName"]').value,
    email: document.querySelector('[name="sessionEmail"]').value,
    familyName: document.querySelector('[name="sessionFamilyName"]').value,
    familyRole: document.querySelector('[name="sessionFamilyRole"]').value,
  });
};

export const defaultInput = (input) => {
  input.classList.remove('is-valid');
  input.classList.remove('is-invalid');
};

export const invalidInput = (input, invalidFeedback, errorMex) => {
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  invalidFeedback.textContent = errorMex;
};

export const validInput = (input) => {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
};

export const validName = (name, invalidFeedback) => {
  if (name.value.match(/[0-9]/)) {
    invalidInput(name, invalidFeedback, 'Cannot contain numbers');
    return false;
  }
  return true;
};

export const isEmpty = (input) => {
  if (input.value === '') {
    defaultInput(input);
    return true;
  }
  return false;
};

export const validEmail = (email, invalidFeedback) => {
  if (!email.value.match(emailRegex)) {
    invalidInput(email, invalidFeedback, 'Invalid Email Address');
    return false;
  }
  return true;
};

export const validPassword = (password, invalidFeedback) => {
  if (password.value.length < 8) {
    invalidInput(password, invalidFeedback, 'Password must be more than 8 characters');
    return false;
  }
  if (password.value.length > 128) {
    invalidInput(password, invalidFeedback, 'Password must be less than 128 characters');
    return false;
  }
  if (!password.value.match(/[a-z]/)) {
    invalidInput(password, invalidFeedback, 'Password must contain a lowercase character');
    return false;
  }
  if (!password.value.match(/[A-Z]/)) {
    invalidInput(password, invalidFeedback, 'Password must contain a uppercase character');
    return false;
  }
  if (!password.value.match(/[0-9]/)) {
    invalidInput(password, invalidFeedback, 'Password must contain a number');
    return false;
  }
  if (!password.value.match(/(?![a-z0-9])\S/gi)) {
    invalidInput(password, invalidFeedback, 'Password must contain a special character');
    return false;
  }
  return true;
};

export const validFamilyName = (familyName, invalidFeedback) => {
  if (familyName.value.length < 4) {
    invalidInput(familyName, invalidFeedback, 'Family name must be more than 4 characters');
    return false;
  }
  if (familyName.value.length > 16) {
    invalidInput(familyName, invalidFeedback, 'Family name must be less than 16 characters');
    return false;
  }
  return true;
};

export const showAlert = async (alert, errorMessage, duration = 0.4) => {
  alert.classList.remove('d-none');
  alert.textContent = errorMessage;
  await gsap.fromTo('.alert-danger', { opacity: 0 }, { opacity: 1, duration, ease: 'power4.out' });
};

export const hideAlert = async (alert, duration = 0.4) => {
  await gsap.fromTo('.alert-danger', { opacity: 1 }, { opacity: 0, duration, ease: 'power4.out' });
  alert.textContent = '';
  alert.classList.add('d-none');
};

export const flashAlert = async (alert, errorMessage, sleepTime = 5) => {
  showAlert(alert, errorMessage);
  await sleep(sleepTime);
  hideAlert(alert);
};

export const toggleEditProfile = (btnEditProfile, resetDeleteContainer, position = 'beforeend') => {
  if (btnEditProfile.classList.contains('btn-secondary')) {
    btnEditProfile.classList.replace('btn-secondary', 'btn-outline-secondary');
    resetDeleteContainer.insertAdjacentHTML(
      position,
      `<button tye="submit" class="btn btn-outline-primary" id="saveProfile">Save Changes</button>`
    );
  } else {
    btnEditProfile.classList.replace('btn-outline-secondary', 'btn-secondary');
    resetDeleteContainer.children.saveProfile.remove();
  }
};

export const createFamilyHTML = (jsonData, key, jsonDataKeys, index) => {
  const html = `
  <div class="card rounded-4 p-3 shadow-lg border-info-subtle">
    <form action="/profile/family" method="post" class="d-flex flex-column gap-3">
      <!-- alert -->
      <div class="alert alert-danger alert-dismissible d-none" role="alert" id="alertDanger">
        Please fill out the form!
      </div>
      <!-- name -->
      <div class="row">
        <!-- firstName -->
        <div class="col-lg input">
          <div class="form-floating d-flex" id="firstName">
            <input type="text" class="form-control" id="floatingFirstName" placeholder="firstName"
              name="firstName" value="${jsonData[key].first_name}" autocomplete="off" required disabled />
            <label for="floatingFirstName">First Name</label>
            <div class="invalid-feedback"></div>
          </div>
        </div>
        <!-- lastName -->
        <div class="col-lg input">
          <div class="form-floating d-flex align-items-center" id="lastName">
            <input type="text" class="form-control" id="floatingLastName" placeholder="lastName"
              name="lastName" value="${jsonData[key].last_name}" autocomplete="off" required disabled />
            <label for="floatingLastName">Last Name</label>
            <div class="invalid-feedback"></div>
          </div>
        </div>
      </div>
      <!-- email -->
      <div class="form-floating input" id="email">
        <input type="email" class="form-control" id="floatingEmail" placeholder="email@example.com"
          name="email" value="${jsonData[key].email}" autocomplete="off" required disabled />
        <label for="floatingEmail">Email address</label>
        <div class="invalid-feedback"></div>
      </div>
      <!-- family -->
      <div class="row">
        <!-- name -->
        <div class="col-lg input">
          <div class="form-floating" id="familyName">
            <input type="text" class="form-control" id="floatingFamilyName" placeholder="familyName"
              name="familyName" value="${jsonData[key].family_name}" autocomplete="off" required readonly />
            <label for="floatingFamilyName">Family Name</label>
            <div class="invalid-feedback"></div>
          </div>
        </div>
        <!-- role -->
        <div class="col-lg input">
          <select class="form-select form-select-lg h-100" id="familyRole" name="familyRole" disabled>
            <option value="head" ${jsonData[key].family_role === 'head' ? 'selected' : ''}>Head</option>
            <option value="member" ${jsonData[key].family_role === 'member' ? 'selected' : ''}>Member</option>
          </select>
        </div>
      </div>
    </form>
  </div>
    ${index !== jsonDataKeys.length - 1 ? `<div class="border my-4" id="divider"></div>` : ``}
`;
  return html;
};

export const insertSessionData = (form, session) => {
  form.insertAdjacentHTML(
    'beforeend',
    `
    <input type="hidden" name="sessionFirstName" value="${session.firstName}" />
    <input type="hidden" name="sessionLastName" value="${session.lastName}" />
    <input type="hidden" name="sessionEmail" value="${session.email}" />
    <input type="hidden" name="sessionFamilyName" value="${session.familyName}" />
    <input type="hidden" name="sessionFamilyRole" value="${session.familyRole}" />
  `
  );
};

export const createWhitelist = (familyRole) => {
  let whitelist = [];
  if (familyRole === 'head') {
    whitelist = ['firstName', 'lastName', 'email', 'familyRole'];
  } else {
    whitelist = ['firstName', 'lastName', 'email'];
  }
  return whitelist;
};

export const getDayName = (dateString, locale = 'en-US') => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

export const getMonthName = (monthNumber) => {
  const months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString('en-US', { month: 'long' });
  });
  return months[monthNumber - 1];
};

export const getAllDaysInMonth = (year, month) => {
  const numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let index = daysIndex[new Date(year, month - 1, 1).toString().split(' ')[0]];
  let daysArray = [];

  for (let i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
    daysArray.push(daysInWeek[index++]);
    if (index == 7) index = 0;
  }

  const daysArrayLength = daysArray.length;

  const dayArray = Array.from({ length: daysArrayLength }, (_, i) => i + 1);

  return dayArray;
};

export const formatValue = (value) => {
  return value
    .replace(/,/g, ' ')
    .trim()
    .split(' ')
    .filter((elem, index, self) => index === self.indexOf(elem))[0];
};

export const getUniqueCategories = (jsonData) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  let categorySet = new Set();
  const categories = getUsersChartDataset(jsonData, currentYear, currentMonth).categories;
  categories.forEach((data) => {
    data.data.forEach((value) => {
      if (value !== '') categorySet.add(formatValue(value));
    });
  });
  return [...categorySet];
};

export const getUsersChartDataset = (jsonData, year, month) => {
  const amounts = [];
  const categories = [];
  jsonData.forEach((user, index) => {
    amounts.push({ label: user.first_name, data: new Array(31).fill(0) });
    categories.push({ label: user.first_name, data: new Array(31).fill('') });

    [...user.expenses].forEach((expense) => {
      const expenseYear = expense.date.split('-')[0] * 1;
      const expenseMonth = expense.date.split('-')[1] * 1;
      const expenseDay = expense.date.split('-')[2] * 1;
      if (month === expenseMonth && year === expenseYear) {
        amounts[index].data.length = getAllDaysInMonth(expenseYear, expenseMonth).length;
        categories[index].data.length = getAllDaysInMonth(expenseYear, expenseMonth).length;
        amounts[index].data[expenseDay - 1] += expense.amount * 1;
        categories[index].data[expenseDay - 1] += `${expense.category},`;
      }
    });
  });
  return { amounts, categories };
};

export const getPieChartDataset = (jsonData, year, month) => {
  const uniqueCategories = getUniqueCategories(jsonData);
  let dataset = new Object();

  uniqueCategories.forEach((category) => (dataset[category] = 0));

  jsonData.forEach((user) => {
    [...user.expenses].forEach((expense) => (dataset[expense.category] += expense.amount * 1));
  });

  return [{ data: Object.values(dataset) }];
};

export const createChart = (jsonData, session, type) => {
  const ctx = document.querySelector('#chart');
  const ctxPie = document.querySelector('#pie');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  let chart;

  switch (type) {
    case 'bar':
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: getAllDaysInMonth(currentYear, currentMonth),
          datasets: getUsersChartDataset(jsonData, currentYear, currentMonth).amounts,
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
                label: (context) => {
                  const NUMBER_FORMATTER = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });
                  return context.dataset.label + ': ' + NUMBER_FORMATTER.format(context.parsed.y);
                },
                footer: (context) => {
                  let categoryArr = [];
                  const categories = getUsersChartDataset(jsonData, currentYear, currentMonth).categories;
                  categories.forEach((data) => {
                    if (data.label === context[0].dataset.label) {
                      categoryArr.push(data.data[context[0].dataIndex].replace(/,/g, ' ').trim());
                    }
                  });

                  const value = categoryArr[0].split(' ').filter((elem, index, self) => index === self.indexOf(elem));
                  return value;
                },
              },
            },
          },
        },
      });
      break;
    case 'pie':
      chart = new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: getUniqueCategories(jsonData),
          datasets: getPieChartDataset(jsonData, currentYear, currentMonth),
        },
        responsive: true,
        options: {
          plugins: {
            title: {
              display: true,
              text: `${getMonthName(currentMonth)} ${currentYear}`,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const NUMBER_FORMATTER = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });
                  return 'Total: ' + NUMBER_FORMATTER.format(context.parsed);
                },
              },
            },
          },
        },
        plugins: {},
      });
      break;
  }

  return chart;
};

export const loadAnimationSignUp = (tl) => {};

export const loadAnimation = async (tl, name) => {
  switch (name) {
    case 'login':
      await tl
        .from('nav', { y: '-100%' })
        .from('header', { y: '-125%' })
        .from('.card', { y: '-50%' })
        .from('.input', { y: '-100%', stagger: (index) => index / 12 })
        .from('#login', { y: '-100%', duration: 0.2 });
      break;
    case 'login-error':
      await tl
        .from('nav', { y: '-100%' })
        .from('header', { y: '-125%' })
        .from('#alertError', { y: '-100%' })
        .from('#email', { y: '-100%' })
        .from('#password', { y: '-100%' })
        .from('#login', { y: '-100%' });
      break;
    case 'signup':
      await tl
        .from('nav', { y: '-100%' })
        .from('header', { y: '-125%' })
        .from('.input', { y: '-100%', stagger: (index) => index / 10 })
        .from('#signUp', { y: '-100%' });
      break;
    case 'dashboard':
      await tl
        .from('nav', { y: '-100%' })
        .from('.nav-element', { y: '-100%', stagger: 0.2 })
        .from('header', { y: '-100%' })
        .from('.card', { y: '-100%', stagger: 0.2 });
      break;
    case 'dashboard-profile':
      await tl
        .from('header', { y: '-100%' })
        .from('.list-group-item', { y: '-100%', stagger: 0.15 })
        .from('.btn-secondary', { y: '-100%' })
        .from('.card', { y: '-100%' })
        .from('.input', { y: '-100%', stagger: (index) => index / 12 })
        .from('.btn-outline-danger', { y: '-100%' });
      break;
    case 'dashboard-profile-edit':
      await tl
        .from('.btn-outline-secondary', { y: '-100%' })
        .from('.input', { y: '-100%', stagger: (index) => index / 12 })
        .from('.btn-outline-primary', { y: '-100%' })
        .from('.btn-outline-warning', { y: '-100%' })
        .from('.btn-outline-danger', { y: '-100%' });
      break;
    case 'dashboard-profile-reload':
      await tl
        .from('.btn-secondary', { y: '-100%' })
        .from('.input', { y: '-100%', stagger: (index) => index / 12 })
        .from('.btn-outline-warning', { y: '-100%' })
        .from('.btn-outline-danger', { y: '-100%' });
      break;
    case 'dashboard-family':
      await tl
        .from('header', { y: '-100%' })
        .from('.card', { y: '-100%' })
        .from('#divider', { y: '-100%' })
        .from('.input', { y: '-100%', stagger: (index) => index / 12 });
      break;
    case 'dashboard-family-edit':
      await tl
        .from('.input', { y: '-100%', stagger: (index) => index / 12 })
        .from('.btn-outline-secondary', { y: '-100%' })
        .from('.btn-outline-primary', { y: '-100%' });
      break;
    case 'dashboard-family-reload':
      await tl.from('.input', { y: '-100%', stagger: (index) => index / 12 }).from('.btn-secondary', { y: '-100%' });
      break;
    case 'dashboard-expense':
      await tl
        .from('header', { y: '-100%' })
        .from('.card', { y: '-100%' })
        .from('.input', { y: '-100%', stagger: (index) => index / 12 })
        .from('.btn-outline-secondary', { y: '-100%' })
        .from('.btn-outline-primary', { y: '-100%' });
      break;
  }
};

export const errorAnimationLogin = (tl) => {};

export const all = (obj, key) => {
  return Object.values(obj).every((prop) => prop[key]);
};

export const allDisabled = (inputs, whitelist) => {
  inputs.forEach((input) => {
    if (whitelist.some((value) => input.name.includes(value))) {
      if (input.name !== 'familyName') input.toggleAttribute('disabled');
    }
  });
};

export const setNavData = (session) => {
  document.querySelector('svg').setAttribute('data-jdenticon-value', session.firstName);
  document.querySelector('#familyNameNav').textContent = session.familyName;
  document.querySelector('#familyRoleNav').textContent = session.familyRole;
};

export const setInputsData = (session) => {
  document.querySelector('input#floatingFirstName').value = session.firstName;
  document.querySelector('input#floatingLastName').value = session.lastName;
  document.querySelector('input#floatingEmail').value = session.email;
  document.querySelector('input#floatingFamilyName').value = session.familyName;
};

export const isAdmin = async (user, passwd) => {
  const userInput = user.children.email.value;
  const passwdInput = passwd.children.passwd.value;

  const response = await fetch('http://127.0.0.1:5000/api/all-admins');
  const json = await response.json();

  return json.some((admin) => admin.user === userInput && admin.passwd === passwdInput);
};

export const createTableRow = (user) => {
  const tr = document.createElement('tr');
  const tdId = document.createElement('td');
  tdId.textContent = user.id;
  tdId.classList = 'text-truncate';
  tdId.style.maxWidth = '8ch';
  const tdFirstName = document.createElement('td');
  tdFirstName.textContent = user.first_name;
  tdFirstName.classList = 'text-truncate';
  tdFirstName.style.maxWidth = '8ch';
  const tdLastName = document.createElement('td');
  tdLastName.textContent = user.last_name;
  tdLastName.classList = 'text-truncate';
  tdLastName.style.maxWidth = '8ch';
  const tdEmail = document.createElement('td');
  tdEmail.textContent = user.email;
  tdEmail.classList = 'text-truncate';
  tdEmail.style.maxWidth = '16ch';
  const tdFamilyRole = document.createElement('td');
  tdFamilyRole.textContent = user.family_role;
  const tdFamilyName = document.createElement('td');
  tdFamilyName.textContent = user.family_name;
  tdFamilyName.classList = 'text-truncate';
  tdFamilyName.style.maxWidth = '8ch';
  const tdUpdate = document.createElement('td');
  tdUpdate.insertAdjacentHTML('afterbegin', `<i class="bi bi-pen btn btn-outline-warning"></i>`);
  const tdDelete = document.createElement('td');
  tdDelete.insertAdjacentHTML('afterbegin', `<i class="bi bi-trash3 btn btn-outline-danger"></i>`);

  tr.append(tdId, tdFirstName, tdLastName, tdEmail, tdFamilyRole, tdFamilyName, tdUpdate, tdDelete);

  return tr;
};
