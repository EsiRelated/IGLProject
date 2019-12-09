
module.exports = class Scolar{
    constructor(allStudents,allEns,admin,groups){
        this.allStudents = allStudents; //[Account]
        this.allEns = allEns; //[Account]
        this.admin = admin; //Account
        this.groups = groups; //map<Niv,[Group]> 
    }
    getGroupObj(idNiv,idGroup){
        return groups.getCouple(idNiv).getvalue().find(function(group){
            return group.getId == idGroup;
        })
    }
    addCour(ens,subjectName,idNiv,groups,course){ //adds cour to the appropriate groups

    }
    getCour(student,subjectName){ // consultation
        group = getGroupObj(student.getNiv(),student.getGroup());
        return group.getSubjectCourses(subjectName);
        //return [Cour]
    }
    createAccount(person){// creates an account for person and adds it the the appropriate list
        
    }
}