export const getAllUsers = async () => {
  const data = await (await fetch("api/users")).json();
  console.log(data);
};

export const sleep = (seconds) => new Promise((r) => setTimeout(r, seconds * 1000));

export const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export const defaultInput = (input) => {
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
};

export const invalidInput = (input, invalidFeedback, errorMex) => {
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
  invalidFeedback.textContent = errorMex;
};

export const validInput = (input) => {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
};

export const validName = (name, invalidFeedback) => {
  if (name.value.match(/[0-9]/)) {
    invalidInput(name, invalidFeedback, "Cannot contain numbers");
    return false;
  }
  return true;
};

export const isEmpty = (input) => {
  if (input.value === "") {
    defaultInput(input);
    return true;
  }
  return false;
};

export const validEmail = (email, invalidFeedback) => {
  if (!email.value.match(emailRegex)) {
    invalidInput(email, invalidFeedback, "Invalid Email Address");
    return false;
  }
  return true;
};

export const validPassword = (password, invalidFeedback) => {
  if (password.value.length < 8) {
    invalidInput(password, invalidFeedback, "Password must be more than 8 characters");
    return false;
  }
  if (password.value.length > 128) {
    invalidInput(password, invalidFeedback, "Password must be less than 128 characters");
    return false;
  }
  if (!password.value.match(/[a-z]/)) {
    invalidInput(password, invalidFeedback, "Password must contain a lowercase character");
    return false;
  }
  if (!password.value.match(/[A-Z]/)) {
    invalidInput(password, invalidFeedback, "Password must contain a uppercase character");
    return false;
  }
  if (!password.value.match(/[0-9]/)) {
    invalidInput(password, invalidFeedback, "Password must contain a number");
    return false;
  }
  if (!password.value.match(/(?![a-z0-9])\S/gi)) {
    invalidInput(password, invalidFeedback, "Password must contain a special character");
    return false;
  }
  return true;
};

export const validFamilyName = (familyName, invalidFeedback) => {
  if (familyName.value.length < 4) {
    invalidInput(familyName, invalidFeedback, "Family name must be more than 4 characters");
    return false;
  }
  if (familyName.value.length > 16) {
    invalidInput(familyName, invalidFeedback, "Family name must be less than 16 characters");
    return false;
  }
  return true;
};

export const validateAmount = (amount, invalidFeedback) => {
  if (amount.value === "") {
    defaultInput(amount);
    return;
  }
  if (amount.value.match(/[a-z]/i)) {
    invalidInput(amount, invalidFeedback, "Cannot contain letters");
    return false;
  }
  if (amount.value.length > 8) {
    invalidInput(amount, invalidFeedback, "Expense must be less than 8 digits");
    return false;
  }
  validInput(amount);
  return true;
};

export const animateCSS = (element, animation, prefix = "animate__") => {
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.remove("d-none");
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      if (animationName.includes("fadeOut")) node.classList.add("d-none");
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
};

export const barChartConfig = {
  type: "bar",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Mario",
        data: [10, 0, 50, 100, 0, 0, 80],
        borderRadius: 5,
        backgroundColor: "blue",
      },
      {
        label: "Maria",
        data: [0, 50, 10, 0, 0, 30, 50, 0, 0, 0, 80, 90],
        borderRadius: 5,
        backgroundColor: "red",
      },
      {
        label: "Pippo",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50],
        borderRadius: 5,
        backgroundColor: "yellow",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.5,
  },
};

export const pieChartConfig = {
  type: "pie",
  data: {
    labels: ["1", "2"],
    datasets: [
      {
        label: "Dataset 1",
        data: [15, 1, 80, 55, 2, 33, 8],
        borderColor: "Red",
        backgroundColor: "Red",
      },
      {
        label: "Dataset 2",
        data: [15, 1, 80, 55, 2, 33, 8],
        borderColor: "Blue",
        backgroundColor: "Blue",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
  },
};
