module.exports = class Person{
    constructor(fName,lName,birthday,id){
        this.fName = fName;
        this.lName = lName;
        this.birthday = birthday;
        this.id = id;
    }
    getfName() {
        return this.fName;
    }
    getlName() {
        return this.lName;
    }
    getBirthday() {
        return this.birthday;
    }
    getId() {
        return this.id;
    }
    setfName(fName) {
        this.fName = fName;
    }
    setlName(lName) {
        this.lName = lName;
    }
    setBirthday(birthday) {
        this.birthday = birthday;
    }
    setId(id) {
        this.id = id;
    }
}