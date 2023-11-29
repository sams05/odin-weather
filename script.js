
async function getRawWeatherData(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);
    return response.json();
}

// |TODO
//getRawWeatherData(38.8951, -77.0364).then(data => console.log(data));

async function getWeatherData(latitude, longitude) {
    const {latitude, longitude, timezone_abbreviation, daily} = await getRawWeatherData(latitude, longitude);

}