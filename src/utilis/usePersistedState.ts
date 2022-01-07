import { type } from "os";
import { useState, useEffect , Dispatch, SetStateAction } from "react";

type Responce<T>  = [
    T,
    Dispatch<SetStateAction<T>>
]

export function usePersistedState<T>(key:string, initialState: T):Responce<T>{
    const[state,setState] = useState(() =>{
        const stongeValue = localStorage.getItem(key)

        if(stongeValue){
            return JSON.parse(stongeValue)
        }else{
            return initialState
        }
    })

    useEffect(() =>{
        localStorage.setItem(key,JSON.stringify(state))
    },[key,state])
    return[state,setState]
}