
async function getRawWeatherData(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_mean&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);

    return response.json();
}

async function getWeatherData(latitude = 38.8951, longitude = -77.0364) {
    // Extract data for app and rename properties
    let { timezone: timezoneLong, timezone_abbreviation: timezoneShort, current_units: currentUnits, current, daily_units: dailyUnits, daily } = await getRawWeatherData(latitude, longitude);
    const timezone = { timezoneLong, timezoneShort };
    const time = { time: current.time, timezone };
    currentUnits = { temperature: currentUnits.temperature_2m };
    current = { temperature: current.temperature_2m, weatherCode: current.weather_code, currentUnits };
    // Get sunrise and sunset for today
    const daytimeRange = { sunrise: daily.sunrise[0], sunset: daily.sunset[0] };
    dailyUnits = { temperatureLow: dailyUnits.temperature_2m_min, temperatureHigh: dailyUnits.temperature_2m_max, precipitation: dailyUnits.precipitation_sum, precipitationProbability: dailyUnits.precipitation_probability_mean };
    // Time is given with only the date. Append 'T00:00:00' to the end so that Date.parse will interpret it in local time.
    // Otherwise "date-only forms are interpreted as a UTC time (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format)"
    // which might give an erroneous date.
    daily.time = daily.time.map(time => time + 'T00:00:00');
    daily = { dailyUnits, day: daily.time, weatherCode: daily.weather_code, temperatureLow: daily.temperature_2m_min, temperatureHigh: daily.temperature_2m_max, precipitation: daily.precipitation_sum, precipitationProbability: daily.precipitation_probability_mean };

    return { time, current, daytimeRange, daily };
}


// Cached data to test rendering data
/*
async function getWeatherData() {
    return {
        "time": {
            "time": "2023-12-05T08:45",
            "timezone": {
                "timezoneLong": "America/New_York",
                "timezoneShort": "EST"
            }
        },
        "current": {
            "temperature": 40.5,
            "weatherCode": 3,
            "currentUnits": {
                "temperature": "°F"
            }
        },
        "daytimeRange": {
            "sunrise": "2023-12-05T07:11",
            "sunset": "2023-12-05T16:45"
        },
        "daily": {
            "dailyUnits": {
                "temperatureLow": "°F",
                "temperatureHigh": "°F",
                "precipitation": "inch",
                "precipitationProbability": "%"
            },
            "day": [
                "2023-12-05",
                "2023-12-06",
                "2023-12-07",
                "2023-12-08",
                "2023-12-09",
                "2023-12-10",
                "2023-12-11"
            ],
            "weatherCode": [
                51,
                51,
                3,
                3,
                3,
                81,
                1
            ],
            "temperatureLow": [
                36.1,
                32.5,
                32.1,
                40.1,
                44,
                45.3,
                39.3
            ],
            "temperatureHigh": [
                47,
                42.8,
                46.1,
                56.6,
                57.4,
                64.1,
                46.5
            ],
            "precipitation": [
                0.016,
                0.031,
                0,
                0,
                0,
                1.193,
                0
            ],
            "precipitationProbability": [
                0,
                6,
                0,
                0,
                0,
                43,
                11
            ]
        }
    }
}
*/
export { getWeatherData };