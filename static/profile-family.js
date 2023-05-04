'use strict';

import { createFamilyHTML, createWhitelist, getSession, toggleEditProfile } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const session = getSession();
console.log(session);

const fetchData = async () => {
  const familyContainer = document.querySelector('#family');

  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = await response.json();

  const jsonDataKeys = Object.keys(jsonData);
  const profile = document.querySelector('svg');
  const familyNameNav = document.querySelector('#familyNameNav');
  const familyRoleNav = document.querySelector('#familyRoleNav');
  jsonDataKeys.forEach((key, index) => {
    profile.setAttribute('data-jdenticon-value', session.firstName);
    familyNameNav.textContent = session.familyName;
    familyRoleNav.textContent = session.familyRole;
    const htmlMarkup = createFamilyHTML(jsonData, key, jsonDataKeys, index);
    familyContainer.insertAdjacentHTML('beforeend', htmlMarkup);
  });

  await tl
    .from('header', { y: '-100%' })
    .from('.card', { y: '-100%' })
    .from('#divider', { y: '-100%' })
    .from('.input', { y: '-100%', stagger: (index) => index / 12 });
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

      inputs.forEach((input) => {
        if (whitelist.some((value) => input.name.includes(value))) {
          input.toggleAttribute('disabled');
        }
      });
    });

    if (document.querySelector('.btn-outline-primary'))
      return await tl
        .from('.input', { y: '-100%', stagger: (index) => index / 12 })
        .from('.btn-outline-secondary', { y: '-100%' })
        .from('.btn-outline-primary', { y: '-100%' });

    return await tl
      .from('.input', { y: '-100%', stagger: (index) => index / 12 })
      .from('.btn-secondary', { y: '-100%' });
  });
}
