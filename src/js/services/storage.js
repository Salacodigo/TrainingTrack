// The only module that knows about localStorage; swap it here to move to a real database.

function saveJSON(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function loadJSON(key){
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error(`Invalid data stored in "${key}"`, error);
        return null;
    }
}

export { saveJSON, loadJSON };
