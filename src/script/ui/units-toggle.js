import { renderForecast } from './weather-rendering';

const UNITS_TOGGLE_BTN = document.querySelector('.temperature-units-toggle');
const FAHRENHEIT_BTN = document.querySelector('[data-unit=fahrenheit]');
const CELSIUS_BTN = document.querySelector('[data-unit=celsius]');

/**
 * Render forecast with the specified unit
 * @param {String} unit fahrenheit or celsius
 */
function toggleUnits(unit = 'fahrenheit') {
    // Set latitude and longitude to undefined to default to value of currentSetting
    renderForecast(undefined, undefined, { temperatureUnit: unit });
    // Change styling of toggle button to highlight newly selected unit
    if(unit === 'fahrenheit') {
        FAHRENHEIT_BTN.classList.add('active');
        CELSIUS_BTN.classList.remove('active');
    } else {
        FAHRENHEIT_BTN.classList.remove('active');
        CELSIUS_BTN.classList.add('active');
    }
}

// Initialize the toggle button
(function initUnitsToggle() {
    UNITS_TOGGLE_BTN.addEventListener('click', e => {
        // Get the unit (dataset.unit) from either FAHRENHEIT_BTN or CELSIUS_BTN nested inside the toggle button
        if (e.target.dataset.unit === undefined) {
            return;
        }
        toggleUnits(e.target.dataset.unit);
    });
})();