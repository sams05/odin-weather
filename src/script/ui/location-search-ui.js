import { app } from './ui';
import { renderForecast, currentSetting } from './weather-rendering';
import { renderSearchResultsLoadingIndicator, removeSearchResultsLoadingIndicator, renderSearchError, clearSearchError } from './overlays';

const SEARCH_BTN = document.querySelector('.search-btn');
const SEARCH_BAR = document.getElementById('location-search');
const RESULTS_DIV = document.querySelector('.results');
const RESULT_TEMPLATE = document.querySelector('.result-template');

/**
 * Render the results given by searchLocation
 * @param {Array<Object>} results Objects with the following schema: {name, latitude, longitude, country, admin1}
 */
function renderResults(results) {
    RESULTS_DIV.replaceChildren(); // Clear the results from prior searches
    for (const { name, latitude, longitude, country, admin1 } of results) {
        const resultBtn = RESULT_TEMPLATE.content.cloneNode(true).firstElementChild;
        // Print result as 'name, admin1, country; filtering out any undefined fields'
        const displayFields = [name, admin1, country].filter(field => (field !== null) && (field !== undefined));
        resultBtn.textContent = `${displayFields.join(', ')}`;
        // Store latitude and longitude for use if selected by the user
        resultBtn.dataset.latitude = latitude;
        resultBtn.dataset.longitude = longitude;
        // Render the forecast for the location if selected
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

/**
 * Take user input to search for locations
 */
async function searchLocation() {
    renderSearchResultsLoadingIndicator();
    clearSearchError(); // Remove any search error messages from prior searches
    const query = SEARCH_BAR.value; // Query may be location name or postal codes
    try {
        const results = await app.getGeocode(query);
        renderResults(results);
    } catch(error) {
        renderSearchError('Oops! Something went wrong while searching for the location.');
    }
    removeSearchResultsLoadingIndicator();
}

// Initialization
(function initSearch() {
    SEARCH_BTN.addEventListener('click', e => {
        searchLocation();
    });
})();
