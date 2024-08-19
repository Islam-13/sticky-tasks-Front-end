import displayAlert from "../helpers/displayAlert.js";
import { handleLocation, URL } from "../hashRouter.js";
import * as Apis from "../api/userApis.js";
import * as PV from "../helpers/validation.js";

function initProfilePage() {
  //select elements
  const profileBtns = document.querySelectorAll(".profile-btn");
  const profileDataElm = document.getElementById("profile-data");
  const profilePasswordElm = document.getElementById("profile-password");
  const dataForm = document.getElementById("pro-data-form");
  const passwordForm = document.getElementById("pro-password-form");
  const logoutBtns = document.querySelectorAll(".logout-btn");
  const proEmailElm = document.getElementById("email-input");
  const profNameElm = document.getElementById("firstName-input");
  const prolNameElm = document.getElementById("lastName-input");
  const proPhoneElm = document.getElementById("phone-input");
  const proImageElm = document.querySelector(".pro-image");

  if (localStorage.getItem("token")) {
    Apis.getProfile().then((data) => fillData(data));
  } else {
    history.pushState(null, null, `${URL}#login`);
    handleLocation();
  }

  // validate all fields
  PV.validateFName();
  PV.validateLName();
  PV.validatePhone();
  PV.validatePassword();
  PV.validateConfirmPassword();

  // display form according to the active link in the side menu
  profileBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      profileBtns.forEach((i) => i.classList.remove("active"));

      btn.classList.add("active");

      if (btn.dataset.for == "profile-data") {
        profilePasswordElm.classList.add("d-none");
        profileDataElm.classList.remove("d-none");
      } else {
        profilePasswordElm.classList.remove("d-none");
        profileDataElm.classList.add("d-none");
      }
    });
  });

  // handle user data in the ui
  function fillData(data) {
    const { firstName, lastName, email, phone } = data.user;
    proEmailElm.value = email;
    profNameElm.value = firstName;
    prolNameElm.value = lastName;
    proPhoneElm.value = phone ?? "";
    proImageElm.textContent = `${firstName.charAt(0)}.${lastName.charAt(0)}`;
  }

  // sumbit update profile form
  dataForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!PV.validateFName() || !PV.validateLName() || !PV.validatePhone())
      return;

    const formData = new FormData(dataForm);

    const firstName = formData.get("pro-fName");
    const lastName = formData.get("pro-lName");
    const phone = formData.get("pro-phone");

    const newData = { firstName, lastName, phone };

    if (!phone) delete newData.phone;

    Apis.updateProfile(newData).then((data) => {
      if (data.status == "success") {
        fillData(data);
        displayAlert("Success", data.message);
      } else displayAlert("error", data.message);
    });
  });

  // submit change password form
  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!PV.validatePassword() || !PV.validateConfirmPassword()) return;

    const formData = new FormData(passwordForm);

    const password = formData.get("pro-password");
    const confirmPassword = formData.get("pro-confirm");

    const newData = { password, confirmPassword };

    Apis.changePassword(newData).then((data) => {
      if (data.status == "success") {
        displayAlert("Success", data.message);
        passwordForm.reset();
      } else displayAlert("error", data.message);
    });
  });

  // log out the app
  logoutBtns.forEach((btn) => btn.addEventListener("click", Apis.logout));
}

export { initProfilePage };
