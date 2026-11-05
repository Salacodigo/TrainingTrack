import { createElement, clearElement } from '../utils/dom.js';

// Renders plain text items into an existing <ul>/<ol>.
function renderItemList(listElement, items, itemClass = 'exercise-item'){
    clearElement(listElement);
    items.forEach(text => listElement.appendChild(createElement('li', { classes: [itemClass], text })));
}

export { renderItemList };
