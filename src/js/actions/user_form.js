import  User  from '../classes/class_user.js'

import {
    setInLocalStorage
} from '../storage/function_localStorage.js'

import {
    cleanUserFormUI,
    showExercisesFormRegisterUI
} from "../actions/UI/UIActions.js"


// User instance
let userInstance = new User();


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
        setInLocalStorage("objetoClase", userInstance.getInformation());

        cleanUserFormUI( userInstance.getName() );
        showExercisesFormRegisterUI();

    } catch (error) {
        console.log(error);
    }
}

function getUserFormValues(){
    if( inputUserName.value ){
        let userNameValue = inputUserName.value;

        userInstance.setName( userNameValue );
    }
}



export { 
    userEventListeners 
}
