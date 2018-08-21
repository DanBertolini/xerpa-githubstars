export class UserDataUtils {
    static getUserData(){
        return {
            userName: localStorage.getItem('userName'),
            userToken: localStorage.getItem('userToken')
        }
    }
}