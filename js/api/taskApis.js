export async function getTasks() {
  const dataLoaderElm = document.querySelector(".data-loader");
  try {
    dataLoaderElm.classList.remove("d-none");
    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/tasks/getTasks`,
      {
        headers: {
          "Content-Type": "application/json",
          token: `allow${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  } finally {
    dataLoaderElm.classList.add("d-none");
  }
}

export async function addTask(task) {
  const loader = document.querySelector(".mini-loader");
  const submitBtnElm = document.querySelector(".submit-btn");
  try {
    loader.style.opacity = 1;
    submitBtnElm.disabled = true;
    const res = await fetch(`https://sticky-tasks-back-end.vercel.app/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `allow${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    loader.style.opacity = 0;
    submitBtnElm.disabled = false;
  }
}

export async function editTask(editId, task) {
  const submitBtnElm = document.querySelector(".submit-btn");
  try {
    document.querySelector(".mini-loader").style.opacity = 1;
    submitBtnElm.disabled = true;

    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/tasks/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `allow${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(task),
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    document.querySelector(".mini-loader").style.opacity = 0;
    submitBtnElm.disabled = false;
  }
}

export async function editStatus(id, status) {
  const dataLoaderElm = document.querySelector(".data-loader");
  try {
    dataLoaderElm.classList.remove("d-none");
    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `allow${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(status),
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

export async function deleteTask(id) {
  const dataLoaderElm = document.querySelector(".data-loader");
  try {
    dataLoaderElm.classList.remove("d-none");

    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/tasks/${id}`,
      {
        method: "DELETE",
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

export async function clearTasks(category) {
  try {
    document.querySelector(".final-delete").disabled = true;
    document.querySelector(".clear-loader").style.opacity = 1;
    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/tasks/clearTasks/${category}`,
      {
        method: "DELETE",
        headers: { token: `allow${localStorage.getItem("token")}` },
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    document.querySelector(".final-delete").disabled = false;
    document.querySelector(".clear-loader").style.opacity = 0;
  }
}

export async function searchTasks(query = "") {
  const dataLoaderElm = document.querySelector(".data-loader");
  try {
    dataLoaderElm.classList.remove("d-none");
    const res = await fetch(
      `https://sticky-tasks-back-end.vercel.app/tasks/getTasks?search=${query}`,
      {
        headers: { token: `allow${localStorage.getItem("token")}` },
      }
    );
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err);
  } finally {
    dataLoaderElm.classList.add("d-none");
  }
}
