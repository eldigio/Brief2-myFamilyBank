'use strict';

import {
  allDisabled,
  createWhitelist,
  getSession,
  insertSessionData,
  loadAnimation,
  setInputsData,
  setNavData,
  toggleEditProfile,
} from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const session = getSession();
setNavData(session);

const btnEditProfile = document.querySelector('#editProfile');

setInputsData(session);
await loadAnimation(tl, 'dashboard-profile');

if (btnEditProfile) {
  btnEditProfile.addEventListener('click', async (e) => {
    const inputs = document.querySelector('form').querySelectorAll('input, select');
    const resetDeleteContainer = document.querySelector('#resetDelete');

    toggleEditProfile(btnEditProfile, resetDeleteContainer, 'afterbegin');
    const whitelist = createWhitelist(session.familyRole);

    allDisabled(inputs, whitelist);

    if (btnEditProfile.classList.contains('btn-outline-secondary'))
      return await loadAnimation(tl, 'dashboard-profile-edit');

    return await loadAnimation(tl, 'dashboard-profile-reload');
  });
}

const form = document.querySelector('#mainForm');
if (form) {
  form.addEventListener('submit', (e) => {
    insertSessionData(form, session);
  });
}
