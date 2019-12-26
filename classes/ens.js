const Person = require('./person.js');

module.exports = class Ens extends Person{
    constructor(personId,fName,lName,birthday,grade,teaching){
        super(personId,fName,lName,birthday);
        this.grade = grade;
        this.teaching = teaching;
    }
}
