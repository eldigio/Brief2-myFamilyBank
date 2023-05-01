'use strict';

import { createWhitelist, getSession, toggleEditProfile } from './modules/utils.js';

const session = getSession();

const btnEditProfile = document.querySelector('#editProfile');
if (btnEditProfile) {
  btnEditProfile.addEventListener('click', (e) => {
    const inputs = document.querySelector('form').querySelectorAll('input, select');
    const resetDeleteContainer = document.querySelector('#resetDelete');

    toggleEditProfile(btnEditProfile, resetDeleteContainer);
    const whitelist = createWhitelist(session.familyRole);

    inputs.forEach((input) => {
      if (whitelist.some((value) => input.name.includes(value))) {
        input.toggleAttribute('disabled');
      }
    });
  });
}
