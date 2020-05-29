var cityName        = "New York City"
var recentCityArr   = [];
var apiKey          = "0ff77b1f4fc50fdb94490d823d0b5627"
//var queryURLbase    = "https://samples.openweathermap.org/data/2.5/forecast/daily?q="

var currentCityEl   = $("#current-city");
var currentDateEl   = $("#current-date");
var currentDate     = moment().format("dddd, MMMM Do YYYY");
currentDateEl.text(currentDate);

// Get recent searches from local storage and sets values to recentCityArr
getRecentCity();

function getRecentCity() {
    if (localStorage.length !== 0) {
        recentCityArr = localStorage.getItem("City").split(",");
        for (i = 0; i < recentCityArr.length; i++) {
            newDiv = $("<div>");
            if (recentCityArr[i] !== "") {
                newDiv.text(recentCityArr[i]);
                $("#recent-search").prepend(newDiv, "<hr>");
            }
        }
    }
};

// When a city is searched...
$("#searchbar").on("search", function() { 
    event.preventDefault();

    cityName = this.value.trim();
    recentCityArr.push(cityName);
    this.value = "";
    localStorage.setItem("City", recentCityArr);
    recentSearch();
    //display weather
});

// Creates a <div> for new search
function recentSearch() {

    newCity = $("<div>");
    newCity.text(cityName);
    $("#recent-search").prepend(newCity, "<hr>");

};

// When user clicks on a City recently searched...
$("#recent-search").click(function() {

    cityName = event.target.innerHTML;
    console.log(cityName);

    displayWeather();

});

//currentCityEl.text(cityName);
function displayWeather() {
    //var queryURL = queryURLbase + cityName + "&mode=xml&units=metric&cnt=7&appid=" + apiKey
    $.ajax({
        url: "http://samples.openweathermap.org/data/2.5/weather?q=London&appid=439d4b804bc8187953eb36d2a8c26a02",
        method: "GET"
        }).then(function(response) {
        console.log(response);

    });
}