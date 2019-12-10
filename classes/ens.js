const Person = require('./person.js');

module.exports = class Ens extends Person{
    constructor(fName,lName,birthday,id,grade,teaching){
        super(fName,lName,birthday,id);
        this.grade = grade;
        this.teaching = teaching;
    }
}
