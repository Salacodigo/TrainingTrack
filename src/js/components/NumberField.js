import { createElement } from '../utils/dom.js';

// Labelled numeric input with the app's input styling.
function createNumberField({ id, label, value = 0 }){
    const input = createElement('input', {
        attributes: { type: 'number', id, name: id, placeholder: '0', min: '0', required: 'true' },
        classes: ['input-field'],
    });
    input.value = value;
    const span = createElement('span', { classes: ['span-style'], text: label });
    return createElement('label', { attributes: { for: id } }, [span, input]);
}

export { createNumberField };
