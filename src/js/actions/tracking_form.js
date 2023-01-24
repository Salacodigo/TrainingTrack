import { 
    sessionInfo,
    overallSessionsInfo
} from '../index.js';
import {
    clearRepsTracking,
    printExercisesPracticedButtons,
    printHistoricResults
} from "../actions/UI/UIActions.js"
import {
    prepareData
} from '../charts/historicData.js'
import {
    setInLocalStorage
} from '../storage/function_localStorage.js'


// Form
const trackingForm = document.getElementById('routine-tracking-container');
const trackingSubmitButton = document.getElementById('reps-tracking-btn');
const saveTrackingBtn = document.getElementById('save-tracking-btn');


// AddEventListeners
// trackingEventListeners();
function trackingEventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        trackingForm.addEventListener('submit', submitTrackingForm);
        trackingSubmitButton.addEventListener('click', submitTrackingForm);
        saveTrackingBtn.addEventListener('click', saveTracking)
    })
}

//
// Functions
//
function submitTrackingForm(e){
    e.preventDefault();
    saveRepsCount();
}

function saveRepsCount(){
    try {
        getTrackingFormValues();
        sessionInfo.date.modified = new Date();
        isEnabledSaveTrackingBtn();
        console.log("Se ha segistrado el numero de repeticiones")
    } catch (error) {
        console.log(error);
    }
}

function getTrackingFormValues(){    
    const trackingExerciseForm = document.getElementById("routine-tracking")

    if( !trackingExerciseForm.children ){
        throw new Error("Debe ingresar un numero de repeticiones");
    }

    let sessionExercises = sessionInfo.exerciseList;
    let exercisesTrackedQuantity = trackingExerciseForm.childElementCount;

    for(let pos= 0; pos < exercisesTrackedQuantity; pos++){
        
        let exerciseId = trackingExerciseForm.children[pos].children[1].getAttribute('id');

        let exerciseReps = Number(trackingExerciseForm.children[pos].children[1].value);

        for(let pos in sessionExercises){
            let sessionExerciseId = sessionExercises[pos].id;
            if(sessionExerciseId == exerciseId){
                sessionExercises[pos].repetitions = exerciseReps            
            }
        }
    }
}

function isEnabledSaveTrackingBtn(){
    const routineTracking = document.getElementById('routine-tracking');
    
    (!routineTracking.firstChild) 
        ? saveTrackingBtn.disabled = true
        : saveTrackingBtn.disabled = false
}

function saveTracking(){
    saveRepsCount();
    console.log("Guardar y ver resultados");

    saveDatainLocalStorage();
    
    clearRepsTracking();
    prepareData(sessionInfo.exerciseList[0].name);
    printExercisesPracticedButtons();
    printHistoricResults();
}


function saveDatainLocalStorage(){
    sessionInfo.date.registered = new Date();
    overallSessionsInfo.push(sessionInfo);
    setInLocalStorage('sessionsHistoricData',overallSessionsInfo)
}


export { 
    trackingEventListeners
}
