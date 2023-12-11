const INDICATOR_OVERLAYS = {
    TOP_LEVEL: document.querySelectorAll('.indicator-overlay:not(.search-modal .indicator-overlay)'),
    SEARCH_RESULTS: document.querySelector('.search-modal .indicator-overlay'),
};

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

export { renderTopLevelLoadingIndicator, removeTopLevelLoadingIndicator, renderSearchResultsLoadingIndicator, removeSearchResultsLoadingIndicator };