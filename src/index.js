import './css/style.scss'

const form = document.getElementById("form");
const input = document.querySelector(".form__input");
const outputBlock = document.getElementById("output-block");

form.onsubmit = (e) => {
    e.preventDefault();
    outputBlock.style.opacity = 0;
    outputBlock.style.transform = "translateY(-10px)"
    if (!input.value) {
        alert("Enter city name");
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=6c8f0f7ad5092936c84ffa59c55956f1`)
            .then(json => json.json())
            .then(data => {
                console.log(data)
                outputBlock.innerHTML = `
                                            <h3>${data.name}</h3>
                                            <h1>${KtoC(data.main.temp)} C&#176</h1>
                                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
                                            <p>${data.weather[0].description}</p>
                                        `
                outputBlock.style.opacity = 1;
                outputBlock.style.transform = "translateY(0)"
                input.value = "";
            })
            .catch(error => alert("Invalid city name"))
    }
}

function KtoC(value) {
    let Ctemp = value - 273.15;
    return Ctemp.toFixed(1);
}