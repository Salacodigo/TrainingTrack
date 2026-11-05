// Entry point: wires the screens together. Views never import each other; they talk through callbacks.
import { byId, hideElement } from './utils/dom.js';
import { loadHistory } from './state/sessionStore.js';
import { setActiveStep } from './components/StepIndicator.js';
import { initUserView } from './views/userView.js';
import { initExerciseView } from './views/exerciseView.js';
import { initTrackingView } from './views/trackingView.js';
import { initResultsView } from './views/resultsView.js';

function startApp(){
    loadHistory();
    const results = initResultsView();
    const tracking = initTrackingView({
        onFinish: () => { setActiveStep(4); results.show(); },
    });
    const exercises = initExerciseView({
        onStart: () => {
            hideElement(byId('user-name-greeting'));
            setActiveStep(3);
            tracking.show();
        },
    });
    initUserView({ onContinue: () => { setActiveStep(2); exercises.show(); } });
}

document.addEventListener('DOMContentLoaded', startApp);
