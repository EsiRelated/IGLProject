//const Couple = require('./couple.js');

module.exports = class Map{ // Works <String,List<Work>>       (generalisation !!!!!!)
    constructor(map){
        this.map = map
    }
    getMap(){
        return this.map;
    }
    getCouple(key){ //this methode returns the couple <moduleName,listOfWorks> in the map found or undefined if not (for works)
        if (this.map instanceof Array)
            return this.map.find(function (couple) {
            return couple.getKey() == key;
        });
        else throw new Error("map must be of type Array");
    }
}