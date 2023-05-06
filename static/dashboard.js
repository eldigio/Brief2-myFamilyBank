'use strict';

import { createChart, getSession, loadAnimation, setNavData } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.4, opacity: 0, ease: 'power4.out', scale: 0.75 } });

const session = getSession();
setNavData(session);

const fetchData = async () => {
  const response = await fetch(`http://127.0.0.1:5000/profile/family/${session.familyName}`);
  const jsonData = Object.values(await response.json());

  await loadAnimation(tl, 'dashboard');

  const chart = createChart(jsonData, session, 'bar');
  const pie = createChart(jsonData, session, 'pie');
};

fetchData();
