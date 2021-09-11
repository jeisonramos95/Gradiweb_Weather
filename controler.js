const xhr_weather_bogota = new XMLHttpRequest();
const xhr_weather_paris = new XMLHttpRequest();
const xhr_forecast_bogota = new XMLHttpRequest();

const api_key = "4769180261ceb844d057c0ab62744555";
const city_name1 = "bogota";
const city_name2 = "paris";
const units = "metric";
const exclude = "minutely,hourly,current";
const lat = 4.6097;
const lon = -74.0817;

const api_url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city_name1}&appid=${api_key}&units=${units}`;
const api_url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city_name2}&appid=${api_key}&units=${units}`;
const api_forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}4&exclude=${exclude}&appid=${api_key}&units=${units}`;

xhr_weather_bogota.addEventListener("load", onRequetHandler);
xhr_weather_bogota.open("GET", api_url1);
xhr_weather_bogota.send();

xhr_weather_paris.addEventListener("load", onRequetHandler);
xhr_weather_paris.open("GET", api_url2);
xhr_weather_paris.send();

xhr_forecast_bogota.addEventListener("load", onRequetHandler);
xhr_forecast_bogota.open("GET", api_forecast);
xhr_forecast_bogota.send();

function onRequetHandler() {
  if (this.readyState === 4 && this.status === 200) {
    console.log(JSON.parse(this.response));
  }
}