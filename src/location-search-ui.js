import { app } from "./ui";

const SEARCH_BAR = document.getElementById('location-search');
const RESULTS_DIV = document.querySelector('.results');
const RESULT_TEMPLATE = document.querySelector('.result-template');

// |Todo handle missing admin1
function renderResults(results) {
    RESULTS_DIV.replaceChildren(); // Clear the results
    for (const { name, latitude, longitude, country, admin1 } of results) {
        const resultBtn = RESULT_TEMPLATE.content.cloneNode(true).firstElementChild;
        // Print result as 'name, admin1 (if found), country'
        resultBtn.textContent = `${name}${(admin1 !== undefined && admin1 !== null) ? (', ' + admin1) : ''}, ${country}`;
        resultBtn.dataset.latitude = latitude;
        resultBtn.dataset.longitude = longitude;
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