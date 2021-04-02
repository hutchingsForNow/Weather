
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

//fetch weather
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=1c5369d0842f8f3df5ba40d1587e9fe6";
  fetch(url)
  .then(function(response) {
     return response.json();
  })
  .then(function(json) {
      console.log(json); 
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      //add ins for customizations
      results += "<p> Min temp: " + json.main.temp_min + "&deg;F" + "</p>";
      results += "<p> Max temp: " + json.main.temp_max + "&deg;F" + "</p>";
      results += "<p> Feels like: " + json.main.feels_like + "&deg;F" + "</p>";
       //Time of sunset and sunrise need conversions done - happens in function
        // Create a new JavaScript Date object based on the timestamp
      unix_timestamp_sunrise = unixConversion(json.sys.sunrise);
      unix_timestamp_sunset = unixConversion(json.sys.sunset);
      results += "<p> Sunrise: " + unix_timestamp_sunrise + " am</p>";
      results += "<p> Sunset: " + unix_timestamp_sunset + " pm</p>"; 
      for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description;
        if (i !== json.weather.length - 1)  results += ", ";
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
  });

//fetch forecast
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=1c5369d0842f8f3df5ba40d1587e9fe6";
  fetch(url2)
  .then(function(response) {
      return response.json();
  })
  .then(function(json) {
      console.log(json); 
      let forecast = "";
        //this is to get future forcasts
      for (let i=0; i < 7; i++) {
        forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
        forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += "<p>Weather: " + json.list[i].weather[0].description + "</p>";
          forecast += "<p>Humidity: " + json.list[i].main.humidity + "</p>";
          forecast += "<hr/>";
      }
      document.getElementById("forecastResults").innerHTML = forecast;
  });

});

//to calculate the time for sunset and sunrise
function unixConversion(unix_timestamp) {
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
var hours = date.getHours();
  // Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
var seconds = "0" + date.getSeconds();
  // Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
return formattedTime;
}


