// Entry point: wires the screens together. Views never import each other; they talk through callbacks.
import { byId, hideElement } from './utils/dom.js';
import { loadHistory } from './state/sessionStore.js';
import { initUserView } from './views/userView.js';
import { initExerciseView } from './views/exerciseView.js';
import { initTrackingView } from './views/trackingView.js';
import { initResultsView } from './views/resultsView.js';

function startApp(){
    loadHistory();
    const results = initResultsView();
    const tracking = initTrackingView({ onFinish: results.show });
    const exercises = initExerciseView({
        onStart: () => {
            hideElement(byId('user-name-greeting'));
            tracking.show();
        },
    });
    initUserView({ onContinue: exercises.show });
}

document.addEventListener('DOMContentLoaded', startApp);
