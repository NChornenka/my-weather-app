
  function searchCity(cityName) {
  let unit = "metric";
  let apiKey = "d682095eed5d0971ffeaf2a35ab9e196";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndPoint}${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);

}

  function showPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentWeather);
  }

  function showCurrentWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d682095eed5d0971ffeaf2a35ab9e196";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  }

  function showTemperature(response){
  // console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#condition").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let emoji = document.querySelector("#emoji");
  if (response.data.weather[0].main === "Clouds"){
    emoji.innerHTML = "☁️";
  }
  else if (response.data.weather[0].main === "Rain"){
    emoji.innerHTML = "🌧️";
  }
  else if (response.data.weather[0].main === "Sunny"){
    emoji.innerHTML = "☀️";
  }
  else if (response.data.weather[0].main === "Snow"){
    emoji.innerHTML = "❄️";
  }
}

  function showWeather(event){
    event.preventDefault();
    let cityName = document.querySelector("#input").value;
    searchCity(cityName);
  }

  function intoFarenheits(event){
  event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round((temperature * 9)/5 + 32);
  }

function intoCelcius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 25;
}

function formatDate(now){
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = ["January", "Ferbruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
let date = now.getDate();
return `${day}, ${month} ${date}`;
}

function formatTime(now) {
let hour = now.getHours();
hour = hour <= 9 ? "0" + hour : hour;
let minutes = now.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;
return `${hour} : ${minutes}`;
}

let dateElement = document.querySelector("#date-element");
let timeElement = document.querySelector("#time-element");
let now = new Date();
dateElement.innerHTML = formatDate(now);
timeElement.innerHTML = formatTime(now);

let search = document.querySelector("#submit");
search.addEventListener("click", showWeather);

let farenheits = document.querySelector("#farenheits");
farenheits.addEventListener("click", intoFarenheits);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", intoCelcius);

let current = document.querySelector("#current");
current.addEventListener("click", showPosition);

searchCity("New York");





