document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  // current weather:
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=6a65109ba0c11ba1e0ea97d75ec1ac64";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
          console.log(json);
          let results = "";
          results += '<h2>Weather in ' + json.name + "</h2>";
          results += '<h2>' + json.main.temp + " &deg;F</h2>"
          for (let i=0; i < json.weather.length; i++) {
              results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
          }
          results += "<p>Description: "
          for (let i=0; i < json.weather.length; i++) {
              results += json.weather[i].description
              if (i !== json.weather.length - 1)
                  results += ", "
          }
          results += "</p>";
          results += "<p>Humidity: " + json.main.humidity + "</p>";
          results += "<p>Wind Speed: " + json.wind.speed + " m/s</p>";
          results += "<p>Min/Max temp: " + json.main.temp_min + "&deg;F/" + json.main.temp_max + "&deg;F</p>";

          document.getElementById("weatherResults").innerHTML = results;
      });

      //multi day forcast:
      const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=6a65109ba0c11ba1e0ea97d75ec1ac64";
      fetch(url2)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          let forecast = "";
          for (let i=0; i < json.list.length; i++) {
              if(i==0) {
                  forecast += "<div class = day>";
                  forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h3>";
              }
              else if(i%8 == 0) {
                  forecast += "</div>";
                  forecast += "<div class = day>";
                  forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h3>";
              }
              forecast += "<div class = forecast-unit>";
              forecast += "<h4>" + moment(json.list[i].dt_txt).format('h:mm a') + "</h4>";
              forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
              forecast += "<p>Description: " + json.list[i].weather[0].description;
              forecast += "<p>Temperature: " + json.list[i].main.temp + "&deg;F</p>";
              forecast += "<p>Feels like: " + json.list[i].main.feels_like + "&deg;F</p>"
              forecast += "</p>";
              forecast += "</div>";
              if(i == json.list.length - 1)
              {
                  forecast += "</div>";
              }

          }
          document.getElementById("forecastResults").innerHTML = forecast;
        });
});




/*
  //was forecast
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=1c5369d0842f8f3df5ba40d1587e9fe6";
  fetch(url2)
  .then(function(response) {
      return response.json();
  })
  .then(function(json) {
      console.log(json); 
      let forecast = "";
        //this is to get future forcasts
      for (let i=0; i < json.list.length; i++) {
                if(i==0)
                {
                    forecast += "<div class = day>";
                    forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h3>";
                }
                else if(i%8 == 0)
                {
                    forecast += "</div>";
                    forecast += "<div class = day>";
                    forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h3>";
                }
        //customizations
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
        forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += "<p>Weather: " + json.list[i].weather[0].description + "</p>";
        forecast += "<p>Humidity: " + json.list[i].main.humidity + "</p>";
        forecast += "<hr/>";
        if(i == json.list.length - 1) {
                    forecast += "</div>";
        }
      }
      document.getElementById("forecastResults").innerHTML = forecast;
  });
  */


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


