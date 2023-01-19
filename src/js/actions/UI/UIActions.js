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

function showRepsTracking( exercisesIntance ){

    routineFormContainer.classList.remove('hidden');
    routineFormContainer.classList.add('showing');

    paintRoutineExercises( exercisesIntance );

}

function paintRoutineExercises(exercisesIntance){

    const formRoutineTracking = document.getElementById('routine-tracking');
    const exercisesList = exercisesIntance.getList();

    for(let key in exercisesList){
        const rowlabelExercise = document.createElement('label');
        rowlabelExercise.setAttribute("for",`${exercisesList[key].id}`);
        
        const spanName = document.createElement('span');
        spanName.classList.add('span-style');
        spanName.innerHTML = `${exercisesList[key].name}`;
        

        const inputReps = document.createElement('input');
        inputReps.classList.add('input-field');
        const elementAttributes = {
            type        : "number",
            name        : `${exercisesList[key].name}`, 
            id          : `${exercisesList[key].id}`,
            placeholder : 0,
            required    : true,
        }
        setMultipleAttributesonElement(inputReps, elementAttributes);

        rowlabelExercise.appendChild(spanName);
        rowlabelExercise.appendChild(inputReps);
        formRoutineTracking.appendChild(rowlabelExercise);
    }

}

function setMultipleAttributesonElement(elem, elemAttributes) {
    for(let key in elemAttributes) {
    elem.setAttribute(key, elemAttributes[key]);
    }
}



export {
    cleanUserFormUI,
    showExercisesFormRegisterUI,
    paintExerciseList,
    cleanExerciseFormUI,
    showRepsTracking
}