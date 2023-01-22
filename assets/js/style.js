const APIKey = "95c2b51114b0df107ba878d1ba289bbc";
// let cities = [];
let currentDay = dayjs().format('MMM DD, YYYY');
let date = document.getElementById('date');
date.innerHTML='Today is ' + currentDay;


// sets the cities into the local storage
// function setCitiesFromLocalStorage() {
//     localStorage.setItem('cities', JSON.stringify(cities));
// }
// get the cities from local storage
// function citiesLocalStorage() {
//     cities = parseJSON(localStorage.getItem('cities')) || [];
// }

function getCities(){
    let currentCity = document.getElementById('city-weather');
    let temp = document.getElementById('temperature');
    let hum = document.getElementById('humidity');
    let win = document.getElementById('wind');
    let city = document.getElementById('city-input').value;
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    

    fetch(weatherURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        currentCity.innerHTML = data.name
        temp.innerHTML = data.main.temp + " °F"
        hum.innerHTML = data.main.humidity + " %"
        win.innerHTML = data.wind.speed + " MPH"
    })
    forecast(city);
}

function forecast(){
    let forecast = document.getElementById('forecast');
    let headers = new Headers();
    let city = document.getElementById('city-input').value;
    // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // const d = new Date();
    // let day = weekday[d.getDay()];
    // for (let i=0; i<day.length; i++);
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?/daily?q=${city}&cnt=5&units=imperial&APPID=${APIKey}`;
    
    // return fetch(forecastURL, {
    //     method: 'GET',
    //     headers: headers 
    // }).then(data => {
    //     return data.json();
    // })
    
    fetch(forecastURL)
    .then(function(response){
        console.log(response)
        return response.json();
        
    })
    .then(function(data){
        console.log(data);

    })
}
forecast()
