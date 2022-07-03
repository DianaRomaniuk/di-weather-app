// first - show current date and time in First row
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  // minutes
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  // day
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  // month
  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[monthIndex];
  //  year
  let year = date.getFullYear();

  // day
  let dateCur = date.getDate(); //day of the month (current day)

  return ` ${day}, ${dateCur} ${month} ${year}, ${hour}:${minutes}`;
}

// Weather API

function showWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#heading");
  city.innerHTML = response.data.name;
  console.log(city);

  celsiusTemperature = response.data.main.temp;

  let currentTemp = document.querySelector("#today-temperature");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let tempFeels = document.querySelector("#tempFeels");
  tempFeels.innerHTML = Math.round(response.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#today-weather-item-day-hour");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "882b5be45f109746cefd754c31cdf40b";
  let unitMetric = "units=metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?`;
  let cityURL = `${url}q=${city}&${unitMetric}&appid=${apiKey}`;

  if (city !== "") {
    axios.get(cityURL).then(showWeather);
  } else {
    alert("Enter another name of city");
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#form-input");
  search(inputCity.value);
}

let form = document.querySelector("#formaa");
form.addEventListener("submit", handleSubmit);

// Current Location button that uses the Geolocation API

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "882b5be45f109746cefd754c31cdf40b";
  let url = `https://api.openweathermap.org/data/2.5/weather?`;
  let unitMetric = "units=metric";
  // let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&${unitMetric}`;
  let apiURL = `${url}lat=${lat}&lon=${lon}&appid=${apiKey}&${unitMetric}`;
  axios.get(apiURL).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityBtn = document.querySelector("#current-btn");
currentCityBtn.addEventListener("click", getCurrentPosition);

// Format Day

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
  console.log(days);
}

//  DAILY FORECAST

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
     <div class="forecast-wrap">
       <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
       <img src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png" alt="" class="icon" width="55"/>
       <div class="temperature-forecast">
        <span class="max-temp-forecast">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="min-temp-forecast">${Math.round(
          forecastDay.temp.min
        )}°</span>
       </div>
       
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Celsius to F

function toFar(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#today-temperature");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "882b5be45f109746cefd754c31cdf40b";
  let unitMetric = "units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&${unitMetric}`;
  axios.get(apiUrl).then(displayForecast);
}

//  F to Celsius

function toC(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
console.log(celsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", toFar);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toC);

let forecast = null;

// Generalised
search("Kyiv");
