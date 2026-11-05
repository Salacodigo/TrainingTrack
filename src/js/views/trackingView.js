import { byId, showElement, hideElement, clearElement } from '../utils/dom.js';
import { getCurrentSession, setRepetitions, saveCurrentSession } from '../state/sessionStore.js';
import { createNumberField } from '../components/NumberField.js';

function renderRepsFields(form){
    clearElement(form);
    getCurrentSession().exerciseList.forEach(exercise =>
        form.appendChild(createNumberField({ id: exercise.id, label: exercise.name })));
}

function saveRepsFromForm(form){
    form.querySelectorAll('input').forEach(input => setRepetitions(input.id, Number(input.value)));
}

// One reps input per exercise; finishing saves the session and opens the results.
function initTrackingView({ onFinish }){
    const container = byId('routine-tracking-container');
    const form = byId('routine-tracking');

    const saveProgress = event => {
        event.preventDefault();
        saveRepsFromForm(form);
    };
    form.addEventListener('submit', saveProgress);
    byId('reps-tracking-btn').addEventListener('click', saveProgress);
    byId('save-tracking-btn').addEventListener('click', () => {
        saveRepsFromForm(form);
        saveCurrentSession();
        hideElement(container);
        onFinish();
    });

    return {
        show: () => {
            renderRepsFields(form);
            showElement(container);
        },
    };
}

export { initTrackingView };
