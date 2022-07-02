const API_KEY = '005f235fb8f211ddba4217fd7c8a6ede';

// Show Spinner Function 
const showSpinner = (displayValue) => {
    document.getElementById('spinner').style.display = displayValue;
}

const getInput = () => {
    const inputCity = document.getElementById('input-city');
    const inputCityValue = inputCity.value;
    loadWeather(inputCityValue);
    inputCity.value = '';
    document.getElementById('display').textContent = '';
    showSpinner('block');
}

const loadWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);
}

const displayWeather = (data) => {
    if (data.cod == 200) {
        // temparatur = parseInt(data.main.temp - 273.15);
        const displayContainer = document.getElementById('display');
        // displayContainer.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card mb-3 mx-auto bg-info bg-opacity-50" style="width: 20rem;">
       <!-- <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" 
        class="card-img-top rounded mx-auto" style="height: 10rem; width: 10rem;" alt="..."> -->

        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
        class="card-img-top rounded mx-auto" style="height: 10rem; width: 10rem;" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${data.name}</h5>
            <p class="card-text text-center">${parseInt(data.main.temp)}° C</p>
            <p class="card-text text-center">${data.weather[0].main}</p>
        </div>
    </div>
    `;
        displayContainer.appendChild(div);
        alert('City Added Succefully');
    } else {
        alert('Please Enter Valid City');
    }
    showSpinner('none');
}