const API_KEY = "005f235fb8f211ddba4217fd7c8a6ede";

// Display Local Storage
const displayWeatherLocalStorage = () => {
  const data = getWeatherLocalStorage();
  const reverseData = Object.keys(data).reverse();
  reverseData.forEach((city) => {
    displayWeatherForLocal(data[city]);
  });
};

// Show Spinner Function
const showSpinner = (displayValue) => {
  document.getElementById("spinner").style.display = displayValue;
};

const getInput = () => {
  const inputCity = document.getElementById("input-city");
  const inputCityValue = inputCity.value;
  loadWeather(inputCityValue);
  inputCity.value = "";
  //   document.getElementById("display").textContent = "";
  showSpinner("block");
};

const loadWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  // Display Weather
  displayWeather(data);

  // Set Local Storage
  if (data.cod == 200) {
    weatherCity = data["name"];
    setWeatherLocalStorage(weatherCity, data);
  }
};

// Display Weather in UI
const displayWeather = (data) => {
  if (data.cod == 200) {
    // temparatur = parseInt(data.main.temp - 273.15);
    const displayContainer = document.getElementById("display");
    displayContainer.textContent = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mb-3 mx-auto bg-info bg-opacity-50" style="width: 20rem;">
       <!-- <img src="http://openweathermap.org/img/w/${
         data.weather[0].icon
       }.png" 
        class="card-img-top rounded mx-auto" style="height: 10rem; width: 10rem;" alt="..."> -->

        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" 
        class="card-img-top rounded mx-auto" style="height: 10rem; width: 10rem;" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${data.name}</h5>
            <p class="card-text text-center">${parseInt(data.main.temp)}° C</p>
            <p class="card-text text-center">${data.weather[0].main}</p>
        </div>
        <button onclick="deleteItem('${
          data.name
        }')" type="button" class="btn btn-danger">Delete</button>
    </div>
    `;
    displayContainer.appendChild(div);
    alert("City Added Succefully");
  } else {
    alert("Please Enter Valid City");
  }
  displayWeatherLocalStorage();
  showSpinner("none");
};

// Display Weather for Local Storage
// For Handeling alert massage
const displayWeatherForLocal = (data) => {
  if (data.cod == 200) {
    // temparatur = parseInt(data.main.temp - 273.15);
    const displayContainer = document.getElementById("display");
    // displayContainer.textContent = '';
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card mb-3 mx-auto bg-info bg-opacity-50" style="width: 20rem;">
         <!-- <img src="http://openweathermap.org/img/w/${
           data.weather[0].icon
         }.png" 
          class="card-img-top rounded mx-auto" style="height: 10rem; width: 10rem;" alt="..."> -->
         
          <img src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" 
          class="card-img-top rounded mx-auto" style="height: 10rem; width: 10rem;" alt="...">
          <div class="card-body">
              <h5 class="card-title text-center">${data.name}</h5>
              <p class="card-text text-center">${parseInt(
                data.main.temp
              )}° C</p>
              <p class="card-text text-center">${data.weather[0].main}</p>
          </div>
        <button onclick="deleteItem('${
          data.name
        }')" type="button" class="btn btn-danger">Delete</button>
      </div>
      `;
    displayContainer.appendChild(div);
  }
  showSpinner("none");
};

// Get Weather From Local Storage
const getWeatherLocalStorage = () => {
  const weather = localStorage.getItem("weather");
  let weatherObj;
  if (weather) {
    weatherObj = JSON.parse(weather);
  } else {
    weatherObj = {};
  }
  return weatherObj;
};

// Set weather in Local Storage
const setWeatherLocalStorage = (city, data) => {
  let weatherObj = getWeatherLocalStorage();
  weatherObj[city] = data;
  const weatherObjStringified = JSON.stringify(weatherObj);
  localStorage.setItem("weather", weatherObjStringified);
};

displayWeatherLocalStorage();

// Delete Item
const deleteItem = (city) => {
  weatherObj = getWeatherLocalStorage();
  weatherKey = Object.keys(weatherObj);
  const data = weatherKey.filter((data) => data !== city);
  newObj = {};
  if (data) {
    for (const weather of data) {
      newObj[weather] = weatherObj[weather];
    }
  }
  localStorage.setItem("weather", JSON.stringify(newObj));
  document.getElementById("display").textContent = "";
  displayWeatherLocalStorage();
};
