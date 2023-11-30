
async function getRawWeatherData(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_mean&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);

    return response.json();
}

async function getWeatherData(latitude = 38.8951, longitude = -77.0364) {
    // Extract data for app and rename properties
    let { timezone: timezoneLong, timezone_abbreviation: timezoneShort, current_units: currentUnits, current, daily_units: dailyUnits, daily } = await getRawWeatherData(latitude, longitude);
    const timezone = { timezoneLong, timezoneShort };
    const time = { time: current.time, timezone };
    currentUnits = { temperature: currentUnits.temperature_2m };
    current = { temperature: current.temperature_2m, weatherCode: current.weather_code, currentUnits };
    dailyUnits = { temperatureLow: dailyUnits.temperature_2m_min, temperatureHigh: dailyUnits.temperature_2m_max, precipitation: dailyUnits.precipitation_sum, precipitationProbability: dailyUnits.precipitation_probability_mean };
    daily = { dailyUnits, day: daily.time, weatherCode: daily.weather_code, temperatureLow: daily.temperature_2m_min, temperatureHigh: daily.temperature_2m_max, precipitation: daily.precipitation_sum, precipitationProbability: daily.precipitation_probability_mean };

    return { time, current, daily };
}

// Promisification of navigator.geolocation.getCurrentPosition
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            resolve({ latitude, longitude });
        }, reject);
    });
}

// Initialize using user location
(async function init() {
    // const { latitude, longitude } = await getCurrentLocation();
})();