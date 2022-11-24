

let weatherDetails = document.getElementById("weatherDetails")
// let key = "8148b41f6146374821c87ff0afffba0f"
let key = "d077bb283b53dda8ddfbf29c3193c796"

let long;
let lat;

window.onload = function () {
    weatherDetails.style.display = "none";
    // weatherDetails.style.fontSize="small"

}

async function getWeatherData() {

    try {
        let city = document.querySelector("#city").value;

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);

        let data = await res.json();
        // console.log("data:", data);
        showWeather(data);


        let resultWeek = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,hourly,minutely,alert&appid=${key}&units=metric`);

        let dataWeek = await resultWeek.json();
        showWeek(dataWeek);

    } catch (err) {

        showError(err);

    }

}


function showWeek(data) {
    let cityName = document.createElement("p");

    let cont2 = document.getElementById("container2");
    cont2.innerHTML = null;

    console.log(data)

    data.daily.map(elem => {

        let card2 = document.createElement("div")
        card2.className = "card2";
        card2.style.color = "white"

        let icon = document.createElement("img")
        icon.src = `http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`
        icon.className = "icon"

        let date = document.createElement("p");
        date.innerText = dateConverter(elem.dt);
        



        let mintemp = document.createElement("p")
        mintemp.innerText = Math.round(elem.temp.min) + "°";
        mintemp.style.color = "white"

        let maxtemp = document.createElement("p")
        maxtemp.innerText = Math.round(elem.temp.max) + "°";

        let conditions = document.createElement("p");
        conditions.innerText = elem.weather[0].main;
      

        let miniDiv = document.createElement("div")
        miniDiv.className = "miniDiv"
        miniDiv.style.color = "white"

        miniDiv.append(conditions, maxtemp, mintemp)

        card2.append(date, icon, miniDiv);

        cont2.append(card2)



    })



}



function showWeather(d) {

    let hide = document.querySelector(".EnterCity")
    hide.style.display = "none"

    weatherDetails.innerHTML = "";

    weatherDetails.style.display = "block"

    let iframe = document.getElementById("gmap_canvas");

    let name = document.createElement("h2");
    name.innerText = `${d.name}`;
    name.className = "mainName";

    let temp = document.createElement("p");
    let temperature = d.main.temp;
    temp.innerText = `${Math.round(temperature)}°C`;
    temp.className = "temp";

    let pressure = document.createElement("p");
    pressure.innerText = `Pressure: ${d.main.pressure} hPa`

    let minMax = document.createElement("p")
    minMax.innerText = `High/Low: ${d.main.temp_min}/${d.main.temp_max}°`

    let humidity = document.createElement("p")
    humidity.innerText = `Humidity: ${d.main.humidity}%`

    let wind = document.createElement('p');
    wind.innerText = `Wind: ${d.wind.speed} km/h`

    let description = document.createElement("p")
    description.innerText = `Weather: ${d.weather[0].main}`

    let sunrise = document.createElement("p")
    sunrise.innerText = "Sunrise: " + timeConverter(d.sys.sunrise) + " IST";

    let sunset = document.createElement("p")
    sunset.innerHTML = "Sunset: " + timeConverter(d.sys.sunset) + " IST";

    let dets = document.createElement("div")
    dets.append(pressure, minMax, humidity, wind, description, sunrise, sunset)
    dets.className = "dets";


    weatherDetails.append(name, temp, dets);

    iframe.src = `https://maps.google.com/maps?q=${d.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    lat = d.coord.lat;
    long = d.coord.lon;

}


function showError(message) {

    console.log(message);
    weatherDetails.style.display = "none"

    alert("Looks like that city is not available. Please try another city.");


}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ':' + sec;
    return time;
}

function dateConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = weekday[a.getDay()];


    return day;
}