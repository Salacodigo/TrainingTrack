import {
    setInLocalStorage,
    getFromLocalStorage
} from '../storage/function_localStorage.js';

export default class TrainingSession{
    constructor(){
        this.sessionId = 1;
        this.sessionExercises = [],
        this.sessionDate = new Date();
    }

    get(){
        const session = {
            id              :   this.sessionId,
            sessionDate     :   this.sessionDate,
            sessionExercises:   this.sessionExercises,
        }
        return session;
    }

    set( date, arrayExercises ){
        this.sessionDate = date;
        this.sessionExercises = arrayExercises;
        
        try {
            this.saveSession();
        } catch (error) {
            console.log(error);
        }

        return "Se ha registrado la sesión";
    }

    saveSession( ){
        const session = {
            id              :   this.sessionId,
            sessionDate     :   this.sessionDate,
            sessionExercises:   this.sessionExercises,
        }
        try {
            const keySession = `sessionId${this.sessionId}`
            setInLocalStorage( keySession, JSON.stringify(session))
            this.sessionId++;
        } catch (error) {
            console.log(error);
        }
        let rta = [
            "Se ha guardado la sesion correctamente",
            session
        ]
        console.log(rta)
    }

    readSession(id){
        let session = undefined;
        try {
            session = getFromLocalStorage(id);
        } catch (error) {
            console.log(error);
        }
        return session;
    }
}