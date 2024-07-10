import axios from "axios";

import { useState, useEffect,useContext,createContext } from "react";

const AuthContext=createContext();
const AuthProvider=({children})=>{
    const [auth,setauth]=useState({
        user:null,
        token:""
    });
    axios.defaults.headers.common["Authorization"]=auth?.token;
    useEffect(()=>{
        const data=localStorage.getItem("auth");
        if(data){
            const parsedata=JSON.parse(data);
            setauth({
                ...auth,
                user:parsedata.user,
                token:parsedata.token
        });
        }
        //eslint-disable-next-line
    },[]);
return(
    <AuthContext.Provider value={[auth,setauth]}>{children}
    </AuthContext.Provider>
)
}
const useAuth=()=> useContext(AuthContext)

export {useAuth,AuthProvider}