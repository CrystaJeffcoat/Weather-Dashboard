var cityName;
var recentCityArr   = [];
var apiKey          = "0ff77b1f4fc50fdb94490d823d0b5627"
var currentCityEl   = $("#current-city");
var currentDateEl   = $("#current-date");
var currentDate     = moment().format("dddd, MMMM Do YYYY");
currentDateEl.text(currentDate);

var currentWeatherData;
var forecastData;

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
    if (recentCityArr.length !== 0) {

        cityName = recentCityArr[recentCityArr.length -1];  
    }else {

        cityName = "New York";
    }
    getWeather();
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

        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey,
        method: "GET"

    }).then(function(data){

        currentWeatherData = data;

        getForecast();

    });
};

function getCurrentData(){
    
    var temp        = parseInt(currentWeatherData.main.temp);
    var humidity    = currentWeatherData.main.humidity
    var windSpeed   = currentWeatherData.wind.speed.toFixed(1)
    var uvIndex     = forecastData.daily[0].uvi;
    var icon        = forecastData.daily[0].weather[0].icon;

    $("#current-temp").text( "Temperature: " + temp + "\xB0")
    $("#current-humidity").text( "Humidity: " + humidity + "%" )
    $("#current-wind").text( "Wind Speed: " + windSpeed + " MPH" )
    $("#current-uv").text( uvIndex )
    


    $("#current-img").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    
};

function getForecast(){

    lat = currentWeatherData.coord.lat;
    lon = currentWeatherData.coord.lon;

    $.ajax({

        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=current,minutely,hourly&appid=" + apiKey,
        method: "GET"

    }).then(getForecastData);

}

function getForecastData(data){

    forecastData = data;
    getCurrentData();

    for (var i = 1; i < 6; i++) {
        var k = forecastData.daily[i];
        var j = $('div[value="' + i + '"]')[0].children

        day = convertUnix(k.dt);
        icon = k.weather[0].icon;
        temp = parseInt(k.temp.day);
        humidity = k.humidity;

        // append to page
        j[0].innerHTML = day 
        j[2].setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        j[4].innerHTML = "Temp: " + temp + "&#8457"
        j[6].innerHTML = "Humidity: " + humidity + "%"

    }

}

function convertUnix(dt) {

    var unix = dt
    var mili = unix * 1000
    var dateObj = new Date(mili)
    day = dateObj.toLocaleString("en-us", {weekday: "long"})

    return day;
}
    
