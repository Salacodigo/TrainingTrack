import { 
    sessionInfo,
    overallSessionsInfo
} from '../../index.js';
import {
    prepareData,
    exercisesRegistered
} from '../../charts/historicData.js';



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


function cleanUserFormUI( ){
    appNameContainer.classList.remove('showing');
    appNameContainer.classList.add('hidden');

    userFormContainer.classList.remove('showing');
    userFormContainer.classList.add('hidden');

    userNameGreeting.classList.remove('hidden');
    userNameGreeting.classList.add('showing');

    printUserName( );
}

function printUserName( ){
    let userName = sessionInfo.user.name;
    userNameGreeting.innerHTML = `<span>¡Hola, ${userName}! 
    </span>`;
}

function showExercisesFormRegisterUI( ){
    exerciseFormContainer.classList.remove('hidden');
    exerciseFormContainer.classList.add('showing');
}

function paintExerciseList( ){
    const exerciseListUl = document.getElementById('exercise-list');
    cleanContainer(exerciseListUl);

    const list = sessionInfo.exerciseList;
    for(let position in list){
        let exerciseName = list[position].name;
        const liExercise = document.createElement('li');
        liExercise.setAttribute("class",'exercise-item');
        liExercise.innerHTML = `
            <li>${exerciseName}</li>
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

function showRepsTracking( ){

    routineFormContainer.classList.remove('hidden');
    routineFormContainer.classList.add('showing');

    paintRoutineExercises( );
}

function paintRoutineExercises(){

    const formRoutineTracking = document.getElementById('routine-tracking');

    const exerciseList = sessionInfo.exerciseList;
    for(let position in exerciseList){
        let exerciseName = exerciseList[position].name

        const rowlabelExercise = document.createElement('label');
        rowlabelExercise.setAttribute("for",`${exerciseName}`);
        
        const spanName = document.createElement('span');
        spanName.classList.add('span-style');
        spanName.innerHTML = `${exerciseName}`;
        
        /*
        const inputSeries = document.createElement('input');
        inputSeries.defaultValue=0;
        inputSeries.classList.add('input-field');
        const elementAttributesSeries = {
            type        : "number",
            name        : `${exerciseName}+series`, 
            id          : `${exerciseName}+series`,
            placeholder : 0,
            required    : true,
        }
        setMultipleAttributesonElement(inputSeries, elementAttributesSeries);
        */


        const inputReps = document.createElement('input');
        inputReps.defaultValue=0;
        inputReps.classList.add('input-field');
        const elementAttributesReps = {
            type        : "number",
            name        : `${exerciseName}`, 
            id          : `${exerciseName}`,
            placeholder : 0,
            required    : true,
        }
        setMultipleAttributesonElement(inputReps, elementAttributesReps);

        rowlabelExercise.appendChild(spanName);
        // rowlabelExercise.appendChild(inputSeries);
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

function printExercisesPracticedButtons (){
    const buttonExercise = document.getElementById('results-dashboard-button');

    // const labelExercise = document.createElement('label');
    // labelExercise.setAttribute("for",'exercise-result-select');

    const exerciseSelect = document.createElement('select');
    const exerciseSelectAttributes = {
        id          : 'exercise-result-select',
        name        : 'exercise-result-select', 
    }
    setMultipleAttributesonElement(exerciseSelect, exerciseSelectAttributes);
    exerciseSelect.addEventListener('change', filterChartByTypeOfExercise);

    exercisesRegistered.forEach(
        exercise => {
            let option = document.createElement('option');
            option.innerHTML=`${exercise}`;
            option.classList.add("filterBtn");
            option.setAttribute("value",`${exercise}`);
            exerciseSelect.appendChild(option)
        }
        )
        buttonExercise.appendChild(exerciseSelect)
    }

function filterChartByTypeOfExercise(){
    const exerciseSelectList = document.getElementById('exercise-result-select');
    let exerciseSelected = exerciseSelectList.value;
    prepareData(exerciseSelected);

}


function printHistoricResults( ){

    const overallResultsContainer = document.getElementById('routine-historic-results');
    const selectExerciseContainer = document.getElementById('select-exercise-container');
    let dateInfoContainer = null;
    let exercisesContainer = null;

    for(let pos in overallSessionsInfo){

        let session = overallSessionsInfo[pos];

        if(session.user.name == sessionInfo.user.name){
    
            dateInfoContainer = document.createElement('p');
            dateInfoContainer.setAttribute("class", "routine-date");
            
            let date = new Date(session.date.registered);
            dateInfoContainer.innerHTML = date.toDateString();
            
            exercisesContainer = document.createElement('div');
            exercisesContainer.setAttribute("class", "exercise-container");
                
            let sessionExercisesList = session.exerciseList;
    
            for(let pos=0; pos < sessionExercisesList.length; pos++){
                const sessionExercisesText = document.createElement('p');
                sessionExercisesText.setAttribute("class", "exercise-count");
                
                sessionExercisesText.innerHTML += `
                ${sessionExercisesList[pos].name} : ${sessionExercisesList[pos].repetitions}
                `;
                
                exercisesContainer.appendChild(sessionExercisesText);
            }
        }
        overallResultsContainer.appendChild(dateInfoContainer);
        overallResultsContainer.appendChild(exercisesContainer);
    }
    
}


export {
    cleanUserFormUI,
    showExercisesFormRegisterUI,
    paintExerciseList,
    cleanExerciseFormUI,
    showRepsTracking,
    clearRepsTracking,
    printExercisesPracticedButtons,
    printHistoricResults
}