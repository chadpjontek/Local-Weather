// set global vars
var lat = 0;
var lon = 0;
var isCelsius = false;
var endPoint = "";
var temp = [];
var weatherId = 800;
$(document).ready(function () {
  //get users location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      //fetch weather json
      endPoint =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&APPID=33e85e38014263a2ba46a9b66353c007";
      $.getJSON(endPoint, function (json) {
        //display current city
        $("#city").html(json.city.name);
        //show temps
        for (var i = 0; i < json.list.length; i++) {
          temp.push(json.list[i].main.temp)
        };
        for (var i = 0; i < temp.length; i++) {
          $("#temp" + i).html(getTemp(temp[i]) + "&degF");
        };
        //show days/hours
        for (var i = 1; i < json.list.length; i++) {
          var day = dayOfWeek(json.list[i].dt);
          var hour = hourOfDay(json.list[i].dt);
          if (i > 6) {
            $("#hour" + i).html(day);
          } else {
            $("#hour" + i).html(day + " " + hour);
          }
         
        };
        //weather conditions and images
        for (var i = 0; i < json.list.length; i++) {
          //show condition
          $("#weather" + i).html(json.list[i].weather[0].description);
          //get weatherIDs and display appropriate imgs
          //DEV NOTE -- you can switch bitmojis using different numbers. See https://github.com/JoshCheek/bitmoji 
          weatherId = getWeatherId(i);
          switch (weatherId) {
            case "thunderstorms":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10222610-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "drizzle":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/9988646-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "rain":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10212130-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "snow":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/7834033-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "fog":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10214712-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "clear":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/9988986-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "clouds":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10221429-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "extreme":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10134192-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "wind":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10217325-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "hot":
              $("#img" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10192284-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
          };
        };
        //change color scheme for current weather
        weatherId = getWeatherId(0);
        switch (weatherId) {
          case "thunderstorms":
            $("body").css("background", "linear-gradient(to left top, #0E476F, #60DBFC)");
            break;
          case "drizzle":
            $("body").css("background", "linear-gradient(to left top, #214081, #d72568)");
            break;
          case "rain":
            $("body").css("background", "linear-gradient(to left top, #a5d3e9, #6e628a)");
            break;
          case "snow":
            $("body").css("background", "linear-gradient(to left top, #c9ecec, #25a6a6)");
            break;
          case "fog":
            $("body").css("background", "#linear-gradient(to left top, #c4946e, #262626)");
            break;
          case "clear":
            $("body").css("background", "linear-gradient(to left top, #ffb227, #a8ffed)");
            break;
          case "clouds":
            $("body").css("background", "linear-gradient(to left top, #FFE2F4, #A2D6FA)");
            break;
          case "extreme":
            $("body").css("background", "linear-gradient(to left top, #fefefe, #800706)");
            break
          case "wind":
            $("body").css("background", "linear-gradient(to left top, #6a5e87, #bbc4c9)");
            break;
          case "hot":
            $("body").css("background", "linear-gradient(to left top, #29c0e9, #706184)");
            break;
        };
        //function to get weatherId
        function getWeatherId(i) {
          weatherId = json.list[i].weather[0].id;
          //lookup catagory with weatherId
          //thunderstorms
          if (weatherId >= 200 & weatherId <= 232 || weatherId === 960) {
            weatherId = "thunderstorms";
            //drizzle
          } else if (weatherId >= 300 & weatherId <= 321) {
            weatherId = "drizzle";
            //rain
          } else if (weatherId >= 500 & weatherId <= 531) {
            weatherId = "rain";
            //snow/cold
          } else if (weatherId >= 600 & weatherId <= 622 || weatherId === 903) {
            weatherId = "snow";
            //fog/mist/hail
          } else if (weatherId >= 701 & weatherId <= 762 || weatherId === 906) {
            weatherId = "fog";
            //clear/calm
          } else if (weatherId === 800 || weatherId === 951) {
            weatherId = "clear";
            //clouds
          } else if (weatherId >= 801 & weatherId <= 804) {
            weatherId = "clouds";
            //extreme
          } else if (weatherId >= 900 & weatherId <= 902 || weatherId >= 771 & weatherId <= 781 || weatherId >= 958 & weatherId <= 959 || weatherId >= 961 & weatherId <= 962) {
            weatherId = "extreme";
            //wind
          } else if (weatherId >= 952 & weatherId <= 962 || weatherId === 905) {
            weatherId = "wind";
            //hot
          } else if (weatherId === 904) {
            weatherId = "hot";
          };
          return weatherId;
        };
      });
    });
  };
});
//toggle between Celsius & Fahrenheit - loop through all temps
$("#toggle").on("change", function () {
  isCelsius = !isCelsius;
  if (isCelsius) {
    for (var i = 0; i < temp.length; i++) {
      $("#temp" + i).html(Math.round(temp[i] - 273.15) + "&degC");
    };
  } else {
    for (var i = 0; i < temp.length; i++) {
      $("#temp" + i).html(Math.round(temp[i] * 1.8 - 459.67) + "&degF");
    };
  };
});
//show current temp in either C or F
var getTemp = function (temp) {
  if (isCelsius) {
    return Math.round(temp - 273.15);
  } else {
    return Math.round(temp * 1.8 - 459.67);
  };
}
//find day of week
var dayOfWeek = function (date) {
  var xx = new Date();
  xx.setTime(date * 1000); // javascript timestamps are in milliseconds
  var day = xx.getDay(); // the Day
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thur";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  };
}
//find hour in AM/PM
var hourOfDay = function(timestamp){
  var date = new Date(timestamp*1000);
  var hours = date.getHours();
  if(hours < 12){
    return hours + "AM";
  } else if (hours === 12) {
    return hours + "PM";
  } else {
    return (hours -12) + "PM";
  }
}

// Helper function for add element box list in WOW
WOW.prototype.addBox = function (element) {
  this.boxes.push(element);
};
// Init WOW.js and get instance
var wow = new WOW();
wow.init();
// Attach scrollSpy to .wow elements for detect view exit events,
// then reset elements and add again for animation
$('.wow').on('scrollSpy:exit', function () {
  $(this).css({
    'visibility': 'hidden',
    'animation-name': 'none'
  }).removeClass('animated');
  wow.addBox(this);
}).scrollSpy();