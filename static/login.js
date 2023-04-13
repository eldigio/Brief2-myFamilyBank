"use strict";

import { validateEmail, validatePassword } from "./modules/utils.js";

const emailContainer = document.querySelector("#email");
const passwordContainer = document.querySelector("#password");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const emailInput = form.children[0].children[0];
  const passwordInput = form.children[1].children[0];
  console.log(emailInput, passwordInput);

  if (emailInput.value === "" || passwordInput.value === "") {
    e.preventDefault();
    return;
  }
  validateEmail(emailContainer);
  validatePassword(passwordContainer);
});
