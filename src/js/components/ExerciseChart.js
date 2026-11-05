// Reps-per-session trend. JSC is the global loaded from the JSCharting CDN script.
// Colors mirror the tokens in styles/scss/base/_tokens.scss (the chart can't read CSS variables).
const THEME = {
    primary: '#F97316',
    text: '#CBD5E1',
    grid: '#374151',
    font: 'Barlow, sans-serif',
};

function axisTheme(){
    return {
        defaultTick: { label: { color: THEME.text, style: { fontFamily: THEME.font } }, gridLine: { color: THEME.grid } },
        line: { color: THEME.grid },
        alternateGridFill: 'none',
    };
}

function renderExerciseChart(containerId, series){
    JSC.Chart(containerId, {
        type: 'area spline',
        box: { fill: 'none' },
        chartArea: { fill: 'none' },
        title: { label: { text: `Repeticiones de ${series.name}`, style: { color: '#F8FAFC', fontFamily: THEME.font, fontSize: 16, fontWeight: 600 } } },
        legend: { visible: false },
        xAxis: axisTheme(),
        yAxis: { ...axisTheme(), label: { text: 'Reps', color: THEME.text } },
        defaultSeries: {
            color: THEME.primary,
            shape: { opacity: 0.25 },
            line: { width: 3 },
            defaultPoint: { marker: { type: 'circle', size: 10, outline: { color: '#1F2937', width: 2 } } },
        },
        defaultPoint: { tooltip: '<b>%yValue</b> reps<br>%xValue' },
        noDataLabel: { text: 'Sin datos en este rango', style: { color: THEME.text, fontSize: 16 } },
        series: [series],
    });
}

export { renderExerciseChart };
