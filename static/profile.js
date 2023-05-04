'use strict';

import { createWhitelist, getSession, insertSessionData, toggleEditProfile } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const session = getSession();
const btnEditProfile = document.querySelector('#editProfile');

const fetchData = async () => {
  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = await response.json();

  const profile = document.querySelector('svg');
  const familyNameNav = document.querySelector('#familyNameNav');
  const familyRoleNav = document.querySelector('#familyRoleNav');
  const firstNameInput = document.querySelector('input#floatingFirstName');
  const lastNameInput = document.querySelector('input#floatingLastName');
  const emailInput = document.querySelector('input#floatingEmail');
  const familyNameInput = document.querySelector('input#floatingFamilyName');

  profile.setAttribute('data-jdenticon-value', session.firstName);
  familyNameNav.textContent = session.familyName;
  familyRoleNav.textContent = session.familyRole;
  firstNameInput.value = session.firstName;
  lastNameInput.value = session.lastName;
  emailInput.value = session.email;
  familyNameInput.value = session.familyName;

  await tl
    .from('header', { y: '-100%' })
    .from('.list-group-item', { y: '-100%', stagger: 0.15 })
    .from('.btn-secondary', { y: '-100%' })
    .from('.card', { y: '-100%' })
    .from('.input', { y: '-100%', stagger: (index) => index / 12 })
    .from('.btn-outline-warning', { y: '-100%' })
    .from('.btn-outline-danger', { y: '-100%' });
};

fetchData();

if (btnEditProfile) {
  btnEditProfile.addEventListener('click', async (e) => {
    const inputs = document.querySelector('form').querySelectorAll('input, select');
    const resetDeleteContainer = document.querySelector('#resetDelete');

    toggleEditProfile(btnEditProfile, resetDeleteContainer, 'afterbegin');
    const whitelist = createWhitelist(session.familyRole);

    inputs.forEach((input) => {
      if (whitelist.some((value) => input.name.includes(value))) {
        if (input.name !== 'familyName') input.toggleAttribute('disabled');
      }
    });

    await tl
      .from('.btn-outline-secondary', { y: '-100%' })
      .from('.input', { y: '-100%', stagger: (index) => index / 12 })
      .from('.btn-outline-primary', { y: '-100%' })
      .from('.btn-outline-warning', { y: '-100%' })
      .from('.btn-outline-danger', { y: '-100%' });
  });
}

const form = document.querySelector('#mainForm');
if (form) {
  form.addEventListener('submit', (e) => {
    insertSessionData(form, session);
  });
}
