import { createElement } from '../utils/dom.js';

function createStepButton(input, delta, label){
    const button = createElement('button', {
        attributes: { type: 'button', 'aria-label': label },
        classes: ['stepper__btn'],
        text: delta > 0 ? '+' : '−',
    });
    button.addEventListener('click', () => {
        input.value = Math.max(0, Number(input.value || 0) + delta);
    });
    return button;
}

// Labelled numeric input with −/+ buttons, big enough to tap mid-workout.
function createNumberField({ id, label, value = 0, step = 1 }){
    const input = createElement('input', {
        attributes: { type: 'number', id, name: id, min: '0', inputmode: 'numeric', required: 'true' },
        classes: ['stepper__input'],
    });
    input.value = value;
    const stepper = createElement('div', { classes: ['stepper'] }, [
        createStepButton(input, -step, `Restar ${step} a ${label}`),
        input,
        createStepButton(input, step, `Sumar ${step} a ${label}`),
    ]);
    const name = createElement('span', { classes: ['rep-row__name'], text: label });
    return createElement('label', { attributes: { for: id }, classes: ['rep-row'] }, [name, stepper]);
}

export { createNumberField };
