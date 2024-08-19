import { login } from "../api/userApis.js";
import { validateEmail, validatePassword } from "../helpers/validation.js";

function initLoginPage() {
  const loginFormElm = document.querySelector("#login-form");
  const submitBtnElm = document.querySelector(".submit-btn");

  validateEmail();
  validatePassword();

  loginFormElm.addEventListener("input", () => {
    if (!validateEmail() || !validatePassword()) {
      submitBtnElm.disabled = true;
    } else submitBtnElm.disabled = false;
  });

  // submmit login-form and login
  loginFormElm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePassword()) return;

    const data = new FormData(loginFormElm);

    const email = data.get("email");
    const password = data.get("password");

    login({ email, password });
  });
}

export { initLoginPage };
