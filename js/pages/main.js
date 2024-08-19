import { handleLocation, URL } from "../hashRouter.js";
import displayAlert from "../helpers/displayAlert.js";
import debounce from "../helpers/debounce.js";
import { logout } from "../api/userApis.js";
import * as Apis from "../api/taskApis.js"

function initHomePage() {
  const formElm = document.getElementById("task-form");
  const listElm = document.querySelector(".todo-list");
  const titleElm = document.querySelector("#title");
  const priorityElm = document.querySelector("#priority");
  const categoryElm = document.querySelector("#category");
  const openerBtnElm = document.querySelector(".open-form-btn");
  const closerBtnElm = document.querySelector(".close-form-btn");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const dialog = document.querySelector("dialog");
  const logoutBtnElm = document.querySelector(".logout-btn");
  const submitBtnElm = document.querySelector(".submit-btn");
  const searchElm = document.getElementById("search");
  const clearBtnElm = document.querySelector(".clear-btn");
  const deleteDialog = document.querySelector(".delete-alert");
  const closeClearDialogElm = document.querySelector(".close-clear-dialog");
  const finalClearBtnElm = document.querySelector(".final-delete");

  let editFlag = false;
  let editId = "";
  let tasks = [];

  if (localStorage.getItem("token")) {
    Apis.getTasks().then((data) => {
      tasks = data;
      displayCategory();
    });
  } else {
    history.pushState(null, null, `${URL}#login`);
    handleLocation();
  }

  // open form
  openerBtnElm.addEventListener("click", () => dialog.showModal());

  // close form
  closerBtnElm.addEventListener("click", () => dialog.close());
  closeClearDialogElm.addEventListener("click", () => deleteDialog.close());

  // detect click outside modals or menu list and close
  document.addEventListener(
    "click",
    (e) => {
      if (!document.querySelector(".menu-list")?.contains(e.target)) {
        document
          .querySelectorAll(".menu-list")
          .forEach((menu) => menu.classList.remove("show-list"));
      }

      if (!formElm.contains(e.target)) {
        dialog.close();
        formElm.reset();
      }

      if (!document.querySelector(".delete-alert-box")?.contains(e.target)) {
        deleteDialog.close();
      }
    },
    true
  );

  // submit form
  formElm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleElm.value;
    const priority = priorityElm.value;
    const category = categoryElm.value;

    if (!title) return;

    const newTask = { title, priority, category };

    if (!editFlag) {
      Apis.addTask(newTask).then((data) => {
        tasks.push(data.data);
        dialog.close();
        displayCategory(data.message);
      });
    } else {
      Apis.editTask(editId, newTask).then((data) => {
        const index = tasks.findIndex((task) => task._id == editId);

        tasks[index] = data.data;
        dialog.close();
        displayCategory(data.message);
      });
    }
  });

  //search
  searchElm.addEventListener(
    "input",
    debounce(function() {
      if (this.value) {
        Apis.searchTasks(this.value).then((data) => {
          const msg = `There are no tasks with name "${this.value}"`;
          if (!data.length) {
            listElm.innerHTML = `<p class="empty-msg">${msg}</p>`;
            clearBtnElm.classList.add("d-none");
            return;
          }

          filterBtns.forEach((btn) => {
            if (btn.classList.contains("active") && btn.textContent == "all") {
              displayTasks(data);
            } else if (btn.classList.contains("active")) {
              const filtered = data.filter(
                (task) => task.category == btn.textContent
              );
              if (!filtered.length) {
                listElm.innerHTML = `<p class="empty-msg">${msg}</p>`;
                clearBtnElm.classList.add("d-none");
                return;
              } else displayTasks(filtered);
            }
          });
        });
      } else {
        document.querySelector(".empty-msg")?.remove();
        displayCategory();
      }
    }, 700)
  );

  // category filter
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      //remove active class from all btns
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      //add active class to the clicked btn
      btn.classList.add("active");
      //display tasks according to the clicked btn category
      displayCategory();
    });
  });

  // confirmation modal before clearing tasks
  clearBtnElm.addEventListener("click", () => deleteDialog.showModal());

  // clear tasks
  finalClearBtnElm.addEventListener("click", () => {
    filterBtns.forEach((btn) => {
      if (btn.classList.contains("active")) {
        Apis.clearTasks(btn.textContent).then((data) => {
          if (btn.textContent == "all") {
            tasks = [];
          } else {
            tasks = tasks.filter((task) => task.category != btn.textContent);
          }
          displayCategory(data.message);
          deleteDialog.close();
        });
      }
    });
  });

  // log out the app
  logoutBtnElm.addEventListener("click", logout);

  //functions
  function createTaskList(data) {
    const element = document.createElement("div");
    const checked = data.status === "completed" ? "checked" : "not";

    element.innerHTML = `
      <div class="todo-item ${data.status}">
        <input type="checkbox" name="" id="${data._id}" class="check-box" ${checked}/>
        <label for="${data._id}" class="item">
          <div class="check">
            <i class="bi bi-circle"></i>
            <i class="bi bi-check2-circle"></i>
          </div>
        </label>
        <p class='task-title'>${data.title}</p>
        <span class="status ${data.category}"></span>
        <span class="priority ${data.priority}">${data.priority}</span>
        <div class="menu">
          <button aria-label="Menu button" class="menu-btn btn"><i class="bi bi-three-dots-vertical"></i></button>
          <ul class="menu-list">
            <li> <button class="edit-btn"> <i class="bi bi-pen"></i> Edit</button> </li>
            <li> <button class="delete-btn"> <i class="bi bi-trash3"></i> Delete</button> </li>
          </ul>
        </div>
      </div>`;

    const menuBtn = element.querySelector(".menu-btn");
    const menuList = element.querySelector(".menu-list");
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    const checkbox = element.querySelector(".check-box");

    //delete task
    deleteBtn.addEventListener("click", () => {
      Apis.deleteTask(data._id).then((newData) => {
        tasks = tasks.filter((task) => task._id !== data._id);
        displayCategory(newData.message);
      });
    });

    //edit task
    editBtn.addEventListener("click", () => {
      menuList.classList.remove("show-list");
      submitBtnElm.innerHTML = `<span class="mini-loader"></span> Edit`;

      editFlag = true;
      editId = data._id;
      titleElm.value = data.title;
      categoryElm.value = data.category;
      priorityElm.value = data.priority;
      dialog.showModal();
    });

    //edit task status
    checkbox.addEventListener("click", () => {
      let status = checked == "checked" ? "pending" : "completed";

      Apis.editStatus(data._id, { status }).then((newData) => {
        const index = tasks.findIndex((task) => task._id == data._id);

        tasks[index] = newData.data;
        displayCategory(newData.message);
      });
    });

    menuBtn.addEventListener("click", () => {
      const allMenuList = document.querySelectorAll(".menu-list");

      if (menuList.classList.contains("show-list")) {
        menuList.classList.remove("show-list");
      } else {
        allMenuList.forEach((lists) => {
          lists.classList.remove("show-list");
        });

        menuList.classList.add("show-list");
      }
    });

    listElm.appendChild(element);
  }

  function displayTasks(tasks) {
    if (tasks.length) {
      listElm.innerHTML = "";
      tasks.forEach((task) => {
        createTaskList(task);
      });
    }
  }

  function filterTasks(category) {
    const msg = `There are no tasks have been added to ${category} category yet.🧐`;
    if (!tasks.length) {
      listElm.innerHTML = `<p class="empty-msg">${msg}</p>`;
      return;
    }

    const data = tasks.filter((task) => task.category == category);
    handleSearchAndClear(data, msg);
  }

  function displayCategory(message) {
    filterBtns.forEach((btn) => {
      if (btn.classList.contains("active") && btn.textContent == "all") {
        const msg = `There are no tasks yet, click new task to start creating a new one. 🤩`;
        handleSearchAndClear(tasks, msg);
      } else if (btn.classList.contains("active")) {
        filterTasks(btn.textContent);
      }
    });

    if (!message) return;
    displayAlert("success", message);
  }

  // show and hide search bar and clear button according to tasks
  function handleSearchAndClear(arr, msg) {
    if (!arr.length) {
      listElm.innerHTML = `<p class="empty-msg">${msg}</p>`;
      clearBtnElm.classList.add("d-none");
      document.querySelector(".search-query").classList.add("d-none");
    } else if (arr.length == 1) {
      clearBtnElm.classList.add("d-none");
      document.querySelector(".search-query").classList.add("d-none");
      displayTasks(arr);
    } else {
      clearBtnElm.classList.remove("d-none");
      document.querySelector(".search-query").classList.remove("d-none");
      displayTasks(arr);
    }
  }
}
export { initHomePage };