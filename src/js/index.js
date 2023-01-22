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


// Functions
console.log("Iniciando...");
userEventListeners();
exerciseEventListeners();
trackingEventListeners();
console.log("Ejecutandose...");

export {
    sessionInfo
}