import { byId, showElement, clearElement } from '../utils/dom.js';
import { getHistory, getCurrentSession } from '../state/sessionStore.js';
import { createDateRange, filterUserSessionsInRange } from '../domain/dateRange.js';
import { listExerciseNames, buildExerciseSeries } from '../domain/exerciseSeries.js';
import { createSelectField } from '../components/SelectField.js';
import { createDateRangeFilter } from '../components/DateRangeFilter.js';
import { renderSessionHistory } from '../components/SessionHistory.js';
import { renderExerciseChart } from '../components/ExerciseChart.js';

const CHART_ID = 'chartDiv2';

// Chart + history for the current user; both follow the selected exercise and date range.
function initResultsView(){
    const filters = { exercise: '', range: createDateRange(null, null) };

    const render = () => {
        const userName = getCurrentSession().user.name;
        const history = getHistory();
        renderExerciseChart(CHART_ID, buildExerciseSeries(history, userName, filters.exercise, filters.range));
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
            showElement(byId('appName'));
            showElement(byId('results-dashboard-container'));
            byId(CHART_ID).style.visibility = 'visible';
            mountFilters();
            render();
        },
    };
}

export { initResultsView };
