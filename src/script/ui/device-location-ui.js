import { app } from './ui';
import { renderForecast, currentSetting } from './weather-rendering';
import Toastify from 'toastify-js';

const DETECT_LOCATION_BTN = document.querySelector('.detect-location-btn');

/**
 * Display a toast message to the use when the app is unable to get the device
 * location.
 * @param {GeolocationPositionError} error 
 */
function renderErrorMessage(error) {
    const { code } = error;
    let message;
    switch (code) {
        case 1:
            message = 'Unable to access your location. Please enable location services in your device settings to receive accurate weather information.'
            break;
        case 2:
            message = 'Oops! We encountered an issue while trying to fetch your location. Please try again later. If the issue persists, consider manually entering your location.'
            break;
        case 3:
            message = 'It seems to be taking longer than usual to fetch your location. Please try again later. If the issue persists, consider manually entering your location.'
    }
    Toastify({
        text: message,
        duration: 10000,
        close: true,
        stopOnFocus: true
    }).showToast();
}

/**
 * Get location from user's device and display its forecast.
 */
async function renderCurrentLocationForecast() {
    try {
        const { latitude, longitude } = await app.getCurrentLocation();
        currentSetting.locationName = undefined;
        renderForecast(latitude, longitude);
    } catch (error) {
        renderErrorMessage(error);
    }
}

// Initialization
DETECT_LOCATION_BTN.addEventListener('click', e => {
    renderCurrentLocationForecast();
});
