import { createElement } from '../utils/dom.js';

// Generic <select>; calls onChange with the selected value.
function createSelectField({ id, options, value, onChange, optionClass = 'filterBtn' }){
    const optionElements = options.map(option =>
        createElement('option', { attributes: { value: option }, classes: [optionClass], text: option }));
    const select = createElement('select', { attributes: { id, name: id } }, optionElements);
    if (value) select.value = value;
    select.addEventListener('change', () => onChange(select.value));
    return select;
}

export { createSelectField };
