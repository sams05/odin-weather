import { app, renderForecast } from './ui';

const SEARCH_BAR = document.getElementById('location-search');
const RESULTS_DIV = document.querySelector('.results');
const RESULT_TEMPLATE = document.querySelector('.result-template');

// |Todo handle missing admin1
// Assumes that the resultBtn is in a dialog modal
function renderResults(results) {
    RESULTS_DIV.replaceChildren(); // Clear the results
    for (const { name, latitude, longitude, country, admin1 } of results) {
        const resultBtn = RESULT_TEMPLATE.content.cloneNode(true).firstElementChild;
        // Print result as 'name, admin1, country; filtering out any undefined fields'
        const displayFields = [name, admin1, country].filter(field => (field !== null) && (field !== undefined));
        resultBtn.textContent = `${displayFields.join(', ')}`;
        resultBtn.dataset.latitude = latitude;
        resultBtn.dataset.longitude = longitude;
        resultBtn.addEventListener('click', e => {
            // Render forecast for the selected location and close modal
            const resultBtn = e.currentTarget;
            const modal = resultBtn.closest('dialog');
            const { latitude, longitude } = resultBtn.dataset;
            renderForecast(latitude, longitude);
            modal.close();
        });
        RESULTS_DIV.append(resultBtn);
    }
}

async function searchLocation() {
    const query = SEARCH_BAR.value;
    const results = await app.getGeocode(query);
    renderResults(results);
}

/**
 * 
 * @param {HTMLButtonElement} searchBtn 
 */
function initSearch(searchBtn) {
    searchBtn.addEventListener('click', e => {
        searchLocation({});
    });
}

export { initSearch };