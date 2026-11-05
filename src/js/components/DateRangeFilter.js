import { createElement } from '../utils/dom.js';

function createDateField(id, labelText){
    const input = createElement('input', { attributes: { type: 'date', id }, classes: ['field__input'] });
    const label = createElement('label', { attributes: { for: id }, classes: ['field'] }, [
        createElement('span', { classes: ['field__label'], text: labelText }),
        input,
    ]);
    return { label, input };
}

// From/to date pickers; onChange receives both values as 'YYYY-MM-DD' (empty when unset).
function createDateRangeFilter({ idPrefix = 'date', onChange }){
    const from = createDateField(`${idPrefix}-from-filter`, 'Desde');
    const to = createDateField(`${idPrefix}-to-filter`, 'Hasta');
    const notify = () => onChange(from.input.value, to.input.value);
    from.input.addEventListener('change', notify);
    to.input.addEventListener('change', notify);
    return createElement('div', { classes: ['date-range-filter'] }, [from.label, to.label]);
}

export { createDateRangeFilter };
