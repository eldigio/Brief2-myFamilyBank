"use strict";

import {
  animateCSS,
  isEmpty,
  sleep,
  validEmail,
  validFamilyName,
  validInput,
  validName,
  validPassword,
} from "./modules/utils.js";

const form = document.querySelector("form");
const firstNameContainer = document.querySelector("#firstName");
const lastNameContainer = document.querySelector("#lastName");
const emailContainer = document.querySelector("#email");
const passwordContainer = document.querySelector("#password");
const familyNameContainer = document.querySelector("#familyName");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  animateCSS("#alertDanger", "fadeIn");
  await sleep(5);
  animateCSS("#alertDanger", "fadeOut");
});

firstNameContainer.addEventListener("focusout", (e) => {
  const invalidFeedback = firstNameContainer.querySelector(".invalid-feedback");
  if (isEmpty(e.target)) return;
  if (!validName(e.target, invalidFeedback)) return;
  validInput(e.target);
});

lastNameContainer.addEventListener("focusout", (e) => {
  const invalidFeedback = lastNameContainer.querySelector(".invalid-feedback");
  if (isEmpty(e.target)) return;
  if (!validName(e.target, invalidFeedback)) return;
  validInput(e.target);
});

emailContainer.addEventListener("input", (e) => {
  const invalidFeedback = lastNameContainer.querySelector(".invalid-feedback");
  if (isEmpty(e.target)) return;
  if (!validEmail(e.target, invalidFeedback)) return;
  validInput(e.target);
});

passwordContainer.addEventListener("focusout", (e) => {
  const invalidFeedback = passwordContainer.querySelector(".invalid-feedback");
  if (isEmpty(e.target)) return;
  if (!validPassword(e.target, invalidFeedback)) return;
  validInput(e.target);
});

familyNameContainer.addEventListener("focusout", (e) => {
  const invalidFeedback = familyNameContainer.querySelector(".invalid-feedback");
  if (isEmpty(e.target)) return;
  if (!validFamilyName(e.target, invalidFeedback)) return;
  validInput(e.target);
});
