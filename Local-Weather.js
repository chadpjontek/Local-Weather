$(document).ready(function () {
  // set global vars
  var lat = 0;
  var lon = 0;
  var isCelsius = false;
  var endPoint = "";
  var temp = 0;
  var weatherId = 800;
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
      //format & display json
      $.getJSON(endPoint, function (json) {
        //show current weather condition
        $("#weather").html(json.list[0].weather[0].description);
        //show current temp
        getTemp(json.list[0].main.temp);
        //display current city
        $("#city").html(json.city.name);
        //function to get weather id
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
        //get current weatherId
        weatherId = getWeatherId(0);
        //change img and color scheme based on weatherId
        switch (weatherId) {
          case "thunderstorms":
            $("body").css("background", "linear-gradient(to left top, #0E476F, #60DBFC)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10222610-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "drizzle":
            $("body").css("background", "linear-gradient(to left top, #214081, #d72568)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/9988646-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "rain":
            $("body").css("background", "linear-gradient(to left top, #a5d3e9, #6e628a)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10212130-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "snow":
            $("body").css("background", "linear-gradient(to left top, #c9ecec, #25a6a6)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/7834033-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "fog":
            $("body").css("background", "#linear-gradient(to left top, #c4946e, #262626)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10214712-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "clear":
            $("body").css("background", "linear-gradient(to left top, rgb(255, 178, 39), #a8ffed)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/9988986-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "clouds":
            $("body").css("background", "linear-gradient(to left top, #FFE2F4, #A2D6FA)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10221429-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "extreme":
            $("body").css("background", "linear-gradient(to left top, #fefefe, #800706)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10134192-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "wind":
            $("body").css("background", "linear-gradient(to left top, #6a5e87, #bbc4c9)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10217325-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
          case "hot":
            $("body").css("background", "linear-gradient(to left top, #29c0e9, #706184)");
            $("#img").attr("src", "https://render.bitstrips.com/v2/cpanel/10192284-120048733_6-s1-v1.png?transparent=1&palette=1");
            break;
        };
        //loop through forcast and display
        for (var i = 1; i <= json.list.length; i++) {
          weatherId = getWeatherId(i);
          switch (weatherId) {
            case "thunderstorms":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10222610-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "drizzle":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/9988646-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "rain":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10212130-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "snow":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/7834033-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "fog":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10214712-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "clear":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/9988986-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "clouds":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10221429-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "extreme":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10134192-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "wind":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10217325-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
            case "hot":
              $("#imgHourly" + i).attr("src", "https://render.bitstrips.com/v2/cpanel/10192284-120048733_6-s1-v1.png?transparent=1&palette=1");
              break;
          };
          $("#hour" + i).html(dayOfWeek(json.list[i].dt));
          $("#weatherHourly" + i).html(json.list[i].weather[0].description);
          $("#tempHourly" + i).html(getTemp(json.list[i].main.temp));
        };
      });
    });
  };
  //toggle between Celsius & Fahrenheit
  $("#toggle").on("click", function () {
    isCelsius = !isCelsius;
    if (isCelsius) {
      $("#temp").html(Math.round(temp - 273.15) + "&degC");
    } else {
      $("#temp").html(Math.round(temp * 1.8 - 459.67) + "&degF");
    }
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
})