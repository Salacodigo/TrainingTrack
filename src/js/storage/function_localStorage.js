function setInLocalStorage( key, jsonObject ){
    let object = JSON.stringify(jsonObject);
    try {
        localStorage.setItem( key, object);
    } catch (error) {
        console.log( error );
    }
}

function getFromLocalStorage( key ){
    try {
        const info = JSON.parse(localStorage.getItem(key));
        return info;
    } catch (error) {
        throw new error(error);
    }
}


export { 
    setInLocalStorage,
    getFromLocalStorage
}
