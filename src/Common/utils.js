const noBackend = true
var isLoggedIn = true;
export default{
    isLoggedIn: function () {
        if(noBackend)
            return isLoggedIn;
        else{
            let token = localStorage.getItem('Authorization')
            return (token === null || token === '')
        }
    },
    currentUserInfo(){
        return localStorage.getItem('curUser')

    },
    saveUserToStorage:function (user,token) {
        localStorage.setItem('Authorization',token)
        localStorage.setItem('curUser',user)
    },
    clearLoginInfo(){
        if(noBackend)
            isLoggedIn = !isLoggedIn;
        else{
            localStorage.removeItem('curUser');
            localStorage.removeItem('Authorization');
        }

    }

}

