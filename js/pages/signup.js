import { signup } from "../api/userApis.js";
import * as SV from "../helpers/validation.js";

function initSignUpPage() {
  const signupFormElm = document.getElementById("signup-form");
  const submitBtnElm = document.querySelector(".submit-btn");

  SV.validateFName();
  SV.validateLName();
  SV.validateEmail();
  SV.validatePassword();
  SV.validatePhone();

  signupFormElm.addEventListener("input", () => {
    if (
      !SV.validateFName() ||
      !SV.validateLName() ||
      !SV.validateEmail() ||
      !SV.validatePhone() ||
      !SV.validatePassword()
    ) {
      submitBtnElm.disabled = true;
    } else submitBtnElm.disabled = false;
  });

  // submmit signup-form and go tp login page
  signupFormElm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      !SV.validateFName() ||
      !SV.validateLName() ||
      !SV.validateEmail() ||
      !SV.validatePhone() ||
      !SV.validatePassword()
    )
      return;

    const data = new FormData(signupFormElm);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    const phone = data.get("phone");

    const formData = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    if (!phone) delete formData.phone;

    signup(formData);
  });
}

export { initSignUpPage };
