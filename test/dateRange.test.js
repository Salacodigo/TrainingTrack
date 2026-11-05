import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    createDateRange,
    isInDateRange,
    filterUserSessionsInRange,
} from '../src/js/domain/dateRange.js';

const session = (name, registered) => ({ user: { name }, date: { registered }, exerciseList: [] });

test('createDateRange without values has no limits', () => {
    assert.deepEqual(createDateRange('', ''), { from: null, to: null });
});

test('createDateRange covers the full start and end days', () => {
    const range = createDateRange('2026-11-01', '2026-11-03');
    assert.equal(range.from.getHours(), 0);
    assert.equal(range.to.getHours(), 23);
    assert.equal(range.to.getMinutes(), 59);
});

test('isInDateRange accepts any date when the range is empty', () => {
    assert.equal(isInDateRange('2020-01-01T10:00:00', createDateRange(null, null)), true);
});

test('isInDateRange includes the boundary days', () => {
    const range = createDateRange('2026-11-01', '2026-11-03');
    assert.equal(isInDateRange(new Date(2026, 10, 1, 0, 0, 0), range), true);
    assert.equal(isInDateRange(new Date(2026, 10, 3, 23, 59, 0), range), true);
});

test('isInDateRange rejects dates outside the range', () => {
    const range = createDateRange('2026-11-01', '2026-11-03');
    assert.equal(isInDateRange(new Date(2026, 9, 31, 23, 59), range), false);
    assert.equal(isInDateRange(new Date(2026, 10, 4, 0, 0), range), false);
});

test('isInDateRange works with only one limit', () => {
    assert.equal(isInDateRange(new Date(2030, 0, 1), createDateRange('2026-11-01', '')), true);
    assert.equal(isInDateRange(new Date(2030, 0, 1), createDateRange('', '2026-11-01')), false);
});

test('isInDateRange accepts ISO strings as stored in localStorage', () => {
    const stored = JSON.parse(JSON.stringify(new Date(2026, 10, 2, 12)));
    assert.equal(isInDateRange(stored, createDateRange('2026-11-02', '2026-11-02')), true);
});

test('filterUserSessionsInRange keeps only the user sessions inside the range', () => {
    const sessions = [
        session('Santiago', new Date(2026, 10, 1, 9)),
        session('Santiago', new Date(2026, 10, 5, 9)),
        session('Ana', new Date(2026, 10, 1, 9)),
    ];
    const result = filterUserSessionsInRange(sessions, 'Santiago', createDateRange('2026-11-01', '2026-11-02'));
    assert.deepEqual(result, [sessions[0]]);
});

test('filterUserSessionsInRange returns an empty list when nothing matches', () => {
    const sessions = [session('Ana', new Date(2026, 10, 1))];
    assert.deepEqual(filterUserSessionsInRange(sessions, 'Santiago', createDateRange(null, null)), []);
});
