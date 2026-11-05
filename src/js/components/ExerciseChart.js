// Column chart of reps per session. JSC is the global loaded from the JSCharting CDN script.
function renderExerciseChart(containerId, series){
    JSC.Chart(containerId, {
        type: 'column',
        title_label_text: `Repeticiones de ${series.name} por sesión`,
        annotations: [{ label_text: 'Source: Training App Registry', position: 'bottom right' }],
        legend_visible: false,
        xAxis: { crosshair: { enabled: true } },
        defaultPoint_tooltip: '%seriesName <b>%yValue</b> reps',
        series: [series],
    });
}

export { renderExerciseChart };
