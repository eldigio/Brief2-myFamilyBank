'use strict';

import { getSession, insertSessionData } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const dateInput = document.querySelector('#expenseDate').children[0];
dateInput.valueAsDate = new Date();

const session = getSession();

const fetchData = async () => {
  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = await response.json();

  const jsonDataKeys = Object.keys(jsonData);
  const profile = document.querySelector('svg');
  const familyNameNav = document.querySelector('#familyNameNav');
  const familyRoleNav = document.querySelector('#familyRoleNav');

  profile.setAttribute('data-jdenticon-value', session.firstName);
  familyNameNav.textContent = session.familyName;
  familyRoleNav.textContent = session.familyRole;

  await tl
    .from('header', { y: '-100%' })
    .from('.card', { y: '-100%' })
    .from('.input', { y: '-100%', stagger: (index) => index / 12 })
    .from('.btn-outline-secondary', { y: '-100%' })
    .from('.btn-outline-primary', { y: '-100%' });
};

fetchData();

const form = document.querySelector('form');
form.addEventListener('submit', (e) => insertSessionData(form, session));
