"use strict";

import { validateAmount } from "./modules/utils.js";

const amountContainer = document.querySelector("#amount");
const form = document.querySelector("form");

amountContainer.addEventListener("input", (e) => {
  const invalidFeedback = amountContainer.querySelector(".invalid-feedback");
  const amount = e.target;
  validateAmount(amount, invalidFeedback);
});

form.addEventListener("submit", (e) => {
  console.log(form.querySelector("#amount").firstElementChild.value);
  e.preventDefault();
});
