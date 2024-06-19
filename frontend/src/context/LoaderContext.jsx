import {loaderState,loaderDispacther} from '../reducers/loaderReducer'
import {createContext,useReducer,useContext} from 'react'

const LoaderContext=createContext();
export const LoaderProvider=({children})=>{
    const [loaderstate,loaderdispatcher]=useReducer(loaderDispacther,loaderState)
    return <LoaderContext.Provider value={{loaderstate,loaderdispatcher}}>
        {children}
        </LoaderContext.Provider>
    
}

export  const useLoader=()=>useContext(LoaderContext)