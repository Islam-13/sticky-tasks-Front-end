function displayAlert(type, text) {
  const alert = document.querySelector(".alert");
  let icon = "";

  if (type == "success") {
    icon = "bi bi-check2-circle";
  } else {
    icon = "bi bi-exclamation-circle";
  }
  const newAlert = document.createElement("div");

  newAlert.innerHTML = `
        <div class="toast ${type}">
          <i class="${icon}"></i>
          <div class="toast-content">
            <h3>${type}</h3>
            <p>${text}</p>
          </div>
        </div>
    `;

  alert.appendChild(newAlert);

  newAlert.timeOut = setTimeout(() => newAlert.remove(), 4000);
}

export default displayAlert;
