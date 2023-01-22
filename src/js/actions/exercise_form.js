import { sessionInfo } from '../index.js';
import {
    paintExerciseList,
    cleanExerciseFormUI,
    showRepsTracking
} from "../actions/UI/UIActions.js"



// Form
const exerciseForm = document.getElementById('exercise-register');
const exerciseSubmitButton = document.getElementById('exercise-submit-btn');
const startTrainningBtn = document.getElementById('startTrainning-btn');

// get Form Values
const inputExerciseName = document.getElementById('exercise-name');


// AddEventListeners
// exerciseEventListeners();
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
    inputExerciseName.value = "Sentadillas";
}

function submitExerciseForm(e){
    e.preventDefault();
    try {
        getExerciseFormValues();
        paintExerciseList();
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
    let exerciseObject = {
        id: inputExerciseName.value,
        name: inputExerciseName.value,
    };
    sessionInfo.exerciseList.push(exerciseObject);
    sessionInfo.date.created = new Date();

}

function isEnabledStartTrainningBtn(){
    const isEnabled = sessionInfo.exerciseList.length > 0;
    (isEnabled) 
        ? startTrainningBtn.disabled = false
        : startTrainningBtn.disabled = true
}

function submitExerciseList(){
    cleanExerciseFormUI();
    showRepsTracking( );
}


export { 
    exerciseEventListeners
}
