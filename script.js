// access main html element
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");

// to get actual city name

const getCityname = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// to get actual Date and Time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-Us", options);
  return formatter.format(curDate);
};

let city = "lalgarh";
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let takeCityname = document.querySelector(".city_name");
  console.log(takeCityname.value);
  city = takeCityname.value;
  getWeatherData();
  takeCityname.value = "";
});

//Fetch search data

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1b41a819786378e125f753ea88b05d4`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);
    const { main, name, weather, wind, sys, dt } = data;
    // console.log(main);
    //Display city name
    cityName.innerHTML = `${name} , ${getCityname(sys.country)}`;
    //Display Date and Time
    let inDegree = main.temp - 273.16;
    dateTime.innerHTML = getDateTime(dt);
    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src = "https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    //Display Temperature
    w_temperature.innerHTML = `${inDegree.toFixed(2)}&#176`;
    //Display min - Temperature
    w_minTem.innerHTML = `Min:${main.temp_min}&#176`;
    //Display min - Temperature
    w_maxTem.innerHTML = `Max:${main.temp_max}&#176`;
    w_feelsLike.innerHTML = `${main.feels_like}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_pressure.innerHTML = `${main.pressure} hpa`;
    w_wind.innerHTML = `${wind.speed} m/s`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
