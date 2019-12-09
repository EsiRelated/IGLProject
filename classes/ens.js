const Person = require('./person.js');

module.exports = class Ens extends Person{
    constructor(fName,lName,birthday,id,grade,modulesEns,grpsEns){
        super(fName,lName,birthday,id);
        this.grade = grade;
        this.subjectsEns = subjectssEns;
        this.grpsEns = grpsEns;
    }
}