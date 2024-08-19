import displayAlert from "../helpers/displayAlert.js";
import { handleLocation } from "../hashRouter.js";
import { URL } from "../hashRouter.js";

// login
export async function login(formData) {
  const loader = document.querySelector(".mini-loader");
  const submitBtnElm = document.querySelector(".submit-btn");
  try {
    submitBtnElm.disabled = true;
    loader.style.opacity = 1;
    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/users/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      history.pushState(null, null, URL);
      handleLocation();
      displayAlert("success", "you loged in successfully");
    } else displayAlert("error", data.message);
  } catch (err) {
    throw new Error(err);
  } finally {
    submitBtnElm.disabled = false;
    loader.style.opacity = 0;
  }
}

// logout
export async function logout() {
  try {
    document.querySelector(".isLoading").classList.remove("d-none");

    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/users/logout`,
      {
        method: "POST",
        headers: { token: `allow${localStorage.getItem("token")}` },
      }
    );

    const data = await res.json();
    if (data.status == "success") {
      localStorage.removeItem("token");
      history.pushState(null, null, `${URL}#login`);
      handleLocation();
      displayAlert("success", "you logged out successfully");
    } else {
      localStorage.removeItem("token");
      displayAlert("error", data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    document.querySelector(".isLoading").classList.add("d-none");
  }
}

// signup
export async function signup(formData) {
  const submitBtnElm = document.querySelector(".submit-btn");
  const loader = document.querySelector(".mini-loader");
  try {
    submitBtnElm.disabled = true;
    loader.style.opacity = 1;
    const res = await fetch(
      "https://sticky-tasks-back-end.vercel.app/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (data.status === "error") {
      displayAlert("error", data.message);
    } else if (data.status === "success") {
      displayAlert("success", "we have sent an email, please verify to login");
      history.pushState(null, null, `${URL}#login`);
      handleLocation();
    }
  } catch (err) {
    throw new Error(err);
  } finally {
    submitBtnElm.disabled = false;
    loader.style.opacity = 0;
  }
}

// forgetPassword
export async function forgetPassword(formData) {
  const loader = document.querySelector(".mini-loader");
  const submitBtnElm = document.querySelector(".submit-btn");
  try {
    submitBtnElm.disabled = true;
    loader.style.opacity = 1;
    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/users/forgetPassword`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();

    if (data.status == "success") {
      history.pushState(null, null, `${URL}#verifyEmail`);
      handleLocation();
    } else displayAlert("error", data.message);
  } catch (err) {
    throw new Error(err);
  } finally {
    submitBtnElm.disabled = false;
    loader.style.opacity = 0;
  }
}

// verifyEmail
export async function verifyEmail(formData) {
  const submitBtnElm = document.querySelector(".submit-btn");
  const loader = document.querySelector(".mini-loader");
  try {
    submitBtnElm.disabled = true;
    loader.style.opacity = 1;
    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/users/verifyEmail`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();

    if (data.status == "success") {
      localStorage.setItem("verifyToken", data.verifyToken);
      history.pushState(null, null, `${URL}#resetPassword`);
      handleLocation();
    } else displayAlert("error", data.message);
  } catch (err) {
    throw new Error(err);
  } finally {
    submitBtnElm.disabled = false;
    loader.style.opacity = 0;
  }
}

// resetPassword
export async function resetPassword(formData) {
  const loader = document.querySelector(".mini-loader");
  const submitBtnElm = document.querySelector(".submit-btn");
  try {
    submitBtnElm.disabled = true;
    loader.style.opacity = 1;

    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/users/resetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          verifyToken: localStorage.getItem("verifyToken"),
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();

    if (data.status == "success") {
      localStorage.removeItem("verifyToken");
      localStorage.setItem("token", data.token);
      history.pushState(null, null, URL);
      handleLocation();
      displayAlert("success", "you loged in successfully");
    } else displayAlert("error", data.message);
  } catch (err) {
    throw new Error(err);
  } finally {
    submitBtnElm.disabled = false;
    loader.style.opacity = 0;
  }
}

// get profile data api
export async function getProfile() {
  const dataLoaderElm = document.querySelector(".data-loader");
  try {
    dataLoaderElm.classList.remove("d-none");
    const res = await fetch(
      "https://sticky-tasks-back-end.vercel.app/users/profile",
      {
        headers: { token: `allow${localStorage.getItem("token")}` },
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    dataLoaderElm.classList.add("d-none");
  }
}

// update user data api
export async function updateProfile(newData) {
  const dataLoaderElm = document.querySelector(".data-loader");
  try {
    dataLoaderElm.classList.remove("d-none");

    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/users/updateProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `allow${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newData),
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    dataLoaderElm.classList.add("d-none");
  }
}

// change user password api
export async function changePassword(newData) {
  const dataLoaderElm = document.querySelector(".data-loader");
  try {
    dataLoaderElm.classList.remove("d-none");
    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/users/changePassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `allow${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newData),
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    dataLoaderElm.classList.add("d-none");
  }
}
