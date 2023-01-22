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
            {x:'5', y: 30},
            {x:'6', y: 35},
            {x:'7', y: 25},
            {x:'8', y: 55},
            {x:'9', y: 30},
            {x:'10', y: 35},
            {x:'11', y: 25},
            {x:'12', y: 55},
            {x:'13', y: 30},
            {x:'14', y: 35},
            {x:'15', y: 25},
            {x:'16', y: 55},
            {x:'17', y: 30},
            {x:'18', y: 35},
            {x:'19', y: 25},
            {x:'20', y: 55},
            {x:'21', y: 30},
            {x:'22', y: 35},
            {x:'23', y: 25},
            {x:'24', y: 55},
        ]
    }
]


function renderChart(series){
    JSC.Chart('chartDiv2', {
        type: 'column',
		title_label_text: 'Number of squats per  session',
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

renderChart(historicData);


