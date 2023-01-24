// Variables 
const APIKey = "d5cc78d0b6aec4cbbab956d440c97089";
let currentDay = dayjs().format('MMM DD, YYYY');
let date = document.getElementById('date');
let forecastEl = document.querySelectorAll(".fore");

let icon = document.querySelectorAll('.weather-icon');
let cities = JSON.parse(localStorage.getItem('cities')) || [];
// displays the date on the top of the page
date.innerHTML='Today is ' + currentDay;


// sets the cities into the local storage
// function setCitiesFromLocalStorage(newCity) {
//     cities.push(newCity);
//     localStorage.setItem('cities', JSON.stringify(cities));
// }
// get the cities from local storage
// function citiesLocalStorage() {
//     for(let i = 0; i < cities.length; i++) {
//         var container = document.createElement('div');
//         container.classList.add('card');
//         container.classList.add('border', 'border-dark', 'rounded')
//     }
// }

// function to display the city searched name, tempature, humidity, and wind speed
function getCities(){
    // variables for the function
    let currentCity = document.getElementById('city-weather');
    let temp = document.getElementById('temperature');
    let hum = document.getElementById('humidity');
    let win = document.getElementById('wind');
    let city = document.getElementById('city-input').value;
    // the url the weather for today for the city that was searched
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    
    
// fetchs the weather from the url and then turns it into date to then be displayed on the page
    fetch(weatherURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        // setCitiesFromLocalStorage(data.name);
        currentCity.innerHTML = data.name
        temp.innerHTML = data.main.temp + " °F"
        hum.innerHTML = data.main.humidity + " %"
        win.innerHTML = data.wind.speed + " MPH"
    })
}
// function that displays the five day forecast
function forecast(){
  
    let city1 = document.getElementById('city-input').value;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city1}&units=imperial&appid=${APIKey}`;

    fetch(forecastURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.list);
        const days = data.list.filter(day => day.dt_txt.includes('12:00:00')===true);
        console.log(days);
  let fore = document.querySelector('#forecast');     
        fore.innerHTML = ''; 

        for(let i = 0; i < days.length; i++) {
            var container = document.createElement('div');
            container.classList.add('card','col');
            container.classList.add('border', 'border-dark', 'rounded');
            
            var date = days[i].dt;
            var dt = new Date(date * 1000);
            var datec = document.createElement("h2");
            datec.textContent = (dayjs(dt).format('MMM DD'));
            // var day = document.createElement('h2');
            // day.textContent = days[i].weekDay;
            // day.classList.add('day');

            var temp = document.createElement('p');
            temp.textContent = days[i].main.temp + ' °F';

            var hum = document.createElement('p');
            hum.textContent = days[i].main.humidity + " %";

            var wind = document.createElement('p');
            wind.textContent = days[i].wind.speed + ' MPH';

            var img = document.createElement('img');
            var url = 'http://openweathermap.org/img/wn/'+ days[i].weather[0].icon +'.png';
            img.setAttribute('src', url);

            container.append(img,datec,hum,temp,wind);
            fore.append(container);
        };
    }); 
};