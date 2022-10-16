
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
  celciusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#condition").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  let dateElement = document.querySelector("#date-element");
  let timeElement = document.querySelector("#time-element");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);

  
}

  function showWeather(event){
    event.preventDefault();
    let cityName = document.querySelector("#input").value;
    searchCity(cityName);
  }

  function intoFarenheits(event){
  event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round((celciusTemperature * 9)/5 + 32);
  }

function intoCelcius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function formatDate(timestamp){
let current = new Date(timestamp);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[current.getDay()];
let months = ["January", "Ferbruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[current.getMonth()];
let date = current.getDate();
return `${day}, ${month} ${date}`;
}

function formatTime(timestamp) {
let current = new Date(timestamp);
let hour = current.getHours();
hour = hour <= 9 ? "0" + hour : hour;
let minutes = current.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;
return `${hour} : ${minutes}`;
}


let search = document.querySelector("#submit");
search.addEventListener("click", showWeather);

let celciusTemperature = null;

let farenheits = document.querySelector("#farenheits");
farenheits.addEventListener("click", intoFarenheits);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", intoCelcius);

let current = document.querySelector("#current");
current.addEventListener("click", showPosition);

searchCity("New York");





