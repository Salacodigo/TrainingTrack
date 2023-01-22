import {
    sessionInfo
} from '../index.js';

import {
    cleanUserFormUI,
    showExercisesFormRegisterUI
} from "../actions/UI/UIActions.js"



// Form
const form = document.getElementById('user-register');
const submitButtonUserForm = document.getElementById('user-submit-btn');


// get Form Values
const inputUserName = document.getElementById('user-name');


// AddEventListeners
// userEventListeners();
function userEventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        form.addEventListener('submit', submitUserForm);
        submitButtonUserForm.addEventListener('click', submitUserForm);
        
        writeDefaultValuesInForm();
    })
}


// Functions
function writeDefaultValuesInForm(){
    inputUserName.value = "Santiago";
}

function submitUserForm(e){
    e.preventDefault();
    try {
        getUserFormValues();    
        cleanUserFormUI();
        showExercisesFormRegisterUI();

    } catch (error) {
        console.log(error);
    }
}

function getUserFormValues(){
    if( !inputUserName.value ){
        throw new Error("Debe ingresar el nombre");
    }
    if( inputUserName.value ){
        let userNameValue = inputUserName.value;
        sessionInfo.user.name = userNameValue;
    }
}



export { 
    userEventListeners 
}