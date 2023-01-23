import { 
    sessionInfo,
    overallSessionsInfo
 } from '../index.js';


function prepareData(index = 0){
    let exerciseName = sessionInfo.exerciseList[index].name;

    let sessionData = [
        {
            name: exerciseName,
            points: [],
        }
    ]

    for(let pos in overallSessionsInfo){
        let session = overallSessionsInfo[pos];
        if(session.user.name == sessionInfo.user.name){
            sessionData[0].points.push(
                {
                    x: JSC.formatDate(session.date.registered, 'ymd hh:mm'),
                    y: session.exerciseList[index].repetitions
                }
            )
        }
    }

    renderChart(sessionData);
}


function renderChart(series){
    let exerciseName = series[0].name;

    JSC.Chart('chartDiv2', {
        type: 'column',
		title_label_text: `Numero de ${exerciseName} por sesión`,
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
    prepareData
}