'use strict';

import { getSession, createChart } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const session = getSession();

const fetchData = async () => {
  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = Object.values(await response.json());

  const profile = document.querySelector('svg');
  const familyNameNav = document.querySelector('#familyNameNav');
  const familyRoleNav = document.querySelector('#familyRoleNav');

  profile.setAttribute('data-jdenticon-value', session.firstName);
  familyNameNav.textContent = session.familyName;
  familyRoleNav.textContent = session.familyRole;

  await tl
    .from('nav', { y: '-100%' })
    .from('.nav-element', { y: '-100%', stagger: 0.2 })
    .from('header', { y: '-100%' });
  const chart = createChart(jsonData, session);
};

fetchData();
