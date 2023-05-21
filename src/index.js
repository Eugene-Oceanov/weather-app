import './css/style.scss';
import locationIMG from "./assets/img/location.png";
import dateIMG from "./assets/img/calendar.png";
import windIMG from "./assets/img/wind.png";
import arrowIMG from "./assets/img/arrow.png";
import barometerIMG from "./assets/img/barometer.png";
import cloudIMG from "./assets/img/cloud.png";

const form = document.getElementById("form");
const input = document.querySelector(".form__input");
const output = document.getElementById("output");
const apiKey = "6c8f0f7ad5092936c84ffa59c55956f1";

form.onsubmit = (e) => {
    e.preventDefault();
    output.style.opacity = 0;
    output.style.transform = "translateY(-10px)";
    output.innerHTML = "";
    if (!input.value) {
        alert("Enter city name");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`)
        .then(json => json.json())
        .then(data => {
            const mainOutput = document.createElement("DIV");
            mainOutput.classList.add("main-output");
            mainOutput.innerHTML = `
                            <div class="inner location-inner">
                                <h3 class="city-name"><img src="${locationIMG}">  ${data.name}</h3>
                                <p><img src="${dateIMG}"> ${getLocalTime(data.timezone)}</p>
                            </div>
                            <div class="inner">
                                <h2>${KtoC(data.main.temp)}&#176C</h2>
                                <h3>${data.weather[0].main}</h3>
                                <p>Feels like ${KtoC(data.main.feels_like)}&#176C</p>
                                <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].icon}.png">
                            </div>`;
            output.appendChild(mainOutput);

            const detailedOutput = document.createElement("DIV");
            detailedOutput.classList.add("detailed-output");
            detailedOutput.innerHTML = `<div class="inner wind-inner">
                                            <img src="${windIMG}" alt="wind.png" class="detailed-inner-icon">
                                            <h4>Gust ${data.wind.gust} m/s</h4>
                                            <h3><img src="${arrowIMG}" alt="arrow.png" style="transform: rotate(${data.wind.deg}deg"> ${data.wind.speed} m/s</h3>
                                        </div>
                                        <div class="inner wind-inner">
                                            <img src="${barometerIMG}" alt="barometer.png" class="detailed-inner-icon">
                                            <h3>${data.main.pressure} hPa</h3>

                                        </div>
                                        <div class="inner wind-inner">
                                            <img src="${cloudIMG}" alt="cloud.png" class="detailed-inner-icon">
                                            <h4>${data.weather[0].description}</h4>
                                            <h3>${data.clouds.all} %</h3>
                                            
                                        </div>`;
            output.appendChild(detailedOutput);

            output.style.opacity = 1;
            output.style.transform = "translateY(0)";
            input.value = "";
        })
        .catch(error => {
            alert("Invalid city name");
            console.log(error);
        })
}

function KtoC(value) {
    let Ctemp = value - 273.15;
    return Ctemp.toFixed(1);
}

function getLocalTime(timezone) {
    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let date = new Date();
    let timezoneOffsetSeconds = timezone;
    date.setTime(date.getTime() + (timezoneOffsetSeconds * 1000));
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    hours < 10 ? hours = `0${hours}` : hours = hours;
    minutes < 10 ? minutes = `0${minutes}` : minutes = minutes;
    return `${week[date.getUTCDay()]}, ${hours}:${minutes}`;
}
