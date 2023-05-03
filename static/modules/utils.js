export const sleep = (seconds) => new Promise((r) => setTimeout(r, seconds * 1000));

export const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export const duration = 0.5;

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

export const showAlert = async (alert, errorMessage) => {
  alert.classList.remove('d-none');
  alert.textContent = errorMessage;
  await gsap.fromTo('.alert-danger', { opacity: 0 }, { opacity: 1, duration, ease: 'power4.out' });
};

export const hideAlert = async (alert) => {
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
    <form action="/profile/family" method="post" class="d-flex flex-column gap-3">
      <!-- alert -->
      <div class="alert alert-danger alert-dismissible d-none" role="alert" id="alertDanger">
        Please fill out the form!
      </div>
      <!-- name -->
      <div class="row">
        <!-- firstName -->
        <div class="col-md">
          <div class="form-floating d-flex" id="firstName">
            <input type="text" class="form-control" id="floatingFirstName" placeholder="firstName"
              name="firstName" value="${jsonData[key].first_name}" autocomplete="off" required disabled />
            <label for="floatingFirstName">First Name</label>
            <div class="invalid-feedback"></div>
          </div>
        </div>
        <!-- lastName -->
        <div class="col-md">
          <div class="form-floating d-flex align-items-center" id="lastName">
            <input type="text" class="form-control" id="floatingLastName" placeholder="lastName"
              name="lastName" value="${jsonData[key].last_name}" autocomplete="off" required disabled />
            <label for="floatingLastName">Last Name</label>
            <div class="invalid-feedback"></div>
          </div>
        </div>
      </div>
      <!-- email -->
      <div class="form-floating" id="email">
        <input type="email" class="form-control" id="floatingEmail" placeholder="email@example.com"
          name="email" value="${jsonData[key].email}" autocomplete="off" required disabled />
        <label for="floatingEmail">Email address</label>
        <div class="invalid-feedback"></div>
      </div>
      <!-- family -->
      <div class="row">
        <!-- name -->
        <div class="col-md">
          <div class="form-floating" id="familyName">
            <input type="text" class="form-control" id="floatingFamilyName" placeholder="familyName"
              name="familyName" value="${jsonData[key].family_name}" autocomplete="off" required readonly />
            <label for="floatingFamilyName">Family Name</label>
            <div class="invalid-feedback"></div>
          </div>
        </div>
        <!-- role -->
        <div class="col-md">
          <select class="form-select form-select-lg h-100" id="familyRole" name="familyRole" disabled>
            <option value="head" ${jsonData[key].family_role === 'head' ? 'selected' : ''}>Head</option>
            <option value="member" ${jsonData[key].family_role === 'member' ? 'selected' : ''}>Member</option>
          </select>
        </div>
      </div>
    </form>
    ${index !== jsonDataKeys.length - 1 ? `<div class="border my-4"></div>` : ``}
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

export const jsonToObject = (jsonData) => {
  let data = [];
  const jsonDataKeys = Object.keys(jsonData);
  jsonDataKeys.forEach((key, index) => {
    data.push({
      amount: jsonData[key].amount,
      date: jsonData[key].date,
      familyName: jsonData[key].family_name,
      firstName: jsonData[key].first_name,
      lastName: jsonData[key].last_name,
    });
  });
  return data;
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

export const getUsersChartDataset = (jsonData, sessionFirstName, sessionLastName, year, month) => {
  const datasets = [];
  jsonData.forEach((user, index) => {
    datasets.push({ label: user.first_name, data: new Array(31).fill(0) });

    // if (user.first_name === sessionFirstName && user.last_name === sessionLastName) {
    [...user.amount].forEach((amount) => {
      const expenseYear = amount.date.split('-')[0] * 1;
      const expenseMonth = amount.date.split('-')[1] * 1;
      const expenseDay = amount.date.split('-')[2] * 1;
      if (month === expenseMonth && year === expenseYear) {
        datasets[index].data.length = getAllDaysInMonth(expenseYear, expenseMonth).length;
        datasets[index].data[expenseDay - 1] += amount.amount * 1;
      }
    });
    // }
  });
  return datasets /*.filter((dataset) => dataset.label === sessionFirstName)*/;
};
