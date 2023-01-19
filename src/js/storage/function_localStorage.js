function setInLocalStorage( key, jsonObject ){
    let object = JSON.stringify(jsonObject);
    try {
        localStorage.setItem( key, object);
    } catch (error) {
        console.log( error );
    }
}

export { 
    setInLocalStorage
}
