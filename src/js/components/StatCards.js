import { createElement, clearElement } from '../utils/dom.js';

// Row of headline numbers; each stat is { label, value }.
function renderStatCards(container, stats){
    clearElement(container);
    stats.forEach(stat => container.appendChild(createElement('div', { classes: ['stat'] }, [
        createElement('span', { classes: ['stat__value'], text: String(stat.value) }),
        createElement('span', { classes: ['stat__label'], text: stat.label }),
    ])));
}

export { renderStatCards };
