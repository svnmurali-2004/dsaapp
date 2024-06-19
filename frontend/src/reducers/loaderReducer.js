
const loaderState={
    loading:false,
    data:"",
    error:""
}

const loaderDispacther=(state,action)=>{
    switch(action.type){
        case "FETCH_STARTED":
            console.log(action.payload)
            return {...state,loading:true,data:action.payload}

        case "FETCH_SUCCESS":
            console.log(action.payload)
            return {...state,loading:false,data:action.payload}
 
        case "FETCH_ERROR":
            console.log(action.payload)
            return {...state,loading:false,error:action.payload}
        default:
            return state

    }
}

export {loaderState,loaderDispacther}