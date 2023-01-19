export default class User {
    constructor( ){
        this.userId = 1,
        this.name   = null,
        this.genre  = null,
        this.age    = null,
        this.weight = null
    }

    setName( name ){
        this.name = name;
    }
    
    getName(){
        return this.name;
    }

    getInformation(){
        const userInformation = {
            userId  : this.userId,
            name    : this.name,
            genre   : this.genre,
            age     : this.age,
            weight  : this.weight
        }
        return userInformation;

    }
}

