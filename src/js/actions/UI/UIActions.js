// User Form Elements

const userFormContainer = document.getElementById('user-register-container');
const userNameGreeting = document.getElementById('user-name-greeting');

// Exercise Form Elements
const exerciseFormContainer = document.getElementById('exercises-list-register-container');

// Reps Form Elements
const routineFormContainer = document.getElementById('routine-tracking-container');






//
// Functions
//
function cleanContainer( container ){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
};



function cleanUserFormUI( name ){
    userFormContainer.classList.remove('showing');
    userFormContainer.classList.add('hidden');

    userNameGreeting.classList.remove('hidden');
    userNameGreeting.classList.add('showing');

    printUserName( name );
}

function printUserName( name ){
    userNameGreeting.innerHTML = `¡Hola, ${name}! `;
}

function showExercisesFormRegisterUI( ){
    exerciseFormContainer.classList.remove('hidden');
    exerciseFormContainer.classList.add('showing');

}

function paintExerciseList( object ){
    console.log("Entra a paintExerciseList");
    const exerciseListUl = document.getElementById('exercise-list');

    cleanContainer(exerciseListUl);

    for(let key in object){
        const liExercise = document.createElement('li');
        liExercise.innerHTML = `
            <li>${object[key].name}</li>
        `;
        exerciseListUl.appendChild(liExercise);
    }
}

function cleanExerciseFormUI(){
    exerciseFormContainer.classList.remove('showing');
    exerciseFormContainer.classList.add('hidden');
    
    userNameGreeting.classList.remove('showing');
    userNameGreeting.classList.add('hidden');
}

function showRepsTracking(){
    routineFormContainer.classList.remove('hidden');
    routineFormContainer.classList.add('showing');

}


export {
    cleanUserFormUI,
    showExercisesFormRegisterUI,
    paintExerciseList,
    cleanExerciseFormUI,
    showRepsTracking
}