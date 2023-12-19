import { format } from 'date-fns';
import { app } from './ui';
import { renderTopLevelLoadingIndicator, removeTopLevelLoadingIndicator } from './overlays';
import Toastify from 'toastify-js';

// latitude, longitude, and temperatureUnit to be updated whenever renderForecast is called
// locationName to be updated whenever new location is selected
const currentSetting = { latitude: 38.8951, longitude: -77.0364, locationName: 'Washington, Washington, D.C., United States', temperatureUnit: 'fahrenheit' };

// Cache DOM
const LOCATION_H = document.querySelector('.location');
const UPDATE_TIME_SPAN = document.querySelector('.update-time');
const CURRENT_CONDITION_SECTION = {
    SELF: document.querySelector('.current-condition'),
    ICON_SPAN: document.querySelector('.main-card .material-symbols-outlined.icon'),
    DESCRIPTION_SPAN: document.querySelector('.main-card .description'),
    TEMPERATURE_SPAN: document.querySelector('.main-card .temperature')
}
const FORECAST_SECTION = {
    FORECAST_CARD_TEMPLATE: document.querySelector('.card-template'),
    FORECAST_CARDS_DIV: document.querySelector('.forecast-cards')
}

/**
 * Render a toast notification when there is an error
 * @param {String} message 
 */
function renderWeatherDataError(message) {
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        stopOnFocus: true
    }).showToast();
}

/**
 * Render the last update time. Weather data is only available in 15 minute increments.
 * @param {Object} time time property given by app.getWeatherData(). 
 * timezoneLong gives the timezone identifier and timezoneShort give its abbreviation.
 */
function renderTime({ time, timezone: { timezoneLong, timezoneShort } }) {
    UPDATE_TIME_SPAN.textContent = `${format(new Date(time), 'PPPPp')} ${timezoneShort} (${timezoneLong})`;
}

/**
 * Render current weather (current temperature and weather condition) and change the
 * icon and background image according to the weather condition. The weather condition is specified by the weather code.
 * @param {Object} current current property given by app.getWeatherData()
 */
function renderCurrent({ temperature, isDay, weatherCode, currentUnits: { temperature: temperatureUnit } }) {
    const { description, image, iconFont } = app.interpretWeatherCode(weatherCode, isDay);
    CURRENT_CONDITION_SECTION.SELF.style.backgroundImage = `url("${image}")`;
    CURRENT_CONDITION_SECTION.ICON_SPAN.textContent = iconFont;
    CURRENT_CONDITION_SECTION.DESCRIPTION_SPAN.textContent = description;
    CURRENT_CONDITION_SECTION.TEMPERATURE_SPAN.textContent = `${temperature}${temperatureUnit}`;
}

/**
 * Render cards for daily forecast
 * @param {Object} daily daily property given by app.getWeatherData(): day, weatherCode, temperatureLow, temperatureHigh, 
 * precipitation, and precipitation Probability are all arrays containing their respective data for each day. dailyUnits 
 * have properties specifying the units of the data.
 */
function renderDaily({ dailyUnits, day, weatherCode, temperatureLow, temperatureHigh, precipitation, precipitationProbability }) {
    // Clear container
    FORECAST_SECTION.FORECAST_CARDS_DIV.replaceChildren();
    // Create a card for each day
    for (let i = 0; i < day.length; i++) {
        const cardDiv = FORECAST_SECTION.FORECAST_CARD_TEMPLATE.content.cloneNode(true);
        // Get top level elements of card
        const dayP = cardDiv.querySelector('.day');
        const iconSpan = cardDiv.querySelector('.icon');
        const forecastDetailsDiv = cardDiv.querySelector('.forecast-details');

        // Day and icon
        dayP.textContent = format(new Date(day[i]), 'EEE, LLL do')
        const { description, iconFont } = app.interpretWeatherCode(weatherCode[i]);
        iconSpan.textContent = iconFont;

        // Forecast details
        const conditionP = document.createElement('p');
        const temperatureHighP = document.createElement('p');
        const temperatureLowP = document.createElement('p');
        const precipitationP = document.createElement('p');
        const precipitationProbabilityP = document.createElement('p');
        conditionP.textContent = description;
        temperatureHighP.textContent = `H: ${temperatureHigh[i]} ${dailyUnits.temperatureHigh}`;
        temperatureLowP.textContent = `L: ${temperatureLow[i]} ${dailyUnits.temperatureLow}`;
        precipitationP.textContent = `Precip.: ${precipitation[i]} ${dailyUnits.precipitation}`;
        precipitationProbabilityP.textContent = `Chance: ${[precipitationProbability[i]]} ${dailyUnits.precipitationProbability}`;
        forecastDetailsDiv.append(conditionP, temperatureHighP, temperatureLowP, precipitationP, precipitationProbabilityP);

        FORECAST_SECTION.FORECAST_CARDS_DIV.append(cardDiv);
    }
}

// |TODO use reverse geolocation to get location name instead of pulling from global variable
function renderLocation(latitude, longitude) {
    // If no name is found, print the latitude and longitude to 3 decimal places
    const locationName = currentSetting.locationName ?? `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
    LOCATION_H.textContent = locationName;
}

/**
 * Render forecast for the given location
 * Persists with values from currentSetting by default except with locationName.
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @param {Object} options Set options, namely temperatureUnit which can be celsius or fahrenheit 
 */
async function renderForecast(latitude = currentSetting.latitude, longitude = currentSetting.longitude, { temperatureUnit = currentSetting.temperatureUnit } = {}) {
    // Update currentSetting for persistence
    currentSetting.latitude = latitude;
    currentSetting.longitude = longitude;
    currentSetting.temperatureUnit = temperatureUnit;

    renderTopLevelLoadingIndicator();
    try {
        const { time, current, daily } = await app.getWeatherData(latitude, longitude, temperatureUnit);
        renderLocation(latitude, longitude);
        renderTime(time);
        renderCurrent(current);
        renderDaily(daily);
    } catch (error) {
        renderWeatherDataError('Oops! We\'re unable to update the weather data');
    }
    removeTopLevelLoadingIndicator();
}

// Have to expose currentSetting for renderForecast's caller to update locationName
export { renderForecast, currentSetting };