import '../style.css';
import '../toastify.css';
import { renderForecast } from './ui/ui';

// Initialize using user location
(async function init() {
    renderForecast();
    // const { latitude, longitude } = await getCurrentLocation();
})();