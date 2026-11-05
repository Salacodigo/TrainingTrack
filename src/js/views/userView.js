import { byId, showElement, hideElement } from '../utils/dom.js';
import { setUserName } from '../state/sessionStore.js';

const DEFAULT_USER_NAME = 'Santiago';

// Asks for the user name, then greets them and hands over to the next screen.
function initUserView({ onContinue }){
    const container = byId('user-register-container');
    const form = byId('user-register');
    const input = byId('user-name');
    const greeting = byId('user-name-greeting');
    input.value = DEFAULT_USER_NAME;

    const submit = event => {
        event.preventDefault();
        const name = input.value.trim();
        if (!name) return;
        setUserName(name);
        greeting.textContent = `¡Hola, ${name}!`;
        hideElement(byId('appName'));
        hideElement(container);
        showElement(greeting);
        onContinue();
    };
    form.addEventListener('submit', submit);
    byId('user-submit-btn').addEventListener('click', submit);
}

export { initUserView };
