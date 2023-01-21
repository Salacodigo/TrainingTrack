// App Name and title container
const appNameContainer = document.getElementById('appName')

// User Form Elements
const userFormContainer = document.getElementById('user-register-container');
const userNameGreeting = document.getElementById('user-name-greeting');

// Exercise Form Elements
const exerciseFormContainer = document.getElementById('exercises-list-register-container');

// Reps Form Elements
const routineFormContainer = document.getElementById('routine-tracking-container');

// Dashboard Results Elements
const resultsDashboardContainer = document.getElementById('results-dashboard-container');






//
// Functions
//
function cleanContainer( container ){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
};


function cleanUserFormUI( name ){
    appNameContainer.classList.remove('showing');
    appNameContainer.classList.add('hidden');

    userFormContainer.classList.remove('showing');
    userFormContainer.classList.add('hidden');

    userNameGreeting.classList.remove('hidden');
    userNameGreeting.classList.add('showing');

    printUserName( name );
}

function printUserName( name ){
    userNameGreeting.innerHTML = `<span>¡Hola, ${name}! 
    </span>`;
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
        liExercise.setAttribute("class",'exercise-item');
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
        inputReps.defaultValue=0;
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

function clearRepsTracking(){
    routineFormContainer.classList.remove('showing');
    routineFormContainer.classList.add('hidden');
    
    appNameContainer.classList.remove('hidden');
    appNameContainer.classList.add('showing');

    resultsDashboardContainer.classList.remove('hidden');
    resultsDashboardContainer.classList.add('showing');
    
    const graphDiv2 = document.getElementById('chartDiv2');
    graphDiv2.setAttribute("style", "visibility:visible")

}

function printHistoricResults( historicData ){
    
    const historicResultsContainer = document.getElementById('routine-historic-results');
    
    const dateText = document.createElement('p');
    dateText.setAttribute("class", "routine-date");
    let info = historicData['sessionDate'];
    info = new Date(info).toDateString()
    dateText.innerHTML = info;

    const sessionExercises = historicData['sessionExercises'];

    const exercisesContainer = document.createElement('div');
    exercisesContainer.setAttribute("class", "exercise-container");

    for(let pos=0; pos < sessionExercises.length; pos++){
        const sessionExercisesText = document.createElement('p');
        sessionExercisesText.setAttribute("class", "exercise-count");

        sessionExercisesText.innerHTML += `
            ${sessionExercises[pos].name} : ${sessionExercises[pos].reps}
        `;
        
        exercisesContainer.appendChild(sessionExercisesText);
    }
    
    historicResultsContainer.appendChild(dateText);
    historicResultsContainer.appendChild(exercisesContainer);

}


export {
    cleanUserFormUI,
    showExercisesFormRegisterUI,
    paintExerciseList,
    cleanExerciseFormUI,
    showRepsTracking,
    clearRepsTracking,
    printHistoricResults
}