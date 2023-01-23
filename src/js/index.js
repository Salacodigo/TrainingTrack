// Action Classes
import {
    userEventListeners
} from "../js/actions/user_form.js";
import {
    exerciseEventListeners
} from "../js/actions/exercise_form.js";
import {
    trackingEventListeners
} from "../js/actions/tracking_form.js"
import {
    getFromLocalStorage
} from './storage/function_localStorage.js'



let sessionInfo = {
    date : {
        created: null,
        modified: null,
        registered: null,
    },
    user : {
        name: "Guest",
    },
    exerciseList : [
        /*
        {
            id : "Exercise-not-set",
            name: "Exercise-not-set",
            repetitions: 0,
        },
        */
    ]
}

let overallSessionsInfo = [];

function AppEventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        loadHistoricData();
    })
}


// Functions
console.log("Iniciando...");
AppEventListeners();
userEventListeners();
exerciseEventListeners();
trackingEventListeners();
console.log("Ejecutandose...");


function loadHistoricData(){
    try {
        let overallSessionsLocalStorage = getFromLocalStorage('sessionsHistoricData');
        if(!overallSessionsLocalStorage){
            return;
        }
        overallSessionsInfo = overallSessionsLocalStorage;
        console.log({overallSessionsInfo});
        
    } catch (error) {
        console.log(error);
    }
}


export {
    sessionInfo,
    overallSessionsInfo
}