// Pure helpers (no DOM, no globals) so they can be unit tested with Node.

// Inputs of type date give 'YYYY-MM-DD'; the range covers both full days in local time.
function createDateRange(pFrom, pTo){
    return {
        from: pFrom ? new Date(`${pFrom}T00:00:00`) : null,
        to: pTo ? new Date(`${pTo}T23:59:59.999`) : null,
    };
}

function isInDateRange(pDate, pRange){
    const date = new Date(pDate);
    if (pRange.from && date < pRange.from) return false;
    if (pRange.to && date > pRange.to) return false;
    return true;
}

function filterUserSessionsInRange(pSessions, pUserName, pRange){
    return pSessions.filter(session =>
        session.user.name == pUserName && isInDateRange(session.date.registered, pRange)
    );
}

export {
    createDateRange,
    isInDateRange,
    filterUserSessionsInRange,
}
