// Pure chart data builders: no DOM and no chart library, so they run in Node tests.
import { isInDateRange } from './dateRange.js';

const pad = value => String(value).padStart(2, '0');

function formatSessionLabel(pDate){
    const date = new Date(pDate);
    const day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    return `${day} ${time}`;
}

function userSessions(pSessions, pUserName){
    return pSessions.filter(session => session.user.name == pUserName);
}

function listExerciseNames(pSessions, pUserName){
    const names = userSessions(pSessions, pUserName)
        .flatMap(session => session.exerciseList.map(exercise => exercise.id.toLowerCase()));
    return [...new Set(names)];
}

function buildExerciseSeries(pSessions, pUserName, pExerciseName, pRange){
    const name = pExerciseName.toLowerCase();
    const points = userSessions(pSessions, pUserName)
        .filter(session => isInDateRange(session.date.registered, pRange))
        .flatMap(session => session.exerciseList
            .filter(exercise => exercise.id.toLowerCase() == name)
            .map(exercise => ({ x: formatSessionLabel(session.date.registered), y: exercise.repetitions })));
    return { name, points };
}

export { formatSessionLabel, listExerciseNames, buildExerciseSeries };
