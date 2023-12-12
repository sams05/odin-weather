import { renderForecast } from './weather-rendering';

const UNITS_TOGGLE_BTN = document.querySelector('.temperature-units-toggle');
const FAHRENHEIT_BTN = document.querySelector('[data-unit=fahrenheit]');
const CELSIUS_BTN = document.querySelector('[data-unit=celsius]');

function toggleUnits(unit = 'fahrenheit') {
    renderForecast(undefined, undefined, { temperatureUnit: unit });
    if(unit === 'fahrenheit') {
        FAHRENHEIT_BTN.classList.add('active');
        CELSIUS_BTN.classList.remove('active');
    } else {
        FAHRENHEIT_BTN.classList.remove('active');
        CELSIUS_BTN.classList.add('active');
    }
    
}

(function initUnitsToggle() {
    // Get the unit from either FAHRENHEIT_BTN or CELSIUS_BTN nested inside
    UNITS_TOGGLE_BTN.addEventListener('click', e => {
        if (e.target.dataset.unit === undefined) {
            return;
        }
        toggleUnits(e.target.dataset.unit);
    });
})();