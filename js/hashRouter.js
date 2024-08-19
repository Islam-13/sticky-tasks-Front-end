import { initLoginPage } from "./pages/login.js";
import { initSignUpPage } from "./pages/signup.js";
import { initHomePage } from "./pages/main.js";
import { initForgetPasswordPage } from "./pages/forgetPassword.js";
import { initVerifyEmail } from "./pages/verifyEmail.js";
import { initResetPassword } from "./pages/resetPassword.js";
import { initProfilePage } from "./pages/profile.js";

export const URL = "https://sticky-tasks-front-end.vercel.app/";

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("token")) {
    history.pushState(null, null, `${URL}#login`);
    handleLocation();
  }
});

const routes = {
  404: "/pages/404notFound.html",
  "": "/pages/home.html",
  signup: "/pages/signup.html",
  login: "/pages/login.html",
  profile: "/pages/profile.html",
  forgetPassword: "/pages/forgetPassword.html",
  verifyEmail: "/pages/verifyEmail.html",
  resetPassword: "/pages/resetPassword.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");

  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById("main-page").innerHTML = html;
  handleJsPage(path);
};

function handleJsPage(path) {
  switch (path) {
    case "login":
      initLoginPage();
      break;
    case "signup":
      initSignUpPage();
      break;
    case "":
      initHomePage();
      break;
    case "forgetPassword":
      initForgetPasswordPage();
      break;
    case "verifyEmail":
      initVerifyEmail();
      break;
    case "resetPassword":
      initResetPassword();
      break;
    case "profile":
      initProfilePage();
      break;
    default:
      break;
  }
}
handleLocation();
window.onpopstate = handleLocation;
window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", handleLocation);
