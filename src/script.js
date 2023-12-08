import './style.css';
import { renderForecast } from './ui';

// Initialize using user location
(async function init() {
    renderForecast();
    // const { latitude, longitude } = await getCurrentLocation();
})();