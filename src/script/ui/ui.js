/**
 * Module to initialize the UI components
 */

import { initModal } from './modal';
import './location-search-ui';
import './device-location-ui';
import './units-toggle';

// Initialize modal
const MODAL_TRIGGER_BTN = document.querySelector('[data-target-modal-id]');
initModal(MODAL_TRIGGER_BTN);

// Reexport app for component ui modules to use
export * as app from '../app/app';
export { renderForecast } from './weather-rendering';