import { byId, showElement, hideElement } from '../utils/dom.js';
import { addExercise, getCurrentSession } from '../state/sessionStore.js';
import { renderItemList } from '../components/ItemList.js';

const DEFAULT_EXERCISE = 'Sentadillas';

// Builds today's routine; the start button unlocks once there is one exercise.
function initExerciseView({ onStart }){
    const container = byId('exercises-list-register-container');
    const form = byId('exercise-register');
    const input = byId('exercise-name');
    const startButton = byId('startTrainning-btn');
    input.value = DEFAULT_EXERCISE;

    const submit = event => {
        event.preventDefault();
        const name = input.value.trim();
        if (!name) return;
        addExercise(name);
        const exercises = getCurrentSession().exerciseList;
        renderItemList(byId('exercise-list'), exercises.map(exercise => exercise.name));
        startButton.disabled = exercises.length == 0;
        form.reset();
    };
    form.addEventListener('submit', submit);
    byId('exercise-submit-btn').addEventListener('click', submit);
    startButton.addEventListener('click', () => {
        hideElement(container);
        onStart();
    });

    return { show: () => showElement(container) };
}

export { initExerciseView };
