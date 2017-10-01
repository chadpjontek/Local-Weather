$(document).ready(function () {
  // set global vars
  var lat = 0;
  var lon = 0;
  var isCelsius = false;
  var endPoint = "";
  var temp = 0;
  //get users location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      //fetch weather json
      endPoint =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&lon=" +
        lon;
      //format & display json
      $.getJSON(endPoint, function (json) {
        //show current temp in either C or F
        if (isCelsius) {
          $("#temp").html(Math.round(json.main.temp) + "&degC");
        } else {
          $("#temp").html(Math.round(json.main.temp * 1.8 + 32) + "&degF");
        }
        temp = json.main.temp;
        //current city
        $("#city").html(json.name);
        //change img based on weather
        $("#img").attr({
          src: json.weather[0].icon,
          alt: json.weather[0].description
        });
        //current weather
        $("#weather").text(json.weather[0].description);
        //change color scheme based on weather
        //first find weather id
        var weatherId = json.weather[0].id;
        //lookup catagory with id
        //thunderstorms
        if (weatherId >= 200 & weatherId <= 232) {
          $("body").css("background-color", "#465295");
          //drizzle
        } else if (weatherId >= 300 & weatherId <= 321) {
          $("body").css("background-color", "#c5cad8");
        } else if (weatherId >= 801 & weatherId <= 804) {
          $("body").css("background-color", "#f2feff");
        }

    
        
        
        
      });
    });
  };
  //toggle between Celsius & Fahrenheit
  $("#toggle").on("click", function () {
    isCelsius = !isCelsius;
    if (isCelsius) {
      $("#temp").html(Math.round(temp) + "&degC");
    } else {
      $("#temp").html(Math.round(temp * 1.8 + 32) + "&degF");
    }
  });
});
