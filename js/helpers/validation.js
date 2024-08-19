const emailReg = /[a-z-_.0-9]{3,20}\@[a-z]{2,8}\.[a-z]{2,3}$/;
const phoneReg = /^01[0125][0-9]{8}$/;

let isValidEmail;
let isValidPass;
let isValidFirstName;
let isValidLastName;
let isValidPhone = true;
let isValidConfirmPassword;
let checkMatching;
let isValidCode;

export function validateEmail() {
  const email = document.getElementById("email-input");
  const emailAlert = document.querySelector(".email-alert");

  email.addEventListener("input", function () {
    if (!this.value) {
      emailAlert.classList.add("show");
      emailAlert.textContent = "Email is required!!";
      email.classList.add("not-valid");
      isValidEmail = false;
    } else if (!emailReg.test(this.value)) {
      emailAlert.classList.add("show");
      emailAlert.textContent = "Email is not valid!!";
      email.classList.add("not-valid");
      isValidEmail = false;
    } else {
      emailAlert.classList.remove("show");
      email.classList.remove("not-valid");
      isValidEmail = true;
    }
  });

  if (isValidEmail) return true;

  return false;
}

export function validatePassword() {
  const password = document.getElementById("password-input");
  const passAlert = document.querySelector(".password-alert");

  password.addEventListener("input", function () {
    checkMatching = this.value;

    if (!this.value) {
      passAlert.classList.add("show");
      passAlert.textContent = "Password is required!!";
      password.classList.add("not-valid");
      isValidPass = false;
    } else if (this.value.length < 6) {
      passAlert.classList.add("show");
      passAlert.textContent = "Minimum 6 chars";
      password.classList.add("not-valid");
      isValidPass = false;
    } else {
      passAlert.classList.remove("show");
      password.classList.remove("not-valid");
      isValidPass = true;
    }
  });

  if (isValidPass) return true;

  return false;
}

export function validateFName() {
  const firstName = document.getElementById("firstName-input");
  const firstNameAlert = document.querySelector(".firstName-alert");

  firstName.addEventListener("input", function () {
    if (!this.value) {
      firstNameAlert.classList.add("show");
      firstNameAlert.textContent = "Fisrt name is required!!";
      firstName.classList.add("not-valid");
      isValidFirstName = false;
    } else if (this.value.length < 3) {
      firstNameAlert.classList.add("show");
      firstNameAlert.textContent = "Minimum 3 chars!!";
      firstName.classList.add("not-valid");
      isValidFirstName = false;
    } else {
      firstNameAlert.classList.remove("show");
      firstName.classList.remove("not-valid");
      isValidFirstName = true;
    }
  });

  if (isValidFirstName) return true;

  return false;
}

export function validateLName() {
  const lastName = document.getElementById("lastName-input");
  const lastNameAlert = document.querySelector(".lastName-alert");

  lastName.addEventListener("input", function () {
    if (!this.value) {
      lastNameAlert.classList.add("show");
      lastNameAlert.textContent = "Last name is required!!";
      lastName.classList.add("not-valid");
      isValidLastName = false;
    } else if (this.value.length < 3) {
      lastNameAlert.classList.add("show");
      lastNameAlert.textContent = "Minimum 3 chars!!";
      lastName.classList.add("not-valid");
      isValidLastName = false;
    } else {
      lastNameAlert.classList.remove("show");
      lastName.classList.remove("not-valid");
      isValidLastName = true;
    }
  });

  if (isValidLastName) return true;

  return false;
}

export function validatePhone() {
  const phone = document.getElementById("phone-input");
  const phoneAlert = document.querySelector(".phone-alert");

  phone.addEventListener("input", function () {
    if (!this.value) {
      phoneAlert.classList.remove("show");
      phone.classList.remove("not-valid");
      isValidPhone = true;
    } else if (this.value && !phoneReg.test(this.value)) {
      phoneAlert.classList.add("show");
      phoneAlert.textContent = "Phone is not valid!!";
      phone.classList.add("not-valid");
      isValidPhone = false;
    } else if (this.value && phoneReg.test(this.value)) {
      phoneAlert.classList.remove("show");
      phone.classList.remove("not-valid");
      isValidPhone = true;
    }
  });

  if (isValidPhone) return true;

  return false;
}

export function validateConfirmPassword() {
  const confirmPassword = document.getElementById("confirm-input");
  const confirmPassAlert = document.querySelector(".confirm-alert");

  confirmPassword.addEventListener("input", function () {
    if (!this.value) {
      confirmPassAlert.classList.add("show");
      confirmPassAlert.textContent = "Confirm password is required!!";
      confirmPassword.classList.add("not-valid");
      isValidConfirmPassword = false;
    } else if (this.value && this.value != checkMatching) {
      confirmPassAlert.classList.add("show");
      confirmPassAlert.textContent = "Confirm password must match password";
      confirmPassword.classList.add("not-valid");
      isValidConfirmPassword = false;
    } else {
      confirmPassAlert.classList.remove("show");
      confirmPassword.classList.remove("not-valid");
      isValidConfirmPassword = true;
    }
  });

  if (isValidConfirmPassword) return true;

  return false;
}

export function validateCode() {
  const code = document.getElementById("code-input");
  const codeAlert = document.querySelector(".code-alert");

  code.addEventListener("input", function () {
    if (!this.value) {
      codeAlert.classList.add("show");
      codeAlert.textContent = "Code is required!!";
      code.classList.add("not-valid");
      isValidCode = false;
    } else if (this.value.length < 6) {
      codeAlert.classList.add("show");
      codeAlert.textContent = "Code must be 6 chars long.";
      code.classList.add("not-valid");
      isValidCode = false;
    } else if (this.value.length == 6) {
      codeAlert.classList.remove("show");
      code.classList.remove("not-valid");
      isValidCode = true;
    } else if (this.value.length > 6) {
      this.value = this.value.slice(0, 6);
    }
  });

  if (isValidCode) return true;

  return false;
}
