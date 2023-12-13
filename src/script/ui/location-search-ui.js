import { app } from './ui';
import { renderForecast, currentSetting } from './weather-rendering';
import { renderSearchResultsLoadingIndicator, removeSearchResultsLoadingIndicator } from './indicator-overlay';

const SEARCH_BTN = document.querySelector('.search-btn');
const SEARCH_BAR = document.getElementById('location-search');
const RESULTS_DIV = document.querySelector('.results');
const RESULT_TEMPLATE = document.querySelector('.result-template');
const ERROR_OVERLAY = document.querySelector('.results-container .error-overlay');

function clearError() {
    ERROR_OVERLAY.replaceChildren();
    ERROR_OVERLAY.classList.remove('active');
}

function renderError(message) {
    ERROR_OVERLAY.replaceChildren(message);
    ERROR_OVERLAY.classList.add('active');
}

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
            // Assumes that the resultBtn is in a dialog modal
            const modal = resultBtn.closest('dialog');
            const { latitude, longitude } = resultBtn.dataset;
            renderForecast(latitude, longitude);
            currentSetting.locationName = resultBtn.textContent;
            modal.close();
        });
        RESULTS_DIV.append(resultBtn);
    }
    if(results.length === 0) {
        RESULTS_DIV.append('No results found for the entered location.');
    }
}

async function searchLocation() {
    renderSearchResultsLoadingIndicator();
    clearError();
    const query = SEARCH_BAR.value;
    try {
        const results = await app.getGeocode(query);
        renderResults(results);
    } catch(error) {
        renderError('Oops! Something went wrong while searching for the location.');
    }
    removeSearchResultsLoadingIndicator();
}

// Initialization
(function initSearch() {
    SEARCH_BTN.addEventListener('click', e => {
        searchLocation();
    });
})();
