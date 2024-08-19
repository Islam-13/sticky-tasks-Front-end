import { resetPassword } from "../api/userApis.js";
import {
  validatePassword,
  validateConfirmPassword,
} from "../helpers/validation.js";

function initResetPassword() {
  const formElm = document.getElementById("resetPassword-form");
  const submitBtnElm = document.querySelector(".submit-btn");

  validatePassword();
  validateConfirmPassword();

  formElm.addEventListener("input", () => {
    if (!validatePassword() || !validateConfirmPassword()) {
      submitBtnElm.disabled = true;
    } else submitBtnElm.disabled = false;
  });

  // submmit form
  formElm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validatePassword() || !validateConfirmPassword()) return;

    const data = new FormData(formElm);

    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    const formData = { password, confirmPassword };

    resetPassword(formData);
  });
}

export { initResetPassword };
