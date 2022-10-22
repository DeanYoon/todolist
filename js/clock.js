const time = document.querySelectorAll(".clock");
const date = document.querySelector(".todo-summary__info div:last-child");
let num = 1;
let colon = ":";

function getTime() {
  const now = new Date(Date.now());
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const today = now.toLocaleString("en-us", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
  return { hour, minute, today };
}

function getClock() {
  const { hour, minute, today } = getTime();
  date.innerHTML = today;
  if (num % 2 === 1) {
    colon = ":";
  } else {
    colon = "  ";
  }
  time[0].innerHTML = `${hour}${colon}${minute}`;
  time[1].innerHTML = `${hour}${colon}${minute}`;
  return (num += 1);
}

getClock();
setInterval(getClock, 500);
