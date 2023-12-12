import { initModal } from './modal';
import './location-search-ui';
import './device-location-ui';
import './units-toggle';

const MODAL_TRIGGER_BTN = document.querySelector('[data-target-modal-id]');

// |Initialization
initModal(MODAL_TRIGGER_BTN);

// reexport app for component ui modules to use
export * as app from '../app/app';
export { renderForecast } from './weather-rendering';