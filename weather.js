const weather = document.querySelector(".js-weather");

const API_KEY = "3878f48e2f3dd397bfc0ecdcd990dcd4";
const COORDS = 'coords';

function getWeather(lat, lng){
 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=imperial`).then(function(response){
     return response.json();
 }).then(function(json){
     const temperature = json.main.temp;
     const place = json.name;
     const description = json.weather[0].description;
     weather.innerText = `${Math.round(temperature)}F (${Math.round((temperature-32)*5/9)}C) ${description} @ ${place}`;
 })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Cant access geo loaction")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();