export default class Exercises {
    constructor(){
        this.exerciseList = [];
        this.exerciseId = 1;
    }

    set( exerciseName ){
        const newExercise = {};

        newExercise.id = this.exerciseId;
        newExercise.name = exerciseName;
        newExercise.reps = 0;
        this.exerciseId++;

        this.exerciseList.push(newExercise);
    }

    getList(){
        return this.exerciseList;
    }

    updateList( newList ){
        this.exerciseList = newList;
    }

    assignReps( id, number ){
        const exercisesList = this.getList();
        
        for(let listPosition = 0; listPosition < exercisesList.length; listPosition++){

            if( exercisesList[listPosition].id === id ){
                exercisesList[listPosition].reps = number;
            }
        } 
        this.updateList(exercisesList);
    }

}