'use strict';

import { createWhitelist, getSession, insertSessionData, toggleEditProfile } from './modules/utils.js';

const session = getSession();
console.log(session);

const fetchData = async () => {
  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = await response.json();

  const jsonDataKeys = Object.keys(jsonData);
  const dropdown = document.querySelector('#dropdown');
  const firstNameInput = document.querySelector('input#floatingFirstName');
  const lastNameInput = document.querySelector('input#floatingLastName');
  const emailInput = document.querySelector('input#floatingEmail');
  const familyNameInput = document.querySelector('input#floatingFamilyName');
  const familyNameNav = document.querySelector('#familyNameNav');
  const familyRoleNav = document.querySelector('#familyRoleNav');
  jsonDataKeys.forEach((key) => {
    dropdown.textContent = jsonData[key].first_name;
    firstNameInput.value = jsonData[key].first_name;
    lastNameInput.value = jsonData[key].last_name;
    emailInput.value = jsonData[key].email;
    familyNameInput.value = jsonData[key].family_name;
    familyNameNav.textContent = jsonData[key].family_name;
    familyRoleNav.textContent = jsonData[key].family_role;
  });
};

fetchData();

const btnEditProfile = document.querySelector('#editProfile');
if (btnEditProfile) {
  btnEditProfile.addEventListener('click', (e) => {
    const inputs = document.querySelector('form').querySelectorAll('input, select');
    const resetDeleteContainer = document.querySelector('#resetDelete');

    toggleEditProfile(btnEditProfile, resetDeleteContainer, 'afterbegin');
    const whitelist = createWhitelist(session.familyRole);

    inputs.forEach((input) => {
      if (whitelist.some((value) => input.name.includes(value))) {
        if (input.name !== 'familyName') input.toggleAttribute('disabled');
      }
    });
  });
}

const form = document.querySelector('#mainForm');
if (form) {
  form.addEventListener('submit', (e) => {
    insertSessionData(form, session);
  });
}
