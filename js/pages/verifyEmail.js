import { verifyEmail } from "../api/userApis.js";
import { validateCode } from "../helpers/validation.js";

function initVerifyEmail() {
  const formElm = document.getElementById("verify-form");
  const submitBtnElm = document.querySelector(".submit-btn");

  validateCode();

  formElm.addEventListener("input", () => {
    if (!validateCode()) {
      submitBtnElm.disabled = true;
    } else submitBtnElm.disabled = false;
  });

  // submmit login-form and login
  formElm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateCode()) return;

    const data = new FormData(formElm);

    const otp = data.get("otp");

    const formData = { otp };

    verifyEmail(formData);
  });
}

export { initVerifyEmail };
