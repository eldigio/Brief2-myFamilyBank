'use strict';

import { duration } from './modules/utils.js';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration, opacity: 0, ease: 'power4.out' } });

tl.from('nav', { y: -500, y: '-100%' })
  .from('header', { y: '-125%' })
  .from('.section1', { y: '-12.5%' })
  .from('.section2', { y: '-50%', delay: 0.5 });

gsap.from('.section3', { scrollTrigger: '.section3', x: '-100%', delay: 0.5 });
gsap.from('footer', { scrollTrigger: 'footer', y: '100%', delay: 0.5 });
