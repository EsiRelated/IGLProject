module.exports = class Account{
    constructor(userName,passWord,accountOwner){
        this.userName = userName;
        this.passWord = passWord;
        this.accountOwner = accountOwner;
    }
    geUserName(){
        return this.userName;
    }
    login(passWord) {
        if (this.passWord == passWord)
            return this.accountOwner;
        else 
           throw new Error("WrongPasswordException");
    }
}