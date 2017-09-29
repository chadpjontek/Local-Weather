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
        if (isCelsius) {
          $("#temp").html(Math.round(json.main.temp) + "&degC");
        } else {
          $("#temp").html(Math.round(json.main.temp * 1.8 + 32) + "&degF");
        }
        temp = json.main.temp;
        $("#city").html(json.name);
        $("#img").attr({
          src: json.weather[0].icon,
          alt: json.weather[0].description
        });
        $("#weather").text(json.weather[0].description);
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
