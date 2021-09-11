const xhr = new XMLHttpRequest();

const api_key = "c34c0be75d738319471625b318a4ef4d";
const city_name = "bogota";
const api_url = `api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;

function onRequetHandler() {
  if (this.readyState === 4 && this.status === 200) {
    console.log(this.response);
  }
}

xhr.addEventListener("load", onRequetHandler);
xhr.open("GET", api_url);
xhr.send();
