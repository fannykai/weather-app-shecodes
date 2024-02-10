//här är funktione som hämtar data och det temperaturen för den stad som man söker på
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  console.log(response.data);

  //den här raden göra att när man byter ut h1:an i html koden, men har skivit staden med olika stora bokstäver kommer den att skira ut standen som den är skriven i api datan
  cityElement.innerHTML = response.data.city;

  //den här raden lägger in beskrivning av vänder där id:et description finns i Html konden
  descriptionElement.innerHTML = response.data.condition.description;

  // hämtar humidity från apiet
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  //här tar avrundar jag temperaturen
  temperatureElement.innerHTML = Math.round(temperature);
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
