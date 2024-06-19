import { jwtDecode } from "jwt-decode";
const AuthService={
    
    gettoken:()=>{
        return sessionStorage.getItem('token')
    },
    isTokenExpired:()=>{
        try{
        const token=JSON.parse(sessionStorage.getItem('token'))
        if(token){
            
            const decoded=jwtDecode(token)
            if(decoded.exp<Date.now()/1000){
                return true
            }else{
                return false
            }
        }else{
            return true
        }}catch(err){
            console.log(err)
        }
    },
    logout:()=>{
        sessionStorage.removeItem('token');
        console.log('token removed')
    },
    islogin:()=>{
        const token = sessionStorage.getItem('token');
        if(token){
            return true
        }else{
        return false}
    },
    setToken:(token)=>{
        sessionStorage.setItem('token',JSON.stringify(token))
        console.log('token set')
    }

}

export default AuthService;