
import {useState,createContext,useContext} from 'react'
import AuthService from '../AuthService'
const LoginContext=createContext()
export const LoginProvider = ({children}) => {
    const [login,setLogin]=useState(AuthService.islogin()||false)
  return (
    <LoginContext.Provider value={{login,setLogin}}>
        {children}
    </LoginContext.Provider>
  )
}

export const useLogin=()=>useContext(LoginContext)