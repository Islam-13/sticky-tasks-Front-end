import { forgetPassword } from "../api/userApis.js";
import { validateEmail } from "../helpers/validation.js";

function initForgetPasswordPage() {
  // select elements
  const formElm = document.getElementById("forgetPassword-form");
  const submitBtnElm = document.querySelector(".submit-btn");

  validateEmail();

  formElm.addEventListener("input", function () {
    if (validateEmail()) {
      submitBtnElm.disabled = false;
    } else submitBtnElm.disabled = true;
  });

  // submmit login-form and login
  formElm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    const data = new FormData(formElm);

    const email = data.get("email");

    forgetPassword({ email });
  });
}

export { initForgetPasswordPage };
