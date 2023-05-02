'use strict';

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

const navbar = "[data-element='navbar']";
const header = "[data-element='header']";
const section1 = "[data-element='section1']";
const section2 = "[data-element='section2']";
const section3 = "[data-element='section3']";
const footer = "[data-element='footer']";

tl.from(navbar, {x: '-150vw', duration: 1.5, ease: 'bounce.out'})
  .from(header, {y: '-100%', duration: 1, opacity: 0, ease: 'power4.out'})
  .from(section1, {x: '-100', duration: 1.5, opacity: 0, ease: 'power4.out'});

gsap.from(section2, {scrollTrigger: section2, x: '-100vw', duration: 1.5, delay: 0.5, opacity: 0, ease: 'power4.out'});
gsap.from(section3, {scrollTrigger: section3, x: '-100vw', duration: 1.5, delay: 0.5, opacity: 0, ease: 'power4.out'});
gsap.from(footer, {scrollTrigger: footer, x: '-100vw', duration: 1.5, delay: 0.25, opacity: 0, ease: 'power4.out'});
