


let buttonSearch = document.querySelector("#search-button");

buttonSearch.addEventListener("click", function(event){

event.preventDefault()

let userSearchCity = document.querySelector("#search-input").value

fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userSearchCity}&limit=5&appid=0801e00bf8b67d7e81fc68b412514283`)
.then(response => response.json())
.then(citySearch => {

    let firstCity = citySearch[0]
    console.log(firstCity.lat)
    console.log(firstCity.lon)

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=0801e00bf8b67d7e81fc68b412514283`)

})

.then(response => response.json())
.then(data => {

    console.log(data)
    console.log(data.list[0].main.temp)

    let currentDate = moment().format("DD/MM/YYYY")
    console.log(currentDate)

    let cityName = data.city.name;
    console.log(cityName)

    let currentTemp = parseFloat(data.list[0].main.temp - 273).toFixed(2) + "ºC"
    console.log(currentTemp)

    let currentHumidity = data.list[0].main.humidity + "%"
    console.log(currentHumidity)

    let currentWindSpeed = data.list[0].wind.speed
    console.log(currentWindSpeed)

    let currentTempIcon = data.list[0].weather[0].icon
    console.log(currentTempIcon)


    
   
    let currentCityInfo = document.querySelector("#currentCityDiv")
    let currentCityNewDiv = document.createElement("div")
    //currentCityNewDiv.setAttribute("class", "container current-city")
    currentCityInfo.innerHTML =
        `<div class="container current-city">
        <h1 class="display-4 current-city">${cityName} on ${currentDate}</h1>
          <p class="lead">Current Temperature: ${currentTemp}</p>
          <p class="lead">Current Humidity: ${currentHumidity}</p>
          <p class="lead">Current Wind Speed: ${currentWindSpeed}</p>
          </div>`
    
    currentCityInfo.append(currentCityNewDiv);

 

})

}
);


