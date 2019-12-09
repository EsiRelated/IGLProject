const Person = require('./person.js')

module.exports = class Admin extends Person{ //simple but powrfull
    constructor(fName,lName,birthday,id){
        super(fName,lName,birthday,id);
    }
}