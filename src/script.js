//här är funktione som hämtar data och det temperaturen för den stad som man söker på
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  //den här raden göra att när man byter ut h1:an i html koden, men har skivit staden med olika stora bokstäver kommer den att skira ut standen som den är skriven i api datan
  cityElement.innerHTML = response.data.city;

  // hämtar date och tid från apiet (vi kalla rpå funktionen under som gör om datumet till mänsklig variant)
  timeElement.innerHTML = formatDate(date);

  //den här raden lägger in beskrivning av vänder där id:et description finns i Html konden
  descriptionElement.innerHTML = response.data.condition.description;

  // hämtar humidity från apiet
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  // hämtar wind speed från apiet
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  // hämtar icon url från apiet
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  //här tar avrundar jag temperaturen
  temperatureElement.innerHTML = Math.round(temperature);
}

// det här är en funktion som jag om datumet till männsklig version.
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  //den här gör så att det adderas en noll om minuterna är mellan 0-9
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

//Under är funktionen som tar emot värdet av searchInput.valu för att veta vilke data den ska hämta och ge rätt temperatur
function searchCity(city) {
  let apiKey = "f05305048t7o8a4bff3e9ed36524a3e5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //Koden under be vi axios att hämta data ifrån apiUrl och skicka det till en ny funktion som vi skapat refreshWeather
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  //Raden under kallar på en annan funktion som heter searchCity och ger den värdet av searchinput.value
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Stockholm");
