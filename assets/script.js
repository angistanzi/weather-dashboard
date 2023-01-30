


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

})

}
);
