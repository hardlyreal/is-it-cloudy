// WEATHER

const Weather = function() {
  this.apiKey = 'be341b0e84b47af5'
  this.city = 'Youngstown';
  this.state = 'OH';
}

  // API http://api.wunderground.com/api/be341b0e84b47af5/conditions/q/OH/Youngstown.json

  // GET CURRENT WEATHER
  Weather.prototype.getWeather = function() {
    return new Promise((resolve, reject) => {
      fetch(`https://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

// UI

const UI = function() {
  this.icon = document.getElementById('forecast-icon');
  this.desc = document.getElementById('forecastText');
  this.answer = document.getElementById('responseText');
  this.temperature = document.querySelector('.w-temp');
  this.chill = document.querySelector('.w-chill');
  this.dewpoint = document.querySelector('.w-dew');
  this.humidity = document.querySelector('.w-humidity');
  this.windDir = document.querySelector('.w-wind-dir');
  this.windSpeed = document.querySelector('.w-wind-speed');

  
  // this.forecast = document.getElementById('forecastText');
  // this.location = document.getElementById('locationText');
}

UI.prototype.displayWeather = function(weather) {
  this.icon.setAttribute('src', weather.current_observation.icon_url);
  this.desc.textContent = `(${weather.current_observation.weather})`;
  
  if (
    weather.current_observation.weather === "Mostly Cloudy" || 
    weather.current_observation.weather === "Cloudy" || 
    weather.current_observation.weather === "Partly Cloudy" || 
    weather.current_observation.weather === "Rain" || 
    weather.current_observation.weather === "Snow" ||
    weather.current_observation.weather === "Overcast"
  ) {
    this.answer.textContent = 'Yes...';
  } else {
    this.answer.textContent = 'No!';
  }
  this.temperature.textContent = `${Math.round(weather.current_observation.temp_f)} F`;
  this.chill.textContent = `${Math.round(weather.current_observation.windchill_f)} F`;
  this.dewpoint.textContent = `${Math.round(weather.current_observation.dewpoint_f)} F`;
  this.humidity.textContent = weather.current_observation.relative_humidity;
  this.windDir.textContent = weather.current_observation.wind_dir;
  this.windSpeed.textContent = `${weather.current_observation.wind_gust_mph} mph`;
  


}

// APP 

// INIT WEATHER
const weather = new Weather();

// INIT UI
const ui = new UI();

// LOAD WEATHER ON DOM LOAD
document.addEventListener('DOMContentLoaded', getWeather);

// TOGGLE WEATHER
const toggleBtn = document.querySelector('.toggle');

toggleBtn.addEventListener('click', (e) => {
  toggleBtn.nextElementSibling.classList.toggle('hide');
  if(toggleBtn.nextElementSibling.classList.contains('hide')) {
    e.target.innerHTML = `More <i class="fas fa-arrow-down"></i>`;
  } else {
    e.target.innerHTML = `Less <i class="fas fa-arrow-up"></i>`;
  }
  
  
  
  e.preventDefault();
});

// GET WEATHER
function getWeather() {
  weather.getWeather()
  .then(results => ui.displayWeather(results))
  .catch(err => console.log(err));
}






