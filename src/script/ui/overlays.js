/* Naming note: 
The indicator overlays and corresponding functions are named to emphasize the their container.
The error overlays and corresponding functions are named to emphasize the app functionality causing the error.
*/

const INDICATOR_OVERLAYS = {
    TOP_LEVEL: document.querySelectorAll('.indicator-overlay:not(.search-modal .indicator-overlay)'),
    SEARCH_RESULTS: document.querySelector('.search-modal .indicator-overlay'),
};
const ERROR_OVERLAYS = {
    SEARCH: document.querySelector('.search-modal .error-overlay')
}

function renderTopLevelLoadingIndicator() {
    for (const indicatorOverlay of INDICATOR_OVERLAYS.TOP_LEVEL) {
        indicatorOverlay.classList.add('active');
    }
}

function removeTopLevelLoadingIndicator() {
    for (const indicatorOverlay of INDICATOR_OVERLAYS.TOP_LEVEL) {
        indicatorOverlay.classList.remove('active');
    }
}

function renderSearchResultsLoadingIndicator() {
    INDICATOR_OVERLAYS.SEARCH_RESULTS.classList.add('active');
}

function removeSearchResultsLoadingIndicator() {
    INDICATOR_OVERLAYS.SEARCH_RESULTS.classList.remove('active');
}

/**
 * Add error messages to the search result overlay then show the overlay
 * @param {String} message 
 */
function renderSearchError(message) {
    ERROR_OVERLAYS.SEARCH.replaceChildren(message);
    ERROR_OVERLAYS.SEARCH.classList.add('active');
}

/**
 * Remove error messages on the search result overlay then hide the overlay
 */
function clearSearchError() {
    ERROR_OVERLAYS.SEARCH.replaceChildren();
    ERROR_OVERLAYS.SEARCH.classList.remove('active');
}

export { renderTopLevelLoadingIndicator, removeTopLevelLoadingIndicator, renderSearchResultsLoadingIndicator, removeSearchResultsLoadingIndicator, renderSearchError, clearSearchError };