import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDateRange } from '../src/js/domain/dateRange.js';
import {
    formatSessionLabel,
    listExerciseNames,
    buildExerciseSeries,
} from '../src/js/domain/exerciseSeries.js';

const exercise = (name, repetitions) => ({ id: name, name, repetitions });
const session = (user, registered, exerciseList) => ({ user: { name: user }, date: { registered }, exerciseList });

const history = [
    session('Santiago', new Date(2026, 10, 1, 8, 5, 9), [exercise('Sentadillas', 20), exercise('Flexiones', 10)]),
    session('Santiago', new Date(2026, 10, 4, 9, 0, 0), [exercise('sentadillas', 30)]),
    session('Ana', new Date(2026, 10, 2, 7, 0, 0), [exercise('Burpees', 5)]),
];

test('formatSessionLabel pads every part of the date', () => {
    assert.equal(formatSessionLabel(new Date(2026, 0, 2, 3, 4, 5)), '2026-01-02 03:04:05');
});

test('listExerciseNames returns unique lowercase names for the user only', () => {
    assert.deepEqual(listExerciseNames(history, 'Santiago'), ['sentadillas', 'flexiones']);
});

test('listExerciseNames is empty for a user without sessions', () => {
    assert.deepEqual(listExerciseNames(history, 'Nadie'), []);
});

test('buildExerciseSeries matches the exercise ignoring case', () => {
    const series = buildExerciseSeries(history, 'Santiago', 'SENTADILLAS', createDateRange(null, null));
    assert.equal(series.name, 'sentadillas');
    assert.deepEqual(series.points, [
        { x: '2026-11-01 08:05:09', y: 20 },
        { x: '2026-11-04 09:00:00', y: 30 },
    ]);
});

test('buildExerciseSeries leaves out sessions outside the date range', () => {
    const series = buildExerciseSeries(history, 'Santiago', 'sentadillas', createDateRange('2026-11-03', ''));
    assert.deepEqual(series.points, [{ x: '2026-11-04 09:00:00', y: 30 }]);
});

test('buildExerciseSeries ignores other users with the same exercise', () => {
    const series = buildExerciseSeries(history, 'Ana', 'sentadillas', createDateRange(null, null));
    assert.deepEqual(series.points, []);
});
