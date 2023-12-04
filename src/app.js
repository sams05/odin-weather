import { WEATHER_CODE_MAPPING } from './weather-code-mapping';
import { isWithinInterval } from 'date-fns';

// |API

async function getRawWeatherData(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_mean&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);

    return response.json();
}
/*
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
    daily = { dailyUnits, day: daily.time, weatherCode: daily.weather_code, temperatureLow: daily.temperature_2m_min, temperatureHigh: daily.temperature_2m_max, precipitation: daily.precipitation_sum, precipitationProbability: daily.precipitation_probability_mean };

    return { time, current, daytimeRange, daily };
}
*/

// Cached data to test rendering data

async function getWeatherData() {
    return {
        "time": {
            "time": "2023-12-04T09:45",
            "timezone": {
                "timezoneLong": "America/New_York",
                "timezoneShort": "EST"
            }
        },
        "current": {
            "temperature": 50.6,
            "weatherCode": 0,
            "currentUnits": {
                "temperature": "°F"
            }
        },
        "daytimeRange": {
            "sunrise": "2023-12-04T07:10",
            "sunset": "2023-12-04T16:46"
        },
        "daily": {
            "dailyUnits": {
                "temperatureLow": "°F",
                "temperatureHigh": "°F",
                "precipitation": "inch",
                "precipitationProbability": "%"
            },
            "day": [
                "2023-12-04",
                "2023-12-05",
                "2023-12-06",
                "2023-12-07",
                "2023-12-08",
                "2023-12-09",
                "2023-12-10"
            ],
            "weatherCode": [
                3,
                51,
                71,
                3,
                3,
                3,
                81
            ],
            "temperatureLow": [
                39.6,
                33.2,
                32.6,
                33.2,
                38.4,
                42.8,
                43
            ],
            "temperatureHigh": [
                52.6,
                45.6,
                42.1,
                45.9,
                54.8,
                57.4,
                60.9
            ],
            "precipitation": [
                0,
                0.016,
                0.039,
                0,
                0,
                0,
                0.744
            ],
            "precipitationProbability": [
                0,
                1,
                20,
                0,
                0,
                0,
                34
            ]
        }
    }
}

function interpretWeatherCode(weatherCode, time, {sunrise, sunset}) {
    time = new Date(time);
    sunrise = new Date(sunrise);
    sunset = new Date(sunset);
    const isDaytime = isWithinInterval(time, {start: sunrise, end: sunset});
    const dayNight = isDaytime ? 'day': 'night';
    const { description, image, iconFont } = WEATHER_CODE_MAPPING[weatherCode][dayNight];
    return { description, image, iconFont };
}

// Promisification of navigator.geolocation.getCurrentPosition
/*
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            resolve({ latitude, longitude });
        }, reject);
    });
}
*/

export { getWeatherData, interpretWeatherCode };