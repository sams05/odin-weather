import './style.css';
import { renderForecast } from './ui';

/*
const modal = document.querySelector('.search-modal');
modal.showModal(); 
*/

// Initialize using user location
(async function init() {
    renderForecast();
    // const { latitude, longitude } = await getCurrentLocation();
})();