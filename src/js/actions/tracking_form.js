import  Exercises  from '../classes/class_exercises.js';
import  Dates  from '../classes/class_date.js';
import  TrainingSession from '../classes/class_trainingSession.js';
import  ExercTrainingSessionises  from '../classes/class_trainingSession.js';

import {
    setInLocalStorage,
} from '../storage/function_localStorage.js';
import {
    exerciseListInstance
} from "./exercise_form.js"
import {
    clearRepsTracking,
    printHistoricResults
} from "../actions/UI/UIActions.js"


// Form
const trackingForm = document.getElementById('routine-tracking-container');
const trackingSubmitButton = document.getElementById('reps-tracking-btn');
const saveTrackingBtn = document.getElementById('save-tracking-btn');


// Instances
let dateInstance = new Dates();
let trainningInstance = new TrainingSession();


// AddEventListeners

// trackingEventListeners();
function trackingEventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        trackingForm.addEventListener('submit', submitTrackingForm);
        trackingSubmitButton.addEventListener('click', submitTrackingForm);
        saveTrackingBtn.addEventListener('click', saveTracking)
        
    })
}


// Functions

function submitTrackingForm(e){
    e.preventDefault();
    saveRepsCount();
}

function saveRepsCount(){
    try {
        getTrackingFormValues();
        setInLocalStorage("reps", exerciseListInstance.getList());
        isEnabledSaveTrackingBtn();
        console.log("Se ha segistrado el numero de repeticiones")
    } catch (error) {
        console.log(error);
    }
}

function getTrackingFormValues(){
    const formTagElement = document.getElementById("routine-tracking")

    if( !formTagElement.children ){
        throw new Error("Debe ingresar un numero de repeticiones");
    }

    const numberOfExercises = formTagElement.childElementCount;

    for(let element= 0; element < numberOfExercises; element++){

        const repsPerExercise = {
            id      : formTagElement.children[element].children[1].getAttribute('id'),
            name    : formTagElement.children[element].children[1].getAttribute('name'),
            value   : formTagElement.children[element].children[1].value

        }
        
        exerciseListInstance.assignReps(repsPerExercise['id'], repsPerExercise['value'])
        
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
    trainningInstance.set(dateInstance.getTodayDate(), exerciseListInstance.getList());

    clearRepsTracking();
    printHistoricResults(trainningInstance.get('sessionId1'));
}


export { 
    trackingEventListeners
}
