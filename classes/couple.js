
module.exports = class Couple{ // couple(key,value) for the map in works
    constructor(key,value){
        this.key = key;
        this.value = value;
    }
    getKey(){
        return this.key;
    }
    getValue(){
        return this.value;
    }
}