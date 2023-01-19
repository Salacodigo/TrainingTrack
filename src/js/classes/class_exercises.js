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
        id = Number(id)
        const newExercisesList = this.getList();
        
        for(let listPosition = 0; listPosition < newExercisesList.length; listPosition++){

            if( newExercisesList[listPosition].id === id ){
                newExercisesList[listPosition].reps = number;
            }
            this.updateList(newExercisesList);
        } 
    }

}