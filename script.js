let lat, lon;
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude)
    lat = position.coords.latitude
    lon = position.coords.longitude;

    // fetch(`https://api.weatherapi.com/v1/current.json?key=bbfad02fb6514b2cb08165523260206&q=${lat},${lon}&aqi=yes`)
    fetch('https://proxy.corsfix.com/?' +`https://api.weatherapi.com/v1/current.json?key=bbfad02fb6514b2cb08165523260206&q=${lat},${lon}&aqi=yes`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            document.getElementById("celsius").textContent = data.current.temp_c;
            let icon = data.current.condition.icon;
            icon = icon.replace("64x64", "128x128")
            document.getElementById("weatherIcon").src = icon;
            document.getElementById("city").textContent = data.location.name;
            document.getElementById("airquality").textContent = airQuality(data.current.air_quality["us-epa-index"]);
            document.getElementById("windSpeed").textContent = data.current.wind_kph + " KMPH";
            document.getElementById("humidityVal").textContent = data.current.humidity + "%";
            document.getElementById("area").textContent = data.location.name;
            document.getElementById("state").textContent = data.location.region;
            document.getElementById("conditionText").textContent = data.current.condition.text;
            document.getElementById("rainProbability").textContent = data.current.chance_of_rain + "%";

        })
        .catch(error => {
            console.log(error)
        })

})



function airQuality(value) {
    switch (value) {
        case 1:
            return "Good"

        case 2:
            return "Moderate"
        case 3:
            return "Sensitive"
        case 4:
            return "Unhealthy"
        case 5:
            return "Very Unhealthy"
        case 6:
            return "Hazardous"
        default:
            return "Good"
    }
}
