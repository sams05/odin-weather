import { format } from 'date-fns';
import { app } from './ui';
import { renderTopLevelLoadingIndicator, removeTopLevelLoadingIndicator } from './indicator-overlay';

// Cache DOM
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

function renderCurrent({ temperature, weatherCode, currentUnits: { temperature: temperatureUnit } }, time, daytimeRange) {
    const { description, image, iconFont } = app.interpretWeatherCode(weatherCode, time, daytimeRange);
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

async function renderForecast(latitude, longitude) {
    renderTopLevelLoadingIndicator();
    const { time, current, daytimeRange, daily } = await app.getWeatherData(latitude, longitude);
    renderTime(time);
    // Need to use the time and daytimeRange to differentiate current condition between 
    // daytime and nighttime
    renderCurrent(current, time.time, daytimeRange);
    renderDaily(daily);
    removeTopLevelLoadingIndicator();
}

export { renderForecast };