import { createElement, clearElement } from '../utils/dom.js';

const dateFormat = new Intl.DateTimeFormat('es', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

function createExerciseRow(exercise){
    return createElement('li', { classes: ['session__row'] }, [
        createElement('span', { text: exercise.name }),
        createElement('span', { classes: ['badge'], text: `${exercise.repetitions ?? 0} reps` }),
    ]);
}

function createSessionCard(session){
    const date = createElement('time', {
        attributes: { datetime: session.date.registered },
        classes: ['session__date'],
        text: dateFormat.format(new Date(session.date.registered)),
    });
    const rows = createElement('ul', { classes: ['session__rows'] }, session.exerciseList.map(createExerciseRow));
    return createElement('article', { classes: ['session'] }, [date, rows]);
}

// Lists each session, newest first, with the reps per exercise.
function renderSessionHistory(container, sessions){
    clearElement(container);
    if (!sessions.length){
        container.appendChild(createElement('p', { classes: ['empty'], text: 'No hay sesiones en este rango de fechas.' }));
        return;
    }
    [...sessions].reverse().forEach(session => container.appendChild(createSessionCard(session)));
}

export { renderSessionHistory };
