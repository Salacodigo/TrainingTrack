// Single source of truth for the current session and the saved history.
import { saveJSON, loadJSON } from '../services/storage.js';

const HISTORY_KEY = 'sessionsHistoricData';

let currentSession = createEmptySession();
let sessionHistory = [];

function createEmptySession(){
    return {
        date: { created: null, modified: null, registered: null },
        user: { name: 'Guest' },
        exerciseList: [],
    };
}

function loadHistory(){
    sessionHistory = loadJSON(HISTORY_KEY) || [];
}

function getHistory(){
    return sessionHistory;
}

function getCurrentSession(){
    return currentSession;
}

function setUserName(name){
    currentSession.user.name = name;
}

function addExercise(name){
    currentSession.exerciseList.push({ id: name, name });
    currentSession.date.created = new Date();
}

function setRepetitions(exerciseId, repetitions){
    const exercise = currentSession.exerciseList.find(item => item.id == exerciseId);
    if (!exercise) return;
    exercise.repetitions = repetitions;
    currentSession.date.modified = new Date();
}

function saveCurrentSession(){
    currentSession.date.registered = new Date();
    sessionHistory.push(currentSession);
    saveJSON(HISTORY_KEY, sessionHistory);
}

export {
    loadHistory,
    getHistory,
    getCurrentSession,
    setUserName,
    addExercise,
    setRepetitions,
    saveCurrentSession,
};
