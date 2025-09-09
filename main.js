const body = document.querySelector("body");
const container = document.createElement("div");
const form = document.createElement("form");
const emailLabel = document.createElement("label");
const emailInput = document.createElement("input");
const countryLabel = document.createElement("label");
const countryInput = document.createElement("select");
const postalLabel = document.createElement("label");
const postalInput = document.createElement("input");
const passLabel = document.createElement("label");
const passInput = document.createElement("input");
const passConfirmLabel = document.createElement("label");
const passConfirmInput = document.createElement("input");
const submit = document.createElement("button");

const optionNl = document.createElement("option");
const optionPl = document.createElement("option");
const optionDe = document.createElement("option");
const optionUs = document.createElement("option");
const optionFr = document.createElement("option");

form.noValidate = true;

emailLabel.setAttribute("for", "email");
emailInput.id = "email";
emailInput.required = true;

countryLabel.setAttribute("for", "country");
countryInput.id = "country";
countryInput.required = true;

postalLabel.setAttribute("for", "postal");
postalInput.id = "postal";
postalInput.required = true;
postalInput.className = "pl";

passLabel.setAttribute("for", "pass");
passInput.id = "pass";

passConfirmLabel.setAttribute("for", "pass-confirm");
passConfirmInput.id = "pass-confirm";
passConfirmInput.required = true;

emailInput.type = "email";
countryInput.type = "text";
postalInput.type = "text";
passInput.type = "password";
passConfirmInput.type = "password";

emailInput.placeholder = "example@email.com";
passInput.minLength = 10;
passInput.required = true;

container.classList.add("container");
emailLabel.textContent = "Email";
countryLabel.textContent = "Country";
postalLabel.textContent = "Postal code";
passLabel.textContent = "password";
passConfirmLabel.textContent = "confirm password";
submit.textContent = "submit";
optionPl.textContent = "Poland";
optionNl.textContent = "Netherlands";
optionDe.textContent = "Germany";
optionUs.textContent = "USA";
optionFr.textContent = "France";

function chooseCountry() {
  postalInput.className = "";

  switch (countryInput.value) {
    case "Netherlands":
      postalInput.className = "nl";
      break;
    case "Poland":
      postalInput.className = "pl";
      break;
    case "Germany":
      postalInput.className = "de";
      break;
    case "USA":
      postalInput.className = "us";
      break;
    case "France":
      postalInput.className = "fr";
      break;
    default:
      postalInput.className = "pl";
  }
}

function setPostalFormat() {
  postalInput.placeholder = "";
  postalInput.pattern = "";

  switch (postalInput.className) {
    case "pl":
      postalInput.placeholder = "12-345";
      postalInput.pattern = "^[0-9]{2}-[0-9]{3}";
      postalInput.maxLength = "6";
      postalInput.minLength = "6";
      break;
    case "us":
      postalInput.placeholder = "12345-6789";
      postalInput.pattern = "^d{5}(-d{4})?$";
      postalInput.maxLength = "5";
      postalInput.minLength = "10";

      break;
    case "nl":
      postalInput.placeholder = "1234 AB";
      postalInput.pattern = "^[1-9][0-9]{3}s?[A-Z]{2}$";
      postalInput.maxLength = "7";
      postalInput.minLength = "7";
      break;
    case "fr":
      postalInput.placeholder = "12345";
      postalInput.pattern = "^d{5}$";
      postalInput.maxLength = "5";
      postalInput.minLength = "5";
      break;
    case "de":
      postalInput.placeholder = "12345";
      postalInput.pattern = "^d{5}$";
      postalInput.maxLength = "5";
      postalInput.minLength = "5";
      break;
  }
}

function validateEmail() {
  let isValid = false;

  switch (true) {
    case emailInput.validity.valueMissing:
      emailInput.setCustomValidity("This field cannot be empty");
      isValid = false;
      break;
    case emailInput.validity.typeMismatch ||
      !/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(
        emailInput.value
      ):
      emailInput.setCustomValidity(
        'Input must follow the "example@email.com" format'
      );
      isValid = false;
      break;
    default:
      emailInput.setCustomValidity("");
      isValid = true;
      break;
  }

  emailInput.reportValidity();
  return isValid;
}

