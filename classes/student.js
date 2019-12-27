const Person = require('./person.js');
const Map = require('./map.js');
const Couple = require('./couple.js');
module.exports = class Student extends Person{
    constructor(personId,fName,lName,birthday,group,works){
        super(personId,fName,lName,birthday);
        this.group = group
        this.works = works;
      }
/*    getWorks(){
        return this.works;
    }
    addWork(moduleName,work){
            let couple = this.works.getCouple(moduleName);
            if (typeof couple == "undefined")
                this.works.getMap().push(new Couple(moduleName,[work]));
            else
                couple.getValue().push(work);
    }
*/
}
