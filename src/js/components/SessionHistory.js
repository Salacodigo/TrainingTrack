import { createElement, clearElement } from '../utils/dom.js';

function createSessionEntry(session){
    const date = createElement('p', {
        classes: ['routine-date'],
        text: new Date(session.date.registered).toDateString(),
    });
    const exercises = session.exerciseList.map(exercise => createElement('p', {
        classes: ['exercise-count'],
        text: `${exercise.name} : ${exercise.repetitions ?? 0}`,
    }));
    return [date, createElement('div', { classes: ['exercise-container'] }, exercises)];
}

// Lists each session with its date and the reps per exercise.
function renderSessionHistory(container, sessions){
    clearElement(container);
    if (!sessions.length){
        container.appendChild(createElement('p', { classes: ['routine-date'], text: 'Sin sesiones en este rango' }));
        return;
    }
    sessions.flatMap(createSessionEntry).forEach(element => container.appendChild(element));
}

export { renderSessionHistory };
