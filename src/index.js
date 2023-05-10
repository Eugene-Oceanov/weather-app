import './css/style.scss'

const form = document.getElementById("form");
const input = document.querySelector(".form__input");

const mainOutput = document.querySelector(".main-output");
const secondaryOutput = document.querySelector(".secondary-output")

form.onsubmit = (e) => {
    e.preventDefault();
    mainOutput.style.opacity = 0;
    mainOutput.style.transform = "translateY(-10px)"
    if (!input.value) {
        alert("Enter city name");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=6c8f0f7ad5092936c84ffa59c55956f1`)
        .then(json => json.json())
        .then(data => {
            mainOutput.innerHTML = `
                                <h3>${data.name}</h3>
                                <h1>${KtoC(data.main.temp)} C&#176</h1>
                                <p>Feels like ${KtoC(data.main.feels_like)} C&#176</p>
                                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
                                <p>${data.weather[0].description}</p>
                            `
            mainOutput.style.opacity = 1;
            mainOutput.style.transform = "translateY(0)"
            input.value = "";
        })
        .catch(error => alert("Invalid city name"))
}

function KtoC(value) {
    let Ctemp = value - 273.15;
    return Ctemp.toFixed(1);
}

// {
//   "coord": {
//     "lon": 37.6156,
//     "lat": 55.7522
//   },
//   "weather": [
//     {
//       "id": 802,
//       "main": "Clouds",
//       "description": "scattered clouds",
//       "icon": "03n"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 277.48,
//     "feels_like": 277.48,
//     "temp_min": 274.28,
//     "temp_max": 279.39,
//     "pressure": 1033,
//     "humidity": 52,
//     "sea_level": 1033,
//     "grnd_level": 1014
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 0.55,
//     "deg": 44,
//     "gust": 0.62
//   },
//   "clouds": {
//     "all": 33
//   },
//   "dt": 1683576526,
//   "sys": {
//     "type": 2,
//     "id": 2000314,
//     "country": "RU",
//     "sunrise": 1683509552,
//     "sunset": 1683566375
//   },
//   "timezone": 10800,
//   "id": 524901,
//   "name": "Moscow",
//   "cod": 200
// }