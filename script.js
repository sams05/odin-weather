// |API

async function getRawWeatherData(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_mean&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);

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
    dailyUnits = { temperatureLow: dailyUnits.temperature_2m_min, temperatureHigh: dailyUnits.temperature_2m_max, precipitation: dailyUnits.precipitation_sum, precipitationProbability: dailyUnits.precipitation_probability_mean };
    daily = { dailyUnits, day: daily.time, weatherCode: daily.weather_code, temperatureLow: daily.temperature_2m_min, temperatureHigh: daily.temperature_2m_max, precipitation: daily.precipitation_sum, precipitationProbability: daily.precipitation_probability_mean };

    return { time, current, daily };
}
*/

// Cached data to test rendering data
async function getWeatherData() {
    return {
        "time": {
            "time": "2023-11-30T13:30",
            "timezone": {
                "timezoneLong": "America/New_York",
                "timezoneShort": "EST"
            }
        },
        "current": {
            "temperature": 54.8,
            "weatherCode": 3,
            "currentUnits": {
                "temperature": "°F"
            }
        },
        "daily": {
            "dailyUnits": {
                "temperatureLow": "°F",
                "temperatureHigh": "°F",
                "precipitation": "inch",
                "precipitationProbability": "%"
            },
            "day": [
                "2023-11-30",
                "2023-12-01",
                "2023-12-02",
                "2023-12-03",
                "2023-12-04",
                "2023-12-05",
                "2023-12-06"
            ],
            "weatherCode": [
                0,
                1,
                2,
                3,
                0,
                1,
                2
            ],
            /*"weatherCode": [
                3,
                51,
                3,
                51,
                53,
                51,
                73
            ],*/
            "temperatureLow": [
                28.1,
                33.5,
                44.6,
                55.1,
                44.7,
                42,
                33
            ],
            "temperatureHigh": [
                55.4,
                53.5,
                57.1,
                59,
                57.5,
                49.2,
                44
            ],
            "precipitation": [
                0,
                0.016,
                0,
                0.008,
                0.035,
                0.012,
                0.555
            ],
            "precipitationProbability": [
                0,
                25,
                14,
                28,
                19,
                2,
                17
            ]
        }
    };
}

// |Assets
const WEATHER_CODE_MAPPING = {
    0: {
        day: {
            description: 'Sunny',
            image: 'https://images.pexels.com/photos/666839/pexels-photo-666839.jpeg',
            iconFont: 'sunny'
        },
        night: {
            description: 'Clear',
            image: 'https://images.pexels.com/photos/6985116/pexels-photo-6985116.jpeg',
            iconFont: 'clear_night'
        }
    },
    1: {
        day: {
            description: 'Mostly Sunny',
            image: 'https://images.pexels.com/photos/1054220/pexels-photo-1054220.jpeg',
            iconFont: 'partly_cloudy_day'
        },
        night: {
            description: 'Mostly Clear',
            image: 'https://images.pexels.com/photos/6272237/pexels-photo-6272237.jpeg',
            iconFont: 'partly_cloudy_night'
        }
    },
    2: {
        day: {
            description: 'Partly Cloudy',
            image: 'https://images.pexels.com/photos/1054221/pexels-photo-1054221.jpeg',
            iconFont: 'partly_cloudy_day'
        },
        night: {
            description: 'Partly Cloudy',
            image: 'https://images.pexels.com/photos/3750779/pexels-photo-3750779.jpeg',
            iconFont: 'partly_cloudy_night'
        }
    },
    3: {
        day: {
            description: 'Cloudy',
            image: 'https://images.pexels.com/photos/1622513/pexels-photo-1622513.jpeg',
            iconFont: 'cloud'
        },
        night: {
            description: 'Cloudy',
            image: 'https://images.pexels.com/photos/416920/pexels-photo-416920.jpeg',
            iconFont: 'cloud'
        }
    },
    51: {
        day: {
            description: 'Light Drizzle',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Light Drizzle',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
}

// |Render
// Cache DOM
const UPDATE_TIME_SPAN = document.querySelector('.update-time');
const CURRENT_CONDITION_SECTION = {
    SELF: document.querySelector('.current-condition'),
    ICON_SPAN: document.querySelector('.main-card .material-symbols-outlined.icon'),
    DESCRIPTION_SPAN: document.querySelector('.main-card .description'),
    TEMPERATURE_SPAN: document.querySelector('.main-card .temperature')
}

function interpretWeatherCode(weatherCode) {
    // |todo use time to differentiate between night and day
    const dayNight = 'night';
    const { description, image, iconFont } = WEATHER_CODE_MAPPING[weatherCode][dayNight];
    return { description, image, iconFont };
}

function renderTime({ time, timezone: { timezoneLong, timezoneShort } }) {
    UPDATE_TIME_SPAN.textContent = `${time} ${timezoneShort} (${timezoneLong})`;
}

function renderCurrent({ temperature, weatherCode, currentUnits: { temperature: temperatureUnit } }) {
    const { description, image, iconFont } = interpretWeatherCode(weatherCode);
    CURRENT_CONDITION_SECTION.SELF.style.backgroundImage = `url('${image}')`;
    CURRENT_CONDITION_SECTION.ICON_SPAN.textContent = iconFont;
    CURRENT_CONDITION_SECTION.DESCRIPTION_SPAN.textContent = description;
    CURRENT_CONDITION_SECTION.TEMPERATURE_SPAN.textContent = `${temperature}${temperatureUnit}`;

}

async function renderForecast() {
    const { time, current, daily } = await getWeatherData();
    renderTime(time);
    renderCurrent(current);
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
    renderForecast();
    // const { latitude, longitude } = await getCurrentLocation();
})();