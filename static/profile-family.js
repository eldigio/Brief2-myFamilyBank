'use strict';

import {
  allDisabled,
  createFamilyHTML,
  createWhitelist,
  getSession,
  loadAnimation,
  setNavData,
  toggleEditProfile,
} from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const session = getSession();
setNavData(session);

const fetchData = async () => {
  const familyContainer = document.querySelector('#family');

  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = await response.json();

  const jsonDataKeys = Object.keys(jsonData);
  jsonDataKeys.forEach((key, index) => {
    const htmlMarkup = createFamilyHTML(jsonData, key, jsonDataKeys, index);
    familyContainer.insertAdjacentHTML('beforeend', htmlMarkup);
  });

  loadAnimation(tl, 'dashboard-family');
};

fetchData();

const btnEditProfile = document.querySelector('#editProfile');
if (btnEditProfile) {
  btnEditProfile.addEventListener('click', async (e) => {
    const forms = document.querySelectorAll('form');

    toggleEditProfile(btnEditProfile, document.querySelector('#resetDelete'));
    const whitelist = createWhitelist(session.familyRole);

    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input, select');
      allDisabled(inputs, whitelist);
    });

    if (document.querySelector('.btn-outline-primary')) return await loadAnimation(tl, 'dashboard-family-edit');

    return await loadAnimation(tl, 'dashboard-family-reload');
  });
}
