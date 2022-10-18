const toDoForm = document.querySelector("#todo-form");
const toDoClick = document.querySelector("#todo-form i");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");
const total_num = document.querySelector("#total_num");
const completed_num = document.querySelector("#completed_num");

let toDos = [];
const TODOS_KEY = "todos";
const clicked = "line-through";
const checked = "clicked";

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const { hour, minute } = getTime();
  if (newToDo !== "") {
    const newTodoObj = {
      text: newToDo,
      id: Date.now(),
      time: `${hour}:${minute}`,
      done: false,
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
    updateSummary();
  }
}

function paintToDo(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const icon_box = document.createElement("div");
  const check_icon = document.createElement("i");
  const delete_icon = document.createElement("i");
  const record_time = document.createElement("div");
  const example = document.createAttribute("div");
  li.id = todo.id;
  record_time.id = "time-record";
  icon_box.className = "icon-box";

  li.appendChild(record_time);

  li.appendChild(span);
  li.appendChild(icon_box);

  icon_box.appendChild(check_icon);
  icon_box.appendChild(delete_icon);

  check_icon.className = "fas fa-check";
  delete_icon.className = "fas fa-trash delete";
  record_time.innerHTML = todo.time;
  span.innerText = todo.text;

  if (todo.done === true) {
    span.classList.add(clicked);

    check_icon.classList.add(checked);
  }

  delete_icon.addEventListener("click", deleteTodo);
  check_icon.addEventListener("click", checkTodo);
  toDoList.prepend(li);
}

function updateSummary() {
  finishedTodo = toDos.filter((toDo) => toDo.done === true);
  total_num.innerHTML = toDos.length;
  completed_num.innerHTML = finishedTodo.length;
}

function checkTodo(event) {
  li = event.target.parentElement.parentElement;
  span = li.querySelector("li>span");
  check_icon = li.querySelector(".icon-box > i:first-child");
  span.classList.toggle(clicked);
  check_icon.classList.toggle(checked);
  console.log(li.id);
  const booleanValue = toDos.find((toDo) => toDo.id === parseInt(li.id)).done;
  if (booleanValue) {
    toDos.find((toDo) => toDo.id === parseInt(li.id)).done = false;
  } else {
    toDos.find((toDo) => toDo.id === parseInt(li.id)).done = true;
  }

  saveToDos();
  updateSummary();
}

function deleteTodo(event) {
  li = event.target.parentElement.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  updateSummary();
}

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

toDoForm.addEventListener("submit", handleToDoSubmit);
toDoClick.addEventListener("click", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach((item) => {
    paintToDo(item);
  });
  updateSummary();
}
