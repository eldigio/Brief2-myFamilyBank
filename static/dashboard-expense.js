'use strict';

import { getSession, insertSessionData, loadAnimation, setNavData } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

document.querySelector('input[type="date"]').valueAsDate = new Date();

const session = getSession();
setNavData(session);

await loadAnimation(tl, 'dashboard-expense');

const form = document.querySelector('form');
form.addEventListener('submit', (e) => insertSessionData(form, session));
