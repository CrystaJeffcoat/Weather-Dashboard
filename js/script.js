var cityName        = "New York City"
var recentCityArr   = [];
var apiKey          = "0ff77b1f4fc50fdb94490d823d0b5627"
var currentCityEl   = $("#current-city");
var currentDateEl   = $("#current-date");
var currentDate     = moment().format("dddd, MMMM Do YYYY");
currentDateEl.text(currentDate);

var weatherData;

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
    getWeather();
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

    getWeather();

});


function getWeather() {

    currentCityEl.text(cityName);
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey,
        method: "GET"
        }).then(function(data) {
            weatherData = data;
        });
};

function getForecast() {

    var forecast = {
        "day-1":[
            day, temp, humidity
        ],
        "day-2":[
            day, temp, humidity
        ],
        "day-3":[
            day, temp, humidity
        ],
        "day-4":[
            day, temp, humidity
        ],
        "day-4":[
            day, temp, humidity
        ]
        
    };
};

function getCurrentWeather(){
    
    var currentWeather = {
        "temp": currentTemp,
        "humidity": currentHum,
        "windSpeed": currentHum,
        "uvIndex": currentUV
    }

    lat = data.city.coord.lat;
    lon = data.city.coord.lon;

};

function getUVindex(){

}