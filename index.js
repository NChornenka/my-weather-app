
  function getCity(event){
      event.preventDefault();
      let cityName = document.querySelector("#input").value;
      if (cityName === ""){
        alert("Please enter city name");
      }
      searchCity(cityName); 
      document.getElementById("input").value = null;
      
    }

function searchCity(cityName) {
  let unit = "metric";
  let apiKey = "d682095eed5d0971ffeaf2a35ab9e196";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndPoint}${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(getMetricForecast);
  document.getElementById("input").value = null;

}
function showTemperature(response){
  farenheits.classList.add("active");
  celcius.classList.remove("active");
  celciusTemperature = response.data.main.temp;
  feelsLikeTemperature = response.data.main.feels_like;
  windSpeed = response.data.wind.speed;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#feels-like").innerHTML = Math.round(feelsLikeTemperature);
  document.querySelector("#condition").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(windSpeed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let degreeIndicatorElement = document.querySelector("#degree-indicator");
  degreeIndicatorElement.innerHTML = "C";
  let windSpeedIndicatorElement = document.querySelector("#wind-speed-indicator");
  windSpeedIndicatorElement.innerHTML = "m/s";
  document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  let dateElement = document.querySelector("#date-element");
  let timeElement = document.querySelector("#time-element");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  getMetricForecast();
  
  }
  function getMetricForecast(){
    let cityName = document.getElementById("city").innerHTML;
    let units = "metric";
    let apiKey = "80e0f9db4e77fe70fa2t2749330ddo5a";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayMetricForecast);
  }

  function displayMetricForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecast = response.data.daily;
    let forecastHTML = "";
    forecast.forEach(function(forecastDay) {
      forecastHTML = forecastHTML + `        
      <div class="row text-center align-items-center">
      <div class="col-4 weather-forecast-day">
        ${formatDay(forecastDay.time)}
      </div>
      <div class="col-4">
        <img id="icon" src=${forecastDay.condition.icon_url} width="50">
      </div>
      <div class="col-4">
        <span class="max-temperature">${Math.round(forecastDay.temperature.maximum)}??</span><span class="min-temperature"> ${Math.round(forecastDay.temperature.minimum)}??</span>
      </div>
    </div>`;
    })
    forecastElement.innerHTML = forecastHTML;
  }

  function getImperialForecast(){
    let cityName = document.getElementById("city").innerHTML;
    let units = "imperial";
    let apiKey = "80e0f9db4e77fe70fa2t2749330ddo5a";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayImperialForecast);
  }

  function displayImperialForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecast = response.data.daily;
    let forecastHTML = "";
    forecast.forEach(function(forecastDay) {
      forecastHTML = forecastHTML + `        
      <div class="row text-center align-items-center">
      <div class="col-4 weather-forecast-day">
        ${formatDay(forecastDay.time)}
      </div>
      <div class="col-4">
        <img id="icon" src=${forecastDay.condition.icon_url} width="50">
      </div>
      <div class="col-4">
        <span class="max-temperature">${Math.round(forecastDay.temperature.maximum)}??</span><span class="min-temperature"> ${Math.round(forecastDay.temperature.minimum)}??</span>
      </div>
    </div>`;
    })
    forecastElement.innerHTML = forecastHTML;

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

  function intoFarenheits(event){
  event.preventDefault();
    celcius.classList.add("active");
    farenheits.classList.remove("active");

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round((celciusTemperature * 9)/5 + 32);
    let feelLikeElement = document.querySelector("#feels-like");
    feelLikeElement.innerHTML = Math.round((feelsLikeTemperature * 9)/5 +32);
    let degreeIndicatorElement = document.querySelector("#degree-indicator");
    degreeIndicatorElement.innerHTML = "F";
    let windSpeedElement = document.querySelector("#wind");
    windSpeedElement.innerHTML = Math.round(windSpeed * 2.237);
    let windSpeedIndicatorElement = document.querySelector("#wind-speed-indicator");
    windSpeedIndicatorElement.innerHTML = "mph";

    getImperialForecast();

  }

function intoCelcius(event){
  event.preventDefault();
  farenheits.classList.add("active");
  celcius.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let feelLikeElement = document.querySelector("#feels-like");
  feelLikeElement.innerHTML = Math.round(feelsLikeTemperature);
  let degreeIndicatorElement = document.querySelector("#degree-indicator");
  degreeIndicatorElement.innerHTML = "C";
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = Math.round(windSpeed);
  let windSpeedIndicatorElement = document.querySelector("#wind-speed-indicator");
  windSpeedIndicatorElement.innerHTML = "m/s";

  getMetricForecast();
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

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", getCity);

let farenheits = document.querySelector("#farenheits");
farenheits.addEventListener("click", intoFarenheits);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", intoCelcius);

let current = document.querySelector("#current");
current.addEventListener("click", showPosition);

let celciusTemperature = null;
let feelsLikeTemperature = null;
let windSpeed = null;

searchCity("New York");





