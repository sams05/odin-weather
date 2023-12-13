/* Naming note: 
The indicator overlays and corresponding functions are named to emphasize the overlay's containers in the page.
The error overlays and corresponding functions are named to emphasize which app functionality is causing the error.
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

function renderSearchError(message) {
    ERROR_OVERLAYS.SEARCH.replaceChildren(message);
    ERROR_OVERLAYS.SEARCH.classList.add('active');
}

function clearSearchError() {
    ERROR_OVERLAYS.SEARCH.replaceChildren();
    ERROR_OVERLAYS.SEARCH.classList.remove('active');
}

export { renderTopLevelLoadingIndicator, removeTopLevelLoadingIndicator, renderSearchResultsLoadingIndicator, removeSearchResultsLoadingIndicator, renderSearchError, clearSearchError };