'use strict';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ defaults: { duration: 0.5, opacity: 0, ease: 'power4.out', scale: 0.75 } });

tl.from('nav', { y: '-100%' })
  .from('header', { y: '-125%' })
  .from('.section1', { y: '-25%' })
  .from('.section2', { y: '-100%' });

gsap.from('.section3', { scrollTrigger: '.section3', opacity: 0, y: '50%', delay: 0.3 });
gsap.from('footer', { scrollTrigger: 'footer', y: '100%', delay: 0.3 });
