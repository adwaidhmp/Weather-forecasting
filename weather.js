
function updateDateTime() {
    let d = new Date();
    let date = `${d.getDate().toString().padStart(2, '0')},${(d.getMonth() + 1).toString().padStart(2, '0')},${d.getFullYear()}`;
    let time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    
    document.getElementById("dateandtime").textContent = `${date} ${time}`;
}

setInterval(updateDateTime, 1000);

updateDateTime();
const apikey="9dcac9c036190d2ffdbc4f54da1b80a4"
const weatherapi="https://api.openweathermap.org/geo/1.0/direct?q="
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const air = "https://api.openweathermap.org/data/2.5/air_pollution?lat="


const cityInput = document.querySelector(".inp");
const searchBtn = document.querySelector(".btn");
const weather = document.querySelector(".weathericon");

console.log(weather)


async function checkWeather(city) {
    const response = await fetch(apiurl+city+`&appid=${apikey}`)
    var data = await response.json()
    console.log(data)
    const response1 =await fetch(weatherapi+city+`&limit=1&appid=${apikey}`)
    var data1 = await response1.json()
    console.log(data1)
    let longi=data1[0].lon
    let latti = data1[0].lat
    const response2 =await fetch(`${air}${latti}&lon=${longi}&appid=${apikey}`)
    var data2= await response2.json()
    console.log(data2)
    document.querySelector(".city").innerHTML= data.name
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp)  + "°C"
    document.querySelector(".windy").innerHTML= data.wind.speed + " km/h"
    document.querySelector(".airy").innerHTML= data2.list[0].main.aqi + " AQI";
    document.querySelector(".humy").innerHTML= data.main.humidity + " %"

  if (data.weather[0].main === "Clouds") {
    weather.src = "clouds.png";
} 
else if (data.weather[0].main === "Clear") {
    weather.src = "clear.jpg";
} 
else if (data.weather[0].main === "Drizzle") {
    weather.src = "drizzle.png";
} 
else if (data.weather[0].main === "Mist") {
    weather.src = "mist.png";
} 
else if (data.weather[0].main === "Rain") {
    weather.src = "rain.png";
} 
else if (data.weather[0].main === "Snow") {
    weather.src = "snow.png";
} 
}

searchBtn.addEventListener("click",()=>{
    checkWeather(cityInput.value)
})
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(cityInput.value);
    }
});



const hour = new Date().getHours();

if (hour >= 18 || hour < 6) {
    // Nighttime gradient
    document.getElementById("bg").style.background = "linear-gradient(to bottom, black, grey)";
} else {
    // Daytime gradient
    document.getElementById("bg").style.background = "linear-gradient(to bottom, skyblue, lightgreen)";
}
