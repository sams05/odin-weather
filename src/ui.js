import * as app from './app';
import { format } from 'date-fns';

// |Render
// Cache DOM
const UPDATE_TIME_SPAN = document.querySelector('.update-time');
const CURRENT_CONDITION_SECTION = {
    SELF: document.querySelector('.current-condition'),
    ICON_SPAN: document.querySelector('.main-card .material-symbols-outlined.icon'),
    DESCRIPTION_SPAN: document.querySelector('.main-card .description'),
    TEMPERATURE_SPAN: document.querySelector('.main-card .temperature')
}

function renderTime({ time, timezone: { timezoneLong, timezoneShort } }) {
    UPDATE_TIME_SPAN.textContent = `${format(new Date(time), 'PPPPp')} ${timezoneShort} (${timezoneLong})`;
}

function renderCurrent({ temperature, weatherCode, currentUnits: { temperature: temperatureUnit } }, time, daytimeRange) {
    const { description, image, iconFont } = app.interpretWeatherCode(weatherCode, time, daytimeRange);
    CURRENT_CONDITION_SECTION.SELF.style.backgroundImage = `url('${image}')`;
    CURRENT_CONDITION_SECTION.ICON_SPAN.textContent = iconFont;
    CURRENT_CONDITION_SECTION.DESCRIPTION_SPAN.textContent = description;
    CURRENT_CONDITION_SECTION.TEMPERATURE_SPAN.textContent = `${temperature}${temperatureUnit}`;

}

async function renderForecast() {
    const { time, current, daytimeRange, daily } = await app.getWeatherData();
    renderTime(time);
    // Need to use the time and daytimeRange to differentiate current condition between 
    // daytime and nighttime
    renderCurrent(current, time.time, daytimeRange);
}

export { renderForecast };