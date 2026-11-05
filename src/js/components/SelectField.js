import { createElement } from '../utils/dom.js';

// Generic <select>; calls onChange with the selected value.
function createSelectField({ id, options, value, onChange }){
    const optionElements = options.map(option =>
        createElement('option', { attributes: { value: option }, text: option }));
    const select = createElement('select', { attributes: { id, name: id }, classes: ['field__input'] }, optionElements);
    if (value) select.value = value;
    select.addEventListener('change', () => onChange(select.value));
    return select;
}

export { createSelectField };
