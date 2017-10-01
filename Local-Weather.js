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
          //src: json.weather[0].icon,
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
          $("body").css("background-color", "#000040");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10222610-120048733_6-s1-v1.png?transparent=1&palette=1");
          //drizzle
        } else if (weatherId >= 300 & weatherId <= 321) {
          $("body").css("background-color", "#acb3c6");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/9988646-120048733_6-s1-v1.png?transparent=1&palette=1");
           //rain
        } else if (weatherId >= 500 & weatherId <= 531) {
          $("body").css("background-color", "#7493cd");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10212130-120048733_6-s1-v1.png?transparent=1&palette=1");
          //snow
        } else if (weatherId >= 600 & weatherId <= 622) {
          $("body").css("background-color", "#fff");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/7834033-120048733_6-s1-v1.png?transparent=1&palette=1");
          //Atmosphere
        } else if (weatherId >= 701 & weatherId <= 781) {
          $("body").css("background-color", "#d0b7d5");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10212384-120048733_6-s1-v1.png?transparent=1&palette=1");
           //Clear
        } else if (weatherId >= 701 & weatherId <= 781) {
          $("body").css("background-color", "#e1f8ff");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/9988986-120048733_6-s1-v1.png?transparent=1&palette=1");
          //clouds
        } else if (weatherId >= 801 & weatherId <= 804) {
          $("body").css("background-color", "#e1f8ff");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10221429-120048733_6-s1-v1.png?transparent=1&palette=1");
         //extreme
        } else if (weatherId >= 900 & weatherId <= 906) {
          $("body").css("background-color", "#ff7006");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10192284-120048733_6-s1-v1.png?transparent=1&palette=1");
         //additional
        } else if (weatherId >= 951 & weatherId <= 962) {
          $("body").css("background-color", "#ff7006");
          $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/9945756-120048733_6-s1-v1.png?transparent=1&palette=1");
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
