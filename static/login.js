"use strict";

import { animateCSS, isEmpty, sleep, validEmail, validInput, validPassword } from "./modules/utils.js";

const form = document.querySelector("form");
const emailContainer = document.querySelector("#email");
const passwordContainer = document.querySelector("#password");

const canSubmit = {
  email: false,
  password: false,
};

form.addEventListener("submit", (e) => {
  if (!canSubmit.email || !canSubmit.password) {
    e.preventDefault();
    animateCSS("#alert-danger", "fadeIn");
    sleep(5);
    animateCSS("#alert-danger", "fadeOut");
    return;
  }
});

emailContainer.addEventListener("input", (e) => {
  const invalidFeedback = emailContainer.querySelector(".invalid-feedback");
  if (isEmpty(e.target)) return;
  if (!validEmail(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.email = true;
});

passwordContainer.addEventListener("input", (e) => {
  const invalidFeedback = passwordContainer.querySelector(".invalid-feedback");
  if (isEmpty(e.target)) return;
  if (!validPassword(e.target, invalidFeedback)) return;
  validInput(e.target);
  canSubmit.password = true;
});
