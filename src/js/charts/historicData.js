import { 
    sessionInfo,
    overallSessionsInfo
 } from '../index.js';

 let sessionDataPrinted = [];
 let exercisesRegistered = [];
function prepareData(pExerciseName){
    pExerciseName = pExerciseName.toLowerCase();

    sessionDataPrinted = [
        {
            name: pExerciseName,
            points: [],
        }
    ]

    overallSessionsInfo.forEach(
        registeredSession => {
            if(registeredSession.user.name == sessionInfo.user.name){
                registeredSession.exerciseList.forEach(
                    exercise => {
                        let exerciseName = exercise.id.toLowerCase();

                        if (!exercisesRegistered.includes(exerciseName)){
                            exercisesRegistered.push(exerciseName);
                        }
                        if( exerciseName == pExerciseName){

                            sessionDataPrinted[0].points.push(
                                {
                                    x: JSC.formatDate(registeredSession.date.registered, 'ymd hh:mm:ss'),
                                    y: exercise.repetitions
                                }
                            )
                            
                        }
                    }
                )
            }
        }
    )


    renderChart(sessionDataPrinted);
}


function renderChart(series){
    let exerciseName = series[0].name;

    JSC.Chart('chartDiv2', {
        type: 'column',
		title_label_text: `Repeticiones de ${exerciseName} por sesión`,
		annotations: [{
			label_text: 'Source: Training App Registry',
			position: 'bottom right',
		}],
        // legend_template: '%icon,%name',
        legend_visible: false,
        defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
        xAxis_crosshair_enabled: true,
        xAxis: {crosshair: {enabled: true}},
        defaultPoint_tooltip: '%seriesName <b>%yValue</b> reps',
		series: series
	});
}




export {
    exercisesRegistered,
    prepareData,
}