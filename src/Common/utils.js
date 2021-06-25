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
    userInfo:{

    },
    saveUserToStorage:function () {

    },
    clearLoginInfo(){
        if(noBackend)
            isLoggedIn = !isLoggedIn;
        else{
            localStorage.removeItem('auth');
        }

    }

}

