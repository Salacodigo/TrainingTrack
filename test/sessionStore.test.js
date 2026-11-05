import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Minimal in-memory localStorage so the store runs in Node.
const memory = new Map();
globalThis.localStorage = {
    getItem: key => (memory.has(key) ? memory.get(key) : null),
    setItem: (key, value) => memory.set(key, String(value)),
};

const store = await import('../src/js/state/sessionStore.js');

beforeEach(() => memory.clear());

test('loadHistory starts empty when nothing is stored', () => {
    store.loadHistory();
    assert.deepEqual(store.getHistory(), []);
});

test('loadHistory ignores corrupted data', () => {
    memory.set('sessionsHistoricData', '{not json');
    const originalError = console.error;
    console.error = () => {};
    store.loadHistory();
    console.error = originalError;
    assert.deepEqual(store.getHistory(), []);
});

test('the current session collects user, exercises and reps', () => {
    store.setUserName('Santiago');
    store.addExercise('Sentadillas');
    store.setRepetitions('Sentadillas', 25);
    store.setRepetitions('No existe', 99);

    const session = store.getCurrentSession();
    assert.equal(session.user.name, 'Santiago');
    assert.deepEqual(session.exerciseList, [{ id: 'Sentadillas', name: 'Sentadillas', repetitions: 25 }]);
    assert.ok(session.date.created instanceof Date);
});

test('saveCurrentSession appends to history and persists it', () => {
    store.loadHistory();
    store.saveCurrentSession();

    const saved = JSON.parse(memory.get('sessionsHistoricData'));
    assert.equal(store.getHistory().length, 1);
    assert.equal(saved.length, 1);
    assert.ok(saved[0].date.registered);
});
