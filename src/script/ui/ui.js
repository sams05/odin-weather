import { initModal } from './modal';
import { initSearch } from './location-search-ui';

const SEARCH_MODAL = {
    MODAL_TRIGGER_BTN: document.querySelector('[data-target-modal-id]'),
    SEARCH_BTN: document.querySelector('.search-btn')
};

// |Initialization
initModal(SEARCH_MODAL.MODAL_TRIGGER_BTN);
initSearch(SEARCH_MODAL.SEARCH_BTN);

// reexport app for component ui modules to use
export * as app from '../app/app';
export { renderForecast } from './weather-rendering';