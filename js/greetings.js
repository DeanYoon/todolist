const loginForm = document.querySelector(".login form");
const loginInput = document.querySelector(".input_username input");
const loginPassword = document.querySelector(".input_password input");
const screenLogin = document.querySelector(".login");
const todo = document.querySelector(".todo");
const todoName = document.querySelector("#username");
const logoutBtn = document.querySelector(".logout");

const HIDDEN_CLASSNAME = "hidden";
const FLIP_CLASSNAME = "flip";
const BACKFLIP_CLASSNAME = "back-flip";
const USERNAME_KEY = "username";

let savedUsername = localStorage.getItem(USERNAME_KEY);

async function onLoginSubmit(event) {
  event.preventDefault();
  username = loginInput.value;
  loginInput.value = "";
  loginPassword.value = "";
  localStorage.setItem(USERNAME_KEY, username);
  screenLogin.classList.add(FLIP_CLASSNAME);
  await sleep(500);
  screenLogin.classList.add(HIDDEN_CLASSNAME);
  screenLogin.classList.remove(FLIP_CLASSNAME);
  todo.classList.add(BACKFLIP_CLASSNAME);
  paintGreetings(username);
}

async function paintGreetings(name) {
  todo.classList.remove(HIDDEN_CLASSNAME);
  todoName.innerHTML = name;
  await sleep(300);
  todo.classList.remove(BACKFLIP_CLASSNAME);
}

async function deleteUser() {
  localStorage.removeItem(USERNAME_KEY);
  todo.classList.add(FLIP_CLASSNAME);
  await sleep(500);
  todo.classList.add(HIDDEN_CLASSNAME);
  screenLogin.classList.remove(HIDDEN_CLASSNAME);
  screenLogin.classList.add(BACKFLIP_CLASSNAME);
  await sleep(300);
  todo.classList.remove(FLIP_CLASSNAME);
  screenLogin.classList.remove(BACKFLIP_CLASSNAME);
  savedUsername = null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

if (savedUsername === null) {
  screenLogin.classList.remove(HIDDEN_CLASSNAME);
} else {
  paintGreetings(savedUsername);
}
loginForm.addEventListener("submit", onLoginSubmit);
logoutBtn.addEventListener("click", deleteUser);
