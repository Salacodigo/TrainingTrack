import { createElement } from '../utils/dom.js';

function createDateInput(id, labelText){
    const label = createElement('label', { attributes: { for: id }, text: labelText });
    const input = createElement('input', { attributes: { type: 'date', id }, classes: ['input-field'] });
    return { label, input };
}

// From/to date pickers; onChange receives both values as 'YYYY-MM-DD' (empty when unset).
function createDateRangeFilter({ idPrefix = 'date', onChange }){
    const from = createDateInput(`${idPrefix}-from-filter`, 'Desde:');
    const to = createDateInput(`${idPrefix}-to-filter`, 'Hasta:');
    const notify = () => onChange(from.input.value, to.input.value);
    from.input.addEventListener('change', notify);
    to.input.addEventListener('change', notify);
    return createElement('div', { classes: ['date-range-filter'] },
        [from.label, from.input, to.label, to.input]);
}

export { createDateRangeFilter };
