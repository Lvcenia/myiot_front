const noBackend = false

export default{
    isLoggedInBool : false,
    isLoggedIn: function () {
        if(noBackend)
            return this.isLoggedInBool;
        else{
            let token = localStorage.getItem('Authorization')
            return !(token === null || token === '')
        }
    },

    onLoggedIn:[],
    onLoggedOut:[],

    currentUserInfo(){
        return localStorage.getItem('curUser')

    },
    saveUserToStorage:function (user,token) {
        localStorage.setItem('Authorization',token)
        localStorage.setItem('curUser',user)
        for(let i  = 0; i < this.onLoggedIn.length;++i){
            this.onLoggedIn[i]();
        }
    },
    clearLoginInfo(){
        if(noBackend)
            this.isLoggedInBool = !this.isLoggedInBool;
        else{
            localStorage.removeItem('curUser');
            localStorage.removeItem('Authorization');
            this.isLoggedInBool = false
            for(let i  = 0; i < this.onLoggedIn.length;++i){
                this.onLoggedOut[i]();
            }
        }

    }

}

