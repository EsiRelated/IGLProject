module.exports = class Niv{
    constructor(id,subjects){
        this.id = id; // name
        this.subjects = subjects; // [Module]
    }
    getId(){
        return this.id;
    }
    getSubjects(){
        return this.subjects;
    }
}