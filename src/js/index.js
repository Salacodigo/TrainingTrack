// Trainning classes
import  Exercises  from "./classes/class_exercises.js";
import  Dates  from "./classes/class_date.js";
import  TrainingSession  from "./classes/class_trainingSession.js";


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

console.log("Iniciando...");
userEventListeners();
exerciseEventListeners();
trackingEventListeners();
console.log("Ejecutandose");


