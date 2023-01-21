/*
 fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
   .then(function (response) {
      return response.text();
   })
   .then(function (text) {
	let series = csvToSeries(text);
	renderChart(series);
   })
   .catch(function (error) {
      //Something went wrong
      console.log(error);
   });

function csvToSeries(text) {
    const lifeExp = 'average_life_expectancy';
	let dataAsJson = JSC.csv2Json(text);
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
            {x:'1', y: 30},
            {x:'2', y: 35},
            {x:'3', y: 25},
            {x:'4', y: 55},
        ]
    }
]


function renderChart(series){
    JSC.Chart('chartDiv2', {
		title_label_text: 'Number of squats made per train session',
		annotations: [{
			label_text: 'Source: Training App registry',
			position: 'bottom left',
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

renderChart(historicData);


