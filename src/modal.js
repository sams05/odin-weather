
function closeModalOutsideRange(modal, clientX, clientY) {
    const modalDimensions = modal.getBoundingClientRect();
    if (
        clientX < modalDimensions.left ||
        clientX > modalDimensions.right ||
        clientY < modalDimensions.top ||
        clientY > modalDimensions.bottom
    ) {
        modal.close();
    }
}

/**
 * Add event listeners to make a modal trigger element and its corresponding modal (a dialog element) functional.
 * @param {HTMLElement} modalTriggerElem The HTML Element i.e. button to open a modal. The element should have
 * a data-target-modal-id attribute to identify id of the modal to open. The modal element should have a close button
 * with class modal-close-btn
 */
function initModal(modalTriggerElem) {
    const modalId = modalTriggerElem.dataset.targetModalId;
    const modal = document.getElementById(modalId);
    const modalCloseBtn = modal.querySelector('.modal-close-btn');

    // To open modal
    modalTriggerElem.addEventListener('click', e => {
        modal.showModal();
    });
    // To close modal by clicking outside the modal
    modal.addEventListener('click', e => {
        const { clientX, clientY } = e;
        closeModalOutsideRange(modal, clientX, clientY);
    });
    // To close modal using its close button
    modalCloseBtn.addEventListener('click', e => {
        modal.close();
    });
}


export { initModal };