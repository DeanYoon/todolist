const weather = document.querySelectorAll(".weather");
const city = document.querySelectorAll(".city");
const temperature = document.querySelectorAll(".temperature");
const airPollution = document.querySelectorAll(
  ".status-bar__column i:last-child"
);

const API_KEYS = "8b2e178a08521fae2ea030a274060096";

const airPollutionIconList = [
  "far fa-grin-beam",
  "far fa-smile",
  "far fa-meh",
  "far fa-frown",
  "far fa-dizzy",
];

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric&lang=kr`;
  const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEYS}`;

  Promise.all([
    fetch(url).then((response) => response.json()),
    fetch(airPollutionUrl).then((response) => response.json()),
  ]).then((data) => {
    const weatherData = data[0];
    const airData = data[1];
    const weatherIcon = weatherData.weather[0].icon;
    const airPollutionLevel = airData.list[0].main.aqi;
    const airInfo = airData.list[0].components;
    const airPollutionIcon = airPollutionIconList[airPollutionLevel - 1];

    let airInfoList = [];
    for (let i = 0; i < Object.keys(airInfo).length; i++) {
      airInfoList.push(
        `${Object.keys(airInfo)[i]}:${Object.values(airInfo)[i]}`
      );
    }
    let airInfoTitle = airInfoList.toString().replaceAll(",", " ");
    airInfoTitle += " ";

    for (let i = 0; i < 2; i++) {
      weather[
        i
      ].src = ` http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      city[i].innerHTML = weatherData.name;
      temperature[i].innerHTML = `${weatherData.main.temp}'C`;
      airPollution[i].className = airPollutionIcon;
      airPollution[i].title = airInfoTitle;
    }
  });
}
function onGeoError() {
  alert("Can't find your location");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
