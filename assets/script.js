


let buttonSearch = document.querySelector("#search-button");

 //Creating a new button for the most recent searches
    
 buttonSearch.addEventListener("click", function(event){
    event.preventDefault()
    let recentCityButton = document.createElement("button")
    recentCityButton.setAttribute("id", "history-button")
    recentCityButton.textContent = document.querySelector("#search-input").value
    let recentCities = document.querySelector("#history")
    recentCities.prepend(recentCityButton);

    //Setting history buttons to run the fetch request
    let historyButtons = document.querySelector("#history-button")
    historyButtons.addEventListener("click", function(){

    if (event.target.matches("#history-button")){

        let city = event.target.textContent
        buildForecast(city)

    }
})

});


//Creating fetch request on click of Search button
function buildForecast(){
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

    //Setting variables for necessary data
    let currentDate = moment().format("MMMM, Do YYYY")
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

    let currentIconUrl = `https://openweathermap.org/img/wn/${currentTempIcon}@2x.png`
    console.log(currentIconUrl)

    //Creating new div and setting the innerHTML to contain the current city info
    let currentCityInfo = document.querySelector("#currentCityDiv")
    let currentCityNewDiv = document.createElement("div")
    currentCityInfo.innerHTML =
        `<div class="container current-city">
        <h1 class="display-4 current-city">${cityName}: ${currentDate}<img src="${currentIconUrl}"></h1>
          <p class="lead">Current Temperature: ${currentTemp}</p>
          <p class="lead">Current Humidity: ${currentHumidity}</p>
          <p class="lead">Current Wind Speed: ${currentWindSpeed} MPH</p>
          </div>`
    //Appending the new div to the page
    currentCityInfo.append(currentCityNewDiv);

    //Getting data for 5 day forecast cards

    let forecastDataArray = [8, 16, 24, 32, 40];
    for (i = 0; i < forecastDataArray.length; i++) {
        
    let forecastDate = moment(data.list[forecastDataArray[i]].dt, "X").format("DD/MM/YYYY")
    console.log(forecastDate)

    let forecastTemp = parseFloat(data.list[forecastDataArray[i]].main.temp - 273).toFixed(2) + "ºC"
    console.log(forecastTemp)

    let forecastHumidity = data.list[forecastDataArray[i]].main.humidity + "%"
    console.log(forecastHumidity)

    let forecastWindSpeed = data.list[forecastDataArray[i]].wind.speed
    console.log(forecastWindSpeed)

    let forecastTempIcon = data.list[forecastDataArray[i]].weather[0].icon
    console.log(forecastTempIcon)

    let forecastIconUrl = `https://openweathermap.org/img/wn/${forecastTempIcon}@2x.png`
    console.log(forecastIconUrl)
    
    
    let forecastNewDiv = document.createElement("div")
    let fiveDayForecastEl = document.querySelector("#forecast")
    //fiveDayForecastEl.innerHTML = "";
    forecastNewDiv.innerHTML = `
    <div class="card custom-card text-white mb-3" id="fiveDayForecast" style="max-width: 14rem;">
            <div class="card-header"><img src="${forecastIconUrl}"></img></div>
            <div class="card-body">
                <h5 class="card-title">${forecastDate}</h5>
                <p class="lead">Temperature: ${forecastTemp}</p>
                <p class="lead">Humidity: ${forecastHumidity}</p>
                <p class="lead">Wind Speed: ${forecastWindSpeed} MPH</p>
            </div>
    </div>
    `
    
    fiveDayForecastEl.append(forecastNewDiv)
    }   

})

}
)};

buildForecast()



