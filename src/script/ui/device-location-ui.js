import { app } from './ui';
import { renderForecast, currentSetting } from './weather-rendering';

const DETECT_LOCATION_BTN = document.querySelector('.detect-location-btn');

async function renderCurrentLocationForecast() {
    const { latitude, longitude } = await app.getCurrentLocation();
    currentSetting.locationName = undefined;
    renderForecast(latitude, longitude);
}

// Initialization
DETECT_LOCATION_BTN.addEventListener('click', e => {
    renderCurrentLocationForecast();
});
