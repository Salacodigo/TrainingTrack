import  Exercises  from '../classes/class_exercises.js';
import TrainingSession from '../classes/class_trainingSession.js';

import {
    setInLocalStorage
} from '../storage/function_localStorage.js';

import {
    paintExerciseList,
    cleanExerciseFormUI,
    showRepsTracking
} from "../actions/UI/UIActions.js"



// Exercises instance
let exerciseList = new Exercises();


// Form
const exerciseForm = document.getElementById('exercise-register');
const exerciseSubmitButton = document.getElementById('exercise-submit-btn');
const startTrainningBtn = document.getElementById('startTrainning-btn');

// get Form Values
const inputExerciseName = document.getElementById('exercise-name');


// AddEventListeners

exerciseEventListeners();
function exerciseEventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        exerciseForm.addEventListener('submit', submitExerciseForm);
        exerciseSubmitButton.addEventListener('click', submitExerciseForm);
        startTrainningBtn.addEventListener('click', submitExerciseList)
        
        writeDefaultValuesInExerciseForm();
    })
}


// Functions
function writeDefaultValuesInExerciseForm(){
    inputExerciseName.value = "Sentadilla";
}

function submitExerciseForm(e){
    e.preventDefault();
    try {
        getExerciseFormValues();
        setInLocalStorage("ejercicio", exerciseList.getList());
        paintExerciseList(exerciseList.getList());
        exerciseForm.reset();
        isEnabledStartTrainningBtn();


    } catch (error) {
        console.log(error);
    }
}

function getExerciseFormValues(){
    if( !inputExerciseName.value ){
        throw new Error("Debe ingresar un nombre de ejercicio");
    }
    let exerciseNameValue = inputExerciseName.value;
    exerciseList.set( exerciseNameValue );
}

function isEnabledStartTrainningBtn(){
    const exerciseList = document.getElementById('exercise-list');
    
    (exerciseList.firstChild) 
        ? startTrainningBtn.disabled = false
        : startTrainningBtn.disabled = true
}

function submitExerciseList(){
    cleanExerciseFormUI();
    showRepsTracking();
}


export { 
    exerciseEventListeners 
}
