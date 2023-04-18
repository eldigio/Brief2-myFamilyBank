"use strict";

const emailContainer = document.querySelector("#email");
const passwordContainer = document.querySelector("#password");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const emailInput = form.children[0].children[0];
  const passwordInput = form.children[1].children[0];
  console.log(emailInput.value, passwordInput.value);

  if (emailInput.value === "" || passwordInput.value === "") {
    e.preventDefault();
    return;
  }
});