function validatePostal() {
  let isValid = false;

  switch (true) {
    case postalInput.validity.patternMismatch:
      postalInput.setCustomValidity(
        `Invalid postal code for this country! - Must follow ${postalInput.placeholder} format`
      );
      isValid = false;
      break;
    case postalInput.validity.valueMissing:
      postalInput.setCustomValidity("Can't be empty");
      isValid = false;
      break;
    case postalInput.validity.tooShort:
      postalInput.setCustomValidity("Postal code too short!");
      isValid = false;
      break;
    case postalInput.validity.tooLong:
      postalInput.setCustomValidity("Postal code too long!");
      isValid = false;
      break;
    default:
      postalInput.setCustomValidity("");
      isValid = true;
      break;
  }

  postalInput.reportValidity();
  return isValid;
}

function validatePassword() {
  let isValid = false;

  switch (true) {
    case passInput.validity.valueMissing:
      passInput.setCustomValidity("Must enter password");
      isValid = false;
      break;
    case passInput.validity.tooShort:
      passInput.setCustomValidity("Password too short");
      isValid = false;
      break;
    case !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(
      passInput.value
    ):
      passInput.setCustomValidity(
        "Must contain at least 1 digit, 1 special character, 1 uppercase letter and 1 lowercase letter"
      );
      isValid = false;
      break;
    default:
      passInput.setCustomValidity("");
      isValid = true;
      break;
  }

  passInput.reportValidity();
  return isValid;
}

function validateConfirmedPassword() {
  let isValid = false;

  switch (true) {
    case passInput.value !== passConfirmInput.value:
      passConfirmInput.setCustomValidity(
        "Confirmed password is different than the first one!"
      );
      isValid = false;
      break;
    case passInput.validity.valueMissing:
      passConfirmInput.setCustomValidity(
        "First fill out the first password field correctly!"
      );
      isValid = false;
      break;
    case passInput.validity.tooShort:
      passConfirmInput.setCustomValidity(
        "First fill out the first password field correctly!"
      );
      isValid = false;
      break;
    case !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(
      passInput.value
    ):
      passConfirmInput.setCustomValidity(
        "First fill out the first password field correctly!"
      );
      isValid = false;
      break;
    default:
      passConfirmInput.setCustomValidity("");
      isValid = true;
      break;
  }

  passConfirmInput.reportValidity();
  return isValid;
}

function validateEverything() {
  if (
    validateEmail() &&
    validatePostal() &&
    validatePassword() &&
    validateConfirmedPassword()
  ) {
    return true;
  }
  return false;
}

emailInput.addEventListener("input", () => {
  validateEmail();
});

countryInput.addEventListener("change", () => {
  chooseCountry();
  setPostalFormat();
});

postalInput.addEventListener("input", () => {
  validatePostal();
});

passInput.addEventListener("input", () => {
  validatePassword();
});

passConfirmInput.addEventListener("input", () => {
  validateConfirmedPassword();
});

form.addEventListener("submit", (event) => {
  let isValid = validateEverything();
  if (!isValid) {
    event.preventDefault();
  }
});

body.appendChild(container);
container.appendChild(form);
form.appendChild(emailLabel);
form.appendChild(emailInput);
form.appendChild(countryLabel);
form.appendChild(countryInput);
form.appendChild(postalLabel);
form.appendChild(postalInput);
form.appendChild(passLabel);
form.appendChild(passInput);
form.appendChild(passConfirmLabel);
form.appendChild(passConfirmInput);
form.appendChild(submit);

countryInput.appendChild(optionPl);
countryInput.appendChild(optionNl);
countryInput.appendChild(optionDe);
countryInput.appendChild(optionUs);
countryInput.appendChild(optionFr);

setPostalFormat();
