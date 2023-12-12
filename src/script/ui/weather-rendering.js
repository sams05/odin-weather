import { format } from 'date-fns';
import { app } from './ui';
import { renderTopLevelLoadingIndicator, removeTopLevelLoadingIndicator } from './indicator-overlay';

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

function renderTime({ time, timezone: { timezoneLong, timezoneShort } }) {
    UPDATE_TIME_SPAN.textContent = `${format(new Date(time), 'PPPPp')} ${timezoneShort} (${timezoneLong})`;
}

function renderCurrent({ temperature, isDay, weatherCode, currentUnits: { temperature: temperatureUnit } }) {
    const { description, image, iconFont } = app.interpretWeatherCode(weatherCode, isDay);
    CURRENT_CONDITION_SECTION.SELF.style.backgroundImage = `url("${image}")`;
    CURRENT_CONDITION_SECTION.ICON_SPAN.textContent = iconFont;
    CURRENT_CONDITION_SECTION.DESCRIPTION_SPAN.textContent = description;
    CURRENT_CONDITION_SECTION.TEMPERATURE_SPAN.textContent = `${temperature}${temperatureUnit}`;
}

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
        const temperatureLowP = document.createElement('p');
        const temperatureHighP = document.createElement('p');
        const precipitationP = document.createElement('p');
        const precipitationProbabilityP = document.createElement('p');
        conditionP.textContent = description;
        temperatureHighP.textContent = `H: ${temperatureHigh[i]} ${dailyUnits.temperatureHigh}`;
        temperatureLowP.textContent = `L: ${temperatureLow[i]} ${dailyUnits.temperatureLow}`;
        precipitationP.textContent = `Precip.: ${precipitation[i]} ${dailyUnits.precipitation}`;
        precipitationProbabilityP.textContent = `Chance: ${[precipitationProbability[i]]} ${dailyUnits.precipitationProbability}`;
        forecastDetailsDiv.append(conditionP, temperatureLowP, temperatureHighP, precipitationP, precipitationProbabilityP);

        FORECAST_SECTION.FORECAST_CARDS_DIV.append(cardDiv);
    }
}

// |TODO use reverse geolocation to get location name instead of pulling from global variable
function renderLocation(latitude, longitude) {
    const locationName = currentSetting.locationName ?? `${latitude}, ${longitude}`;
    LOCATION_H.textContent = locationName;
}

// Persists with values from currentSetting by default except with locationName.
async function renderForecast(latitude = currentSetting.latitude, longitude = currentSetting.longitude, { temperatureUnit = currentSetting.temperatureUnit } = {}) {
    currentSetting.latitude = latitude;
    currentSetting.longitude = longitude;
    currentSetting.temperatureUnit = temperatureUnit;

    renderTopLevelLoadingIndicator();
    const { time, current, daily } = await app.getWeatherData(latitude, longitude, temperatureUnit);
    renderLocation(latitude, longitude);
    renderTime(time);
    renderCurrent(current);
    renderDaily(daily);
    removeTopLevelLoadingIndicator();
}

export { renderForecast, currentSetting };