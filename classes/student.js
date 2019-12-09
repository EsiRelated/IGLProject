const Person = require('./person.js');
const Map = require('./map.js');
const Couple = require('./couple.js');
module.exports = class Student extends Person{
    constructor(fName,lName,birthday,id,idNiv,idGrp,works){
        super(fName,lName,birthday,id);
        this.idNiv = idNiv;
        this.idGrp = idGrp;
        if(works instanceof Map)
            this.works = works;
        else 
            throw new Error("works must ba a of type Works (map)");
    }
    getWorks(){
        return this.works;
    }
    addWork(moduleName,work){
            let couple = this.works.getCouple(moduleName);
            if (typeof couple == "undefined")
                this.works.getMap().push(new Couple(moduleName,[work]));
            else
                couple.getValue().push(work);
    }
}