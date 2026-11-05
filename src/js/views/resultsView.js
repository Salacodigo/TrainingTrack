import { byId, showElement, clearElement } from '../utils/dom.js';
import { getHistory, getCurrentSession } from '../state/sessionStore.js';
import { createDateRange, filterUserSessionsInRange } from '../domain/dateRange.js';
import { listExerciseNames, buildExerciseSeries, summarizeSeries } from '../domain/exerciseSeries.js';
import { createSelectField } from '../components/SelectField.js';
import { createDateRangeFilter } from '../components/DateRangeFilter.js';
import { renderSessionHistory } from '../components/SessionHistory.js';
import { renderExerciseChart } from '../components/ExerciseChart.js';
import { renderStatCards } from '../components/StatCards.js';

const CHART_ID = 'chartDiv2';

function toStats(summary){
    const sign = summary.progress > 0 ? '+' : '';
    return [
        { label: 'Sesiones', value: summary.sessions },
        { label: 'Reps totales', value: summary.total },
        { label: 'Mejor sesión', value: summary.best },
        { label: 'Progreso', value: `${sign}${summary.progress}` },
    ];
}

// Chart + history for the current user; both follow the selected exercise and date range.
function initResultsView(){
    const filters = { exercise: '', range: createDateRange(null, null) };

    const render = () => {
        const userName = getCurrentSession().user.name;
        const history = getHistory();
        const series = buildExerciseSeries(history, userName, filters.exercise, filters.range);
        renderStatCards(byId('results-stats'), toStats(summarizeSeries(series)));
        renderExerciseChart(CHART_ID, series);
        renderSessionHistory(byId('routine-historic-results'),
            filterUserSessionsInRange(history, userName, filters.range));
    };

    const mountFilters = () => {
        const userName = getCurrentSession().user.name;
        filters.exercise = getCurrentSession().exerciseList[0].name.toLowerCase();
        const select = createSelectField({
            id: 'exercise-result-select',
            options: listExerciseNames(getHistory(), userName),
            value: filters.exercise,
            onChange: exercise => { filters.exercise = exercise; render(); },
        });
        const dateFilter = createDateRangeFilter({
            onChange: (from, to) => { filters.range = createDateRange(from, to); render(); },
        });
        byId('exercise-select-mount').replaceChildren(select);
        byId('results-date-filter').replaceChildren(dateFilter);
    };

    return {
        show: () => {
            showElement(byId('results-dashboard-container'));
            byId(CHART_ID).style.visibility = 'visible';
            mountFilters();
            render();
        },
    };
}

export { initResultsView };
