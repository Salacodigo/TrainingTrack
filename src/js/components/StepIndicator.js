import { byId } from '../utils/dom.js';

// Highlights the current step and marks the previous ones as done.
function setActiveStep(step, listId = 'steps'){
    byId(listId).querySelectorAll('[data-step]').forEach(item => {
        const itemStep = Number(item.dataset.step);
        item.classList.toggle('is-active', itemStep == step);
        item.classList.toggle('is-done', itemStep < step);
        item.toggleAttribute('aria-current', itemStep == step);
    });
}

export { setActiveStep };
