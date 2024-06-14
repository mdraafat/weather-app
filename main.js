if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let coords = `${latitude},${longitude}`
    getData(coords)
  })
}

const Base_URL = "https://api.weatherapi.com/v1"
const API_KEY = "81172e1ec4b14c31a1f204002241206"

function getData(location) {
  const params = `key=${API_KEY}&q=${location}&days=3`
  fetch(Base_URL + "/forecast.json?" + params)
    .then(async (request) => {
      let data = await request.json()
      displayToday(data)
      displayTomorrow(data)
      displayDayAfter(data)
    }).catch((err) => {
      console.log(err)
    })
}

document.getElementById('searchButton').addEventListener('click', function (event) {
  event.preventDefault()
  let locationInput = document.getElementById('locationInput').value
  getData(locationInput)
});

function displayToday(data) {
  let current = document.getElementById("day-1")
  let location = data.location.name
  let date = formatDate(data.forecast.forecastday[0].date)
  let temperature = Math.round(data.current.temp_c)
  let icon = data.current.condition.icon
  let condition = data.current.condition.text
  let percentage = data.current.precip_in
  let speed = data.current.wind_kph
  let direction = data.current.wind_dir
  let divContent = ` 
  <div class="card-header px-sm-5 bg-dark d-flex justify-content-around flex-wrap">
    <span>${date[0]}</span><br><span class="bg-gradient rounded-3 px-3" >${date[1]} ${date[2]}</span>
  </div>
  <h2 class="location">${location}</h2>
  <h3 class="py-2"><strong>${temperature} °C</strong> </h3>
  <span class="condition"><img src="https:${icon}" alt="">${condition}</span>
  <div class="d-flex justify-content-evenly py-3">
      <div>
          <i class="fa fa-umbrella fa-rotate-45 text-white me-2"></i><span>${percentage} %</span>
      </div>
      <div>
          <i class="fa fa-wind text-white me-2"></i><span>${speed} km/h</span>
      </div>
      <div>
          <i class="fa fa-compass text-white me-2"></i><span>${direction}</span>
      </div>
  </div>
  `
  current.innerHTML = divContent;
  current.style.opacity = 1;
}

function displayTomorrow(data) {
  let tomorrow = document.getElementById("day-2")
  let date = formatDate(data.forecast.forecastday[1].date)[0]
  let max = Math.round(data.forecast.forecastday[1].day.maxtemp_c)
  let min = Math.round(data.forecast.forecastday[1].day.mintemp_c)
  let icon = data.forecast.forecastday[1].day.condition.icon
  let condition = data.forecast.forecastday[1].day.condition.text
  let divContent = `
  <div class="card-header bg-dark d-flex justify-content-around">
    <span>${date}</span>
  </div>
  <h3 class="py-2 text-warning"><strong>${max} °C</strong></h3>
  <h5 class="text-info py-3"><strong>${min} °C</strong></h5>
  <span class="condition"><img src="https:${icon}" alt="">${condition}</span>
  `
  tomorrow.innerHTML = divContent;
  tomorrow.style.opacity = 1;

}

function displayDayAfter(data) {
  let dayAfter = document.getElementById("day-3")
  let date = formatDate(data.forecast.forecastday[2].date)[0]
  let max = Math.round(data.forecast.forecastday[2].day.maxtemp_c)
  let min = Math.round(data.forecast.forecastday[2].day.mintemp_c)
  let icon = data.forecast.forecastday[2].day.condition.icon
  let condition = data.forecast.forecastday[2].day.condition.text
  let divContent = `
  <div class="card-header bg-dark d-flex justify-content-around">
    <span>${date}</span>
  </div>
 <h3 class="py-2 text-warning"><strong>${max} °C</strong></h3>
  <h5 class="text-info py-3"><strong>${min} °C</strong></h5>
  <span class="condition"><img src="https:${icon}" alt="">${condition}</span>
  `
  dayAfter.innerHTML = divContent;
  dayAfter.style.opacity = 1;

}

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  return [dayOfWeek, month, dayOfMonth];
}