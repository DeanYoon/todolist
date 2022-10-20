API_KEYS = "8b2e178a08521fae2ea030a274060096";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric&lang=kr`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelectorAll(".weather");
      const city = document.querySelectorAll(".city");
      const temperature = document.querySelectorAll(".temperature");
      const weatherIcon = data.weather[0].icon;

      for (let i = 0; i < 2; i++) {
        weather[
          i
        ].src = ` http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        city[i].innerHTML = data.name;
        temperature[i].innerHTML = `${data.main.temp}'C`;
      }
    });
}

function onGeoError() {
  alert("Can't find your location");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
