"use strict";

import { validateEmail, validateFamilyName, validateName, validatePassword } from "./modules/utils.js";

const firstNameContainer = document.querySelector("#firstName");
const lastNameContainer = document.querySelector("#lastName");
const emailContainer = document.querySelector("#email");
const passwordContainer = document.querySelector("#password");
const familyNameContainer = document.querySelector("#familyName");

validateName(firstNameContainer);
validateName(lastNameContainer);
validateEmail(emailContainer);
validatePassword(passwordContainer);
validateFamilyName(familyNameContainer);
