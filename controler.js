window.addEventListener("load", function () {
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
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const api_url_bgt = `https://api.openweathermap.org/data/2.5/weather?q=${city_name1}&appid=${api_key}&units=${units}`;
  const api_url_paris = `https://api.openweathermap.org/data/2.5/weather?q=${city_name2}&appid=${api_key}&units=${units}`;
  const api_forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}4&exclude=${exclude}&appid=${api_key}&units=${units}`;

  xhr_weather_bogota.addEventListener("load", onRequetHandlerBGT);
  xhr_weather_bogota.open("GET", api_url_bgt);
  xhr_weather_bogota.send();

  xhr_weather_paris.addEventListener("load", onRequetHandlerParis);
  xhr_weather_paris.open("GET", api_url_paris);
  xhr_weather_paris.send();

  xhr_forecast_bogota.addEventListener("load", onRequetHandlerBGTForecast);
  xhr_forecast_bogota.open("GET", api_forecast);
  xhr_forecast_bogota.send();

  function onRequetHandlerBGTForecast() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.response);
      let tableRef = document.getElementById("table-forecast");
      let currentTime = new Date();
      let newDate = new Date();

      for (let i = response.daily.length - 1; i >= 0; i--) {
        let newRow = tableRef.insertRow(0);
        newRow.className = "row-forecast";
        newDate.setDate(currentTime.getDate() + i);
        const weekDay = newDate.getDay();
        const day = currentTime.getDate() + i;
        const month = currentTime.getMonth() + 1;
        const year = currentTime.getFullYear();
        const date = day + "/" + month + "/" + year;
        const str = response.daily[i].temp.min + "° / " + response.daily[i].temp.max + "°";

        let newCell1 = newRow.insertCell(0);
        let newText1 = document.createTextNode(weekDays[weekDay] + ",  " + date);
        newCell1.appendChild(newText1);

        let img = document.createElement("img");
        img.src = `./img/icons/${response.daily[i].weather[0].icon}.png`;
        img.className = "img-forecast";
        let newCell2 = newRow.insertCell(1);
        newCell2.appendChild(img);

        let newCell3 = newRow.insertCell(2);
        let newText3 = document.createTextNode(str);
        newCell3.appendChild(newText3);

        let newCell4 = newRow.insertCell(3);
        let newText4 = document.createTextNode(response.daily[i].weather[0].description.charAt(0).toUpperCase() + response.daily[i].weather[0].description.slice(1));
        newCell4.appendChild(newText4);
      }
    }
  }

  function onRequetHandlerBGT() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.response);
      this.temperatureBgt = response.main.temp;

      document.getElementById("temperature-bgt").innerHTML = "-  " + response.main.temp + "°";
      document.getElementById("tpm-description-bgt").innerHTML =
        response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1);

      let img = document.createElement("img");
      img.src = `./img/icons/${response.weather[0].icon}.png`;
      document.getElementById("img-container-bgt").appendChild(img);
    }
  }

  function onRequetHandlerParis() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.response);
      this.temperatureBgt = response.main.temp;

      document.getElementById("temperature-paris").innerHTML = "-  " + response.main.temp + "°";
      document.getElementById("tpm-description-paris").innerHTML =
        response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1);

      let img = document.createElement("img");
      img.src = `./img/icons/${response.weather[0].icon}.png`;
      document.getElementById("img-container-paris").appendChild(img);
    }
  }
});
