/*
 fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
   .then(function (response) {
      return response.text();
   })
   .then(function (text) {
	let series = csvToSeries(text);
	// renderChart(series);
   })
   .catch(function (error) {
      //Something went wrong
      console.log(error);
   });

function csvToSeries(text) {
    console.log(text);
    console.log({text});
    const lifeExp = 'average_life_expectancy';
	let dataAsJson = JSC.csv2Json(text);
    console.log({dataAsJson});
	let male = [], female = [];
	dataAsJson.forEach(function (row) {
		 //add either to male, female, or discard.
		if (row.race === 'All Races') {
			if (row.sex === 'Male') {
				male.push({x: row.year, y: row[lifeExp]});
			} else if (row.sex === 'Female') {
				female.push({x: row.year, y: row[lifeExp]});
			}
		}
	});
    console.log([male, female]);

    return [
        {name: 'Male', points: male},
        {name: 'Female', points: female}
    ];
}
*/

let historicData = [
    {
        name: 'Sentadillas',
        points : [
            {x:'January 2023', y: 20},
            
        ]
    }
]

import { sessionInfo } from '../index.js';


let sessionData = [];

function prepareData(index = 0){
    sessionData = [
        {
            name: sessionInfo.exerciseList[index].name,
            points: [
                {
                    x: JSC.formatDate(sessionInfo.date.registered, 'Y'),
                    y: sessionInfo.exerciseList[index].repetitions
                },                
            ]
        }
    ]
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