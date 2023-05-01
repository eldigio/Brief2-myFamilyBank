'use strict';

import { createFamilyHTML, createWhitelist, getSession, toggleEditProfile } from './modules/utils.js';

const session = getSession();

const fetchData = async () => {
  const familyContainer = document.querySelector('#family');

  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = await response.json();

  const jsonDataKeys = Object.keys(jsonData);
  jsonDataKeys.forEach((key, index) => {
    const htmlMarkup = createFamilyHTML(jsonData, key, jsonDataKeys, index);
    familyContainer.insertAdjacentHTML('beforeend', htmlMarkup);
  });
};

fetchData();

const btnEditProfile = document.querySelector('#editProfile');
if (btnEditProfile) {
  btnEditProfile.addEventListener('click', (e) => {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input, select');

      const resetDeleteContainer = document.querySelector('#resetDelete');
      toggleEditProfile(btnEditProfile, resetDeleteContainer, true);
      const whitelist = createWhitelist(session.familyRole);

      inputs.forEach((input) => {
        if (whitelist.some((value) => input.name.includes(value))) {
          input.toggleAttribute('disabled');
        }
      });
    });
  });
}
