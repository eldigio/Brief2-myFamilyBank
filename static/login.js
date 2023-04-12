"use strict";

const getAllUsers = async () => {
  const data = await (await fetch("api/users")).json();
  console.log(data);
};

const checkPassword = (password) => {
  if (password.length < 8 && password.length > 64) return false;
  return true;
};

const form = document.querySelector("form");

form.addEventListener(
  "input",
  (e) => {
    const password = document.querySelector("input#floatingPassword");
    console.log(password.value);
    if (!checkPassword(password.value)) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add("was-validated");
  },
  false
);
