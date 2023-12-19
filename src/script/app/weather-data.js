/**
 * Make API calls to get the weather data for the given location. Rejects HTTP errors.
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @param {String} temperatureUnit "fahrenheit" or "celsius" as specified in open-meteo's documentation
 * @returns {Promise<JSON>} Raw JSON object
 */
async function getRawWeatherData(latitude, longitude, temperatureUnit) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_mean&temperature_unit=${temperatureUnit}&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);
    // Throw HTTP errors
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Process the data from getRawWeatherData for use with the application
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @param {String} temperatureUnit "fahrenheit" or "celsius" as specified in open-meteo's documentation
 * @returns {Promise<Object>} Resolves to an object containing the processed weather data for the given location
 */
async function getWeatherData(latitude = 38.8951, longitude = -77.0364, temperatureUnit = 'fahrenheit') {
    // Extract data for app and rename properties to camel casing
    let { timezone: timezoneLong, timezone_abbreviation: timezoneShort, current_units: currentUnits, current, daily_units: dailyUnits, daily } = await getRawWeatherData(latitude, longitude, temperatureUnit);
    const timezone = { timezoneLong, timezoneShort };
    const time = { time: current.time, timezone };
    currentUnits = { temperature: currentUnits.temperature_2m };
    // Convert isDay to boolean
    current = { temperature: current.temperature_2m, isDay: Boolean(current.is_day), weatherCode: current.weather_code, currentUnits };
    dailyUnits = { temperatureLow: dailyUnits.temperature_2m_min, temperatureHigh: dailyUnits.temperature_2m_max, precipitation: dailyUnits.precipitation_sum, precipitationProbability: dailyUnits.precipitation_probability_mean };
    // Time is given with only the date. Append 'T00:00:00' to the end so that Date.parse will interpret it in local time.
    // Otherwise "date-only forms are interpreted as a UTC time (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format)"
    // which might give an erroneous date.
    daily.time = daily.time.map(time => time + 'T00:00:00');
    daily = { dailyUnits, day: daily.time, weatherCode: daily.weather_code, temperatureLow: daily.temperature_2m_min, temperatureHigh: daily.temperature_2m_max, precipitation: daily.precipitation_sum, precipitationProbability: daily.precipitation_probability_mean };

    return { time, current, daily };
}

export { getWeatherData };